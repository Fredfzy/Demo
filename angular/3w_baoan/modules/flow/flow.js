/**
 * Created by qin on 2016/04/09.
 */
angular.module('oa')
    .controller('FlowFormCtrl', function ($scope, $http, $filter, $stateParams, Resolver, $interpolate,
                                          $ionicPopup, $ionicModal, $ionicLoading, APIReadWrite, Validation,$wechat) {
        var objectId = $stateParams.objectId
            , rawMap = {}
            ,modal;
        var id = $scope.objectId = objectId;
        $scope.now = new Date();
        $scope.validation = [];
        function initSchema() {
            $scope.formData = {};
            $http.get(domain + '/oa/flow/config/' + objectId)
                .success(function (data) {
                    $scope.tableName = data.name;
                    $scope.appKey = rawMap.appKey = data.app_key;
                    var root = Resolver.getRoot(data.config);
                    $scope.fields = Resolver.getFields(root);
                    rawMap.steps = Resolver.getSteps(root);
                    rawMap.currentStepObj = Resolver.getFirstStep(rawMap.steps);
                    rawMap.config = Resolver.getConfigInit(root);
                    if (rawMap.config.approveScript || rawMap.currentStepObj.approveScript) {
                        rawMap.approveScript = rawMap.currentStepObj.approveScript ?
                            rawMap.currentStepObj.approveScript : rawMap.config.approveScript;
                    }
                    if (rawMap.currentStepObj.selectable) {
                        $scope.nextSteps = Resolver.getNextSteps(
                            rawMap.steps[rawMap.currentStepObj.stepId], rawMap.steps)
                        $ionicModal.fromTemplateUrl('modules/flow/modal-selection.tpl.html', {
                            scope: $scope,
                            animation: 'slide-in-up'
                        }).then(function (data) {
                            modal = data;
                        });
                        $scope.close = function () {
                            modal.hide();
                        };
                        $scope.doSelectedSubmit = function (selectedNode) {
                            modal.hide();
                            var nextStep = selectedNode;
                            var raw = {
                                formData: $scope.formData,
                                nextStep: nextStep || {stepId: 'end'},
                                appKey: rawMap.appKey,
                                groupId: $scope.userInfo.groupId,
                                flagRepeatJump: rawMap.currentStepObj.flagRepeatJump || null,
                                approveScript: rawMap.approveScript || null,
                                processId: rawMap.processId
                            };
                            raw.currentStep = Resolver.getFirstStep(rawMap.steps);
                            submit(raw);
                        }
                    }
                })
        }

        function genName(formData) {
            var tempData = {}
                , name
                , nameFields = rawMap.config.nameFields.split(',')
            angular.forEach(nameFields, function (item) {
                var dom = angular.element(document.querySelector('#' + item));
                if (dom.find('input')[0]) {
                    tempData[item] = dom.find('input').val();
                } else if (dom.find('textarea')[0]) {
                    tempData[item] = formData[item];
                } else {
                    tempData[item] = document.getElementById(item).innerText;
                }
            });
            (rawMap.config.name) && (name = $interpolate(rawMap.config.name)(tempData));
            return name;
        }

        function afterSuccessed(data) {
            var template = '',confirmPopup;
            if (data.errCode > 0) {
                template = '流程已提交给以下人员审批:<br/>'
                var loginNames = []
                    ,pushText = $scope.userInfo.name+'将'+$scope.tableName+'流程提交给您';
                angular.forEach(data.errMsg, function (item) {
                    template += item.name + '<br/>';
                    loginNames.push(item.login_name)
                })
                loginNames = loginNames.join('|')
                var payload = {
                    loginNames: loginNames,
                    pushText: pushText,
                    pushBody: data.formId+'/'+id+'/'+data.processId+'/1',
                    type:'flowView',
                    id:encodeURIComponent(data.formId+'/'+id+'/'+data.processId+'/1')
                };
                $wechat.push(payload)
                confirmPopup = $ionicPopup.alert({
                    okType: 'button-balanced',
                    title: '提交成功',
                    template: template
                });
                confirmPopup.then(function (res) {
                    location.href = '#/main/workflow/1'
                });
            }else{
                $ionicPopup.alert({
                    okType: 'button-balanced',
                    template: data.errMsg
                });
            }

        }

        function submit(raw,formData) {
            $ionicLoading.hide();
            var nextStep = Resolver.getNextStep(formData, rawMap.steps, rawMap.currentStep, true);
            rawMap.currentStep = rawMap.steps[nextStep.stepId]
            raw = {
                formData: formData,
                currentStep:Resolver.getFirstStep(rawMap.steps),
                nextStep: nextStep || {stepId: 'end'},
                appKey: rawMap.appKey,
                groupId: userInfo.groupId,
                flagRepeatJump: rawMap.currentStepObj.flagRepeatJump || null,
                approveScript: rawMap.approveScript || null,
                processId: rawMap.processId
            };
            if (rawMap.config.name && rawMap.config.nameFields)
                $scope.tableName = genName(raw.formData);
            $http({
                method: 'POST', url: domain + '/oa/flow/submit/' + objectId, data: raw
            }).success(function (data) {
                if (data.errMsg.length == 0) {
                    $ionicLoading.show({
                        template: '<div>该部门无对应岗位人员进行审批，正在移交至下一阶段</div>',
                    })
                    rawMap.formId = data.formId;
                    rawMap.processId = data.processId;
                    $scope.jump = 1;
                    rawMap.approveScript = null;
                    submit(raw,formData);
                } else {
                    afterSuccessed(data)
                }
            })
        }

        function initEvents() {
            $scope.doSubmit = function (formData, id, callback, processId, formId, isDraft, flexConfig) {
                if (rawMap.currentStepObj.selectable){
                    modal.show()
                }else{
                    submit({},formData);
                }
            };
        }

        (function () {
            initSchema();
            initEvents();
        })();
    })
    .controller('FlowEditCtrl', function ($scope, $http, $filter, $stateParams, Resolver, $state,
                                          $ionicPopup, $ionicModal, $ionicLoading, APIReadWrite, Validation) {
        $scope.flagHandle = $stateParams.flagHandle == 1;
        $scope.validations = [];
        var objectId = $stateParams.objectId
            , formId = $stateParams.formId
            , processId = $stateParams.processId
            , rawMap = {};
        (function () {
            initView()
        })();
        function initView() {
            $http.get(domain + '/oa/flow/form/' + formId + '/view/' + objectId + '/process/' + processId)
                .success(function (data) {
                    $scope.tableName = data.configMap.name;
                    rawMap.appKey = data.configMap.app_key;
                    rawMap.state = data.processMap.state;
                    rawMap.groupId = data.processMap.groupId;
                    var root = Resolver.getRoot(data.configMap.config);
                    $scope.schema = Resolver.getConfigSchema(root);
                    $scope.fields = Resolver.getFields(root);
                    $scope.config = Resolver.getConfigInit(root);
                    $scope.logs = data.logs;
                    $scope.formData = data.formData;
                    if (data.flexConfig) {
                        var flexConfig = data.flexConfig;
                        var flexRoot = Resolver.getRoot(flexConfig.config);
                        root = flexRoot;
                        rawMap.refType = data.processMap.refType;
                        rawMap.refId = data.processMap.refId;
                        rawMap.steps = Resolver.getSteps(flexRoot);
                    } else {
                        rawMap.steps = Resolver.getSteps(root);
                    }
                    rawMap.process = data.processMap;
                    rawMap.currentStep = rawMap.steps[rawMap.process.taskId];
                    rawMap.currentStepObj = Resolver.getCurrentStep(rawMap.currentStep);
                    if (rawMap.currentStepObj.editable) {
                        rawMap.editData = {}
                    }
                    var prevTask = rawMap.steps[data.processMap.preTaskId]
                    if (prevTask) {
                        rawMap.preTaskId = data.processMap.preTaskId
                        $scope.flagWithDraw = Resolver.hasHandled(prevTask, $scope.userInfo, data.processMap.creatorId);
                        $scope.deepWithdraw = ($scope.userInfo.id == data.processMap.creatorId);
                    }
                    $scope.actions = Resolver.getActions(rawMap.currentStep);
                    angular.forEach(data.logs, function (item) {
                        if (item.actionId == -1) {
                            $scope.rejectInfo = item;
                        }
                    })
                })
        }

        function submit(raw) {
            $http({
                method: 'POST', url: domain + '/oa/flow/submit/' + objectId, data: raw
            }).success(function (data) {
                var template = '';
                if (data.errCode > 0) {
                    template = '流程已提交给以下人员审批:<br/>'
                    angular.forEach(data.errMsg, function (item) {
                        template += item.name + '<br/>';
                    })
                }
                var confirmPopup = $ionicPopup.alert({
                    okType: 'button-balanced',
                    title: '提交成功',
                    template: template
                });

                confirmPopup.then(function (res) {
                    location.href = '#/main/workflow/1'
                });
            })
        }

        $scope.doSubmit = function (formData, flexConfig) {
            var nextStep = Resolver.getNextStep(formData, rawMap.steps, rawMap.currentStep, true);
            var raw = {
                formData: formData,
                nextStep: nextStep || {stepId: 'end'},
                appKey: rawMap.appKey,
                groupId: userInfo.groupId,
                flagRepeatJump: rawMap.currentStepObj.flagRepeatJump || null,
                processId: processId,
                formId: formId
            };
            raw.currentStep = Resolver.getFirstStep(rawMap.steps);
            submit(raw);
        };
        $scope.doDrop = function () {
            $ionicLoading.show()
            var formKeys = []
            angular.forEach($scope.fields, function (field) {
                if (field.details) {
                    formKeys.push(field.id)
                }
            })
            var requestConfig = {
                url: domain + '/oa/flow/drop/' + processId + '/formId/' + formId + '/formKey/' + rawMap.appKey
            }
            if (formKeys.length) {
                requestConfig.method = 'POST';
                requestConfig.data = {formKeys: formKeys}
            }
            $http(requestConfig).success(function () {
                $ionicLoading.show({
                    template: '流程相关数据已全部删除'
                })
                setTimeout(function () {
                    $ionicLoading.hide();
                    $state.go('main.workflow', {flagHandle: 1});
                }, 800)
            })
        };
    })
    .controller('FlowViewCtrl', function ($scope, $http, $filter, $stateParams, Resolver,
                                          $ionicPopup, $ionicModal, $ionicLoading, APIReadWrite, Validation,$wechat) {
        $scope.flagHandle = $stateParams.flagHandle == 1;
        var objectId = $stateParams.objectId
            , formId = $stateParams.formId
            , processId = $stateParams.processId
            , rawMap = {};
        $scope.ext = {};
        $scope.editData = {};
        (function () {
            $http.get(domain + '/oa/flow/flagApproved/' + processId)
                .success(function (data) {
                    if(data==0){
                        $scope.flagApproved = true;
                    }
                })
            initView()
        })();
        $scope.getWidth = function (items) {
            var width = 0;
            angular.forEach(items, function (item) {
                width += item.name.length*30;
            })
            return width+'px'
        }
        function initView() {
            $http.get(domain + '/oa/flow/form/' + formId + '/view/' + objectId + '/process/' + processId)
                .success(function (data) {
                    $scope.tableName = data.configMap.name;
                    rawMap.appKey = data.configMap.app_key;
                    rawMap.state = data.processMap.state;
                    rawMap.groupId = data.processMap.groupId;
                    var root = Resolver.getRoot(data.configMap.config);
                    $scope.schema = Resolver.getConfigSchema(root);
                    $scope.fields = Resolver.getFields(root);
                    $scope.config = rawMap.config = Resolver.getConfigInit(root);
                    $scope.formData = data.formData;
                    if (data.flexConfig) {
                        var flexConfig = data.flexConfig;
                        var flexRoot = Resolver.getRoot(flexConfig.config);
                        root = flexRoot;
                        rawMap.refType = data.processMap.refType;
                        rawMap.refId = data.processMap.refId;
                        rawMap.steps = Resolver.getSteps(flexRoot);
                    } else {
                        rawMap.steps = Resolver.getSteps(root);
                    }
                    rawMap.process = data.processMap;
                    rawMap.currentStep = rawMap.steps[rawMap.process.taskId];
                    $scope.currentStepObj = rawMap.currentStepObj = Resolver.getCurrentStep(rawMap.currentStep, userInfo.id);
                    if (rawMap.currentStepObj.editable) {
                        $scope.editData = {}
                    }
                    var editableDetails = rawMap.currentStepObj.editableDetails;
                    editableDetails && ($scope.editableDetails = editableDetails);
                    var prevTask = rawMap.steps[data.processMap.preTaskId]
                    if (prevTask) {
                        rawMap.preTaskId = data.processMap.preTaskId
                        $scope.flagWithDraw = Resolver.hasHandled(prevTask, $scope.userInfo, data.processMap.creatorId);
                        $scope.deepWithdraw = ($scope.userInfo.id == data.processMap.creatorId);
                    }
                    $scope.actions = Resolver.getActions(rawMap.currentStep);
                    //if (flagEdit) {
                    //    angular.forEach(data.logs, function (item) {
                    //        if (item.actionId == -1) {
                    //            $scope.rejectInfo = item;
                    //        }
                    //    })
                    //}
                    rawMap.approveScript = rawMap.currentStepObj.approveScript;
                    if (rawMap.config.approveScript) {
                        rawMap.approveScript = rawMap.currentStepObj.approveScript ?
                            rawMap.currentStepObj.approveScript : rawMap.config.approveScript;
                    }
                    if (rawMap.config.rejectScript) {
                        rawMap.rejectScript = rawMap.currentStepObj.rejectScript ?
                            rawMap.currentStepObj.rejectScript : rawMap.config.rejectScript;
                    }
                    var freezed = rawMap.process.freezed;
                    if (freezed) {
                        freezed = JSON.parse(freezed);
                        if (freezed[$scope.userInfo.id]) {
                            $scope.flagFreezed = true;
                        }
                    }
                    var firers = data.processMap.firers;
                    if (firers) {
                        firers = JSON.parse(firers);
                        if (firers[$scope.userInfo.id]) {
                            $scope.freezed = JSON.parse(data.processMap.freezed);
                            $scope.firers = JSON.parse(data.processMap.firers);
                        }
                    }
                    $scope.logs = data.logs;
                })
        }

        function success(data) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.alert({
                okType: 'button-balanced',
                title: '提交成功',
                template: data.errMsg
            });
            var loginNames = [];
            angular.forEach(data.handlers,function (item) {
                loginNames.push(item.login_name)
            });
            loginNames = loginNames.join('|')
            var pushText = $scope.userInfo.name+'将'+$scope.tableName+'流程转交给您审批';
            var raw = {
                loginNames: loginNames,
                pushText: pushText,
                pushBody: '',
                type:'flowView',
                id:formId+'/'+objectId+'/'+processId+'/1'
            };
            $wechat.push(raw)

            confirmPopup.then(function (res) {
                location.href = '#/main/workflow/1'
            });
        }

        function approveToNextStep(raw) {
            $http.post(domain + '/oa/flow/approve/' + processId + '/run', raw)
                .success(function (data) {
                    if (data.errCode < 2 && data.handlers && data.handlers.length == 0) {
                        $ionicLoading.show({
                            template: '下一节点无审批人，正在进行跳转'
                        });
                        raw.flagJump = true;
                        raw.currentStep = raw.nextStep;
                        rawMap.currentStep = rawMap.steps[raw.nextStep.stepId];
                        raw.nextStep = Resolver.getNextStep(raw.formData, rawMap.steps, rawMap.currentStep, true);
                        console.log(rawMap.steps, rawMap.currentStep)
                        console.log('下一节点无审批人，正在进行跳转', raw)
                        approveToNextStep(raw);
                    } else {
                        success(data);
                    }
                })
        }

        function approve(raw) {
            $http.post(domain + '/oa/flow/approve/' + processId, raw)
                .success(function (data) {
                    success(data);
                })
        }

        function handle(message, flagApprove, flagJump, selectedNode) {
            var unhandledNum = --rawMap.process.unhandledNum;
            var script = flagApprove ? rawMap.approveScript : rawMap.rejectScript;
            var raw = {
                appKey: rawMap.appKey, unhandledNum: unhandledNum, flagJump: flagJump || null, script: script || null,
                message: message, flagApprove: flagApprove + 0, formData: $scope.formData, groupId: rawMap.groupId,
                handlers: $scope.selectedHandlers || null
            }
            if ($scope.editData) {
                raw.formId = formId;
                raw.editData = $scope.editData;
                if($scope.ext.flagComments){
                    var jsonComment = {},comments = [{
                        message:message||'未填写审批意见',
                        date:$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss'),
                        name:$scope.userInfo.name
                    }];
                    jsonComment.comments = comments;
                    if($scope.userInfo.signImg){
                        jsonComment.signImg = $scope.userInfo.signImg
                    }
                    $scope.editData[$scope.ext.flagComments] = angular.toJson(jsonComment);
                    //$scope.editData[$scope.ext.flagComments] =
                    //    $scope.formData[$scope.ext.flagComments]?
                    //        $scope.formData[$scope.ext.flagComments]:'';
                    //$scope.editData[$scope.ext.flagComments] += '<p>审批意见：'+message+'</p><p>'+
                    //    ($scope.userInfo.signImg?'<img class="wrap-bordered" src="upload/signs/'+$scope.userInfo.signImg+
                    //    '" width="50px" height="50px" ng-click="openImage(\''+$scope.userInfo.signImg+'\')">':$scope.userInfo.name)+' &nbsp;&nbsp;&nbsp;'+
                    //    $filter('date')(new Date(),'yyyy年MM月dd日 HH:mm:ss')+"</p>";
                }
                angular.forEach($scope.editData, function (value,key) {
                    raw.formData[key] = value
                })
            }
            if (rawMap.refType) {
                raw.refType = rawMap.refType;
                raw.refId = rawMap.refId;
            }
            if(raw.nextStep){
                if (rawMap.config.groupBySteps) {
                    raw.flagGroupByStep = rawMap.config.groupBySteps.indexOf(raw.nextStep.stepId) > -1 ? rawMap.currentStepObj.stepId : null;
                }
                if (raw.nextStep.groupByStep && rawMap.process.GSMap) {
                    raw.groupId = JSON.parse(rawMap.process.GSMap)[raw.nextStep.groupByStep];
                }
            }
            if (rawMap.currentStepObj.changeGroup) {
                raw.tempGroupId = $scope.userInfo.groupId
            }
            if(rawMap.nextStep){
                raw.nextStep = rawMap.nextStep
            }
            if (unhandledNum == 0 || !flagApprove || flagJump) {
                rawMap.config.endScript && (raw.endScript = rawMap.config.endScript);
                raw.nextStep = raw.nextStep = selectedNode || Resolver.getNextStep($scope.formData, rawMap.steps, rawMap.currentStep, flagApprove);
                raw.currentStep = rawMap.currentStepObj;
                approveToNextStep(raw)
            } else {
                approve(raw)
            }
        }

        $scope.close = function () {
            modalInstance.hide();
        }
        $scope.openHandle = function (flagApprove) {
            rawMap.flagApprove = flagApprove;
            $scope.content = ''
            var myPopup = $ionicPopup.show({
                template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                title: '处理流程',
                scope: $scope,
                buttons: [
                    {text: '取消', type: 'button-balanced button-clear'},
                    {
                        text: '确定',
                        type: 'button-balanced',
                        onTap: function (e) {
                            $ionicLoading.show();
                            handle($scope.content, rawMap.flagApprove)
                        }
                    }]
            });
        };
        var modalInstance;
        $ionicModal.fromTemplateUrl('modal-addition.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            modalInstance = modal;
        });
        $scope.openWithdraw = function () {
            $ionicPopup.show({
                template: '<textarea ng-model="content" rows="5" placeholder="在此输入撤回原因"></textarea>',
                title: '撤回流程',
                scope: $scope,
                buttons: [
                    {text: '取消', type: 'button-balanced button-clear'},
                    {
                        text: '确定',
                        type: 'button-balanced',
                        onTap: function (e) {
                            $ionicLoading.show();
                            $http.post(domain + '/oa/flow/withdraw/' + processId, {
                                preTaskId: rawMap.preTaskId,
                                message: $scope.content,
                                backToOrigin: $scope.deepWithdraw || null,
                                rejectScript: rawMap.rejectScript || null
                            }).success(function (data) {
                                success(data)
                            })
                        }
                    }]
            });
        }
        $scope.openAddition = function () {
            $scope.flagAddition = false;
            $scope.AdditionData = {};
            modalInstance.show();
        }
        $scope.doAddition = function (stepData, flagAddition) {
            $ionicLoading.show();
            console.log(flagAddition)
            if (flagAddition) {
                var freezeObj = {
                    freezed: $scope.freezed || {},
                    firers: $scope.firers || {}
                }
                freezeObj.freezed[$scope.userInfo.id] = stepData.user.id;
                freezeObj.firers[stepData.user.id] = $scope.userInfo.id;
                $http.post(domain + '/oa/flow/addition/' + processId, {
                    user: stepData.user, freezed: JSON.stringify(freezeObj.freezed), mode: 1,
                    firers: JSON.stringify(freezeObj.firers)
                }).success(function (data) {
                    modalInstance.hide();
                    success(data)
                })
            } else {
                var unhandledNum = --rawMap.process.unhandledNum + stepData.users.length;
                $http.post(domain + '/oa/flow/addition/' + processId, {
                    users: stepData.users, unhandledNum: unhandledNum, message: stepData.message
                }).success(function (data) {
                    modalInstance.hide();
                    success(data)
                })
            }
        }
    })
    // .filter('comments', function ($interpolate) {
    //     return function (input) {
    //         var output = input;
    //         if(input&&input.indexOf('{')>-1){
    //             output = '';
    //             var bundle = JSON.parse(input);
    //             angular.forEach(bundle.comments, function (item) {
    //                 output+=$interpolate('<div><div>{{message}}</div>' +
    //                     '<small>{{name}} {{date}}</small></a></div>')(item);
    //             })
    //             if(bundle.signImg){
    //                 output+='<img width="60px" height="60px" src="'+domain+'/upload/signs/ori_'+bundle.signImg+'"/>'
    //             }
    //         }
    //         return output;
    //     }
    // })
    .filter('comments', function ($interpolate) {
        return function (input) {
            var output = '';
            if (input && input.indexOf('{') > -1) {
                var bundle = JSON.parse(input);
                var signImgs = bundle.signImg.split(',');
                console.log(signImgs)
                angular.forEach(bundle.comments, function (item,key) {
                    output += $interpolate('<div><div style="word-break: break-all;word-wrap: break-word;white-space:normal;">{{message}}</div>' +
                        '<small>{{name}} {{date}}</small></a></div>')(item);
                    if(signImgs[key]!='signImg') output += '<img height="60px" width="auto" src="'+domain+'/upload/signs/ori_' + signImgs[key] + '"/>'
                })
            }
            return output;
        }
    })