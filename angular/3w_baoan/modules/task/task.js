/**
 * Created by qin on 2016/04/11.
 */
angular.module('oa')
    .controller('TaskCtrl', function ($scope,$http,$filter,$state,
                                      $ionicModal,APIReadWrite,$ionicLoading,Validation) {
        var modalInstance
            ,currentTab
            ,currentStatus
            ,condition
            ,pager = {page:0,size:10}
            ,api = APIReadWrite.create('task',pager,$scope);
        $ionicModal.fromTemplateUrl('modules/task/modal-create.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modalInstance = modal;
        });
        $scope.flagTab = 0;
        $scope.flagStatus = 0;
        $scope.status = [{
            id: 0,
            name: '全部',
            key: ''
        }, {
            id: 1,
            key: '/Initialized',
            name: '未开始'
        }, {
            id: 2,
            key: '/InProgress',
            name: '进行中'
        }, {
            id: 3,
            key: '/Finished',
            name: '已完成'
        }]
        $scope.tabs = [
            {
                id: 0,
                name: '相关任务',
                key: 'JoinedOrCreated'
            },
            {
                id: 1,
                name: '参与的任务',
                key: '',
                children: [{
                    id: 10,
                    name: '作为参与者',
                    key: 'Joined'
                }, {
                    id: 11,
                    key: 'Joined/AsLeader',
                    name: '作为负责人',
                    children: $scope.status
                }, {
                    id: 12,
                    key: 'Joined/AsMember',
                    name: '作为成员',
                    children: $scope.status
                }]
            },
            {
                id: 2,
                name: '创建的任务',
                key: '',
                children: [{
                    id: 20,
                    name: '全部',
                    key: 'Created'
                }, {
                    id: 21,
                    name: '审批中',
                    key: 'Created/Approving'
                }, {
                    id: 23,
                    name: '已拒绝',
                    key: 'Created/Rejected'
                }]
            }
        ]
        currentTab = $scope.tabs[0];
        currentStatus = $scope.status[0];
        $scope.doTab = function (tab) {
            $scope.flagStatus = 0;
            $scope.flagTab = tab.id;
            currentTab = tab
            api.initList(false,tab.key);
        };
        $scope.doStatus = function (status) {
            $scope.flagStatus = status.id;
            currentStatus = status
            api.initList(false,currentTab.key+currentStatus.key);
        }
        $scope.doRefresh = function () {
            api.initList(false,currentTab.key);
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.doLoad = function () {
            api.getPage(false,currentTab.key+currentStatus.key)
        };
        $scope.getFlagMore = function () {
            return $scope.list&&$scope.list.length<$scope.size;
        };
        $scope.openCreate = function () {
            $scope.formData = {}
            modalInstance.show();
        };
        $scope.close = function () {
            modalInstance.hide();
        };
        $scope.doSearch = function (searcher) {
            condition = {
                name:'%'+searcher+'%',
                leader:'%'+searcher+'%',
                member:null
            };
            api.initList(false,currentTab.key,condition);
        }

        //Form
        var customs = [{
            expression: '(new Date(formData.startDate)).getTime()>=(new Date(formData.deadline)).getTime()',
            validation: '生效时间不得晚于截止时间'
        }, {
            expression: '!formData.members&&!formData.assignee',
            validation: '未指定接受对象'
        }, {
            expression: 'formData.name&&formData.name.length>20',
            validation: '标题字数过长，需小于20字'
        }, {
            expression: 'formData.flagFlow&&!formData.steps[0].users',
            validation: '未选择审批人'
        }];
        var validationForm = Validation.create({
            requires: [{
                field: 'name',
                label: '标题'
            }, {
                field: 'description',
                label: '内容'
            }],
            customs: customs
        })
        var validationEdit = Validation.create({
            requires: [{
                field: 'name',
                label: '标题'
            }, {
                field: 'content',
                label: '内容'
            }]
        });
        $scope.formData = {};
        $scope.doSubmit = function (formData) {
            var result = validationForm.getResult(formData);
            var preMarks = []
            if(formData.members){
                for (var k = 0; k < formData.members.length; k++) {
                    if (formData.members[k].id == formData.assignee.id) {
                        result.push({validation: '成员中不可包含负责人'});
                        break;
                    }
                }
            }
            if(formData.flagFlow){
                for(var l = 0;l<formData.steps.length;l++){
                    if(!formData.steps[l].users){
                        result.push({validation: '审批人不能为空'});
                        break;
                    }
                }
            }
            if (result.length) {
                var template = '';
                angular.forEach(result, function (item) {
                    template+=item.validation+'<br/>';
                })
                $ionicLoading.show({
                    template:template
                })
                setTimeout(function () {
                    $ionicLoading.hide()
                },800)
            } else {
                fSubmitTask(formData,preMarks);
            }
        };

        function fSubmitFlow(formData,id,memberIds){
            var flexConfig = {
                app_key: 'task',
                config: Resolver.getFreeConfig(formData.steps)
            };
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                members: memberIds + '',
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId
            };
            var flexRoot = Resolver.getRoot(flexConfig.config);
            var formattedSteps = Resolver.getSteps(flexRoot);
            var nextStep = Resolver.getNextStep(formData, formattedSteps, false, true);
            $http({
                method: 'POST', url: domain+'/oa/flow/submit/ref/task', data: {
                    formData: raw,
                    nextStep: nextStep || {stepId: 'end'},
                    currentStep: Resolver.getFirstStep(formattedSteps),
                    appKey: 'task',
                    processId: null,
                    formId: null,
                    isDraft: null,
                    refType: 'task',
                    refId: id,
                    groupId: $scope.userInfo.groupId,
                    flexConfig: flexConfig || null
                }
            }).success(function (data) {
                $state.go('main.flowView',{formId:data.formId,objectId:data.objectId,
                    processId:data.processId,flagHandle:0});
            })
        }
        function fSubmitTask(formData,preMarks){
            var memberIds = [];
            var memberLoginNames = [];
            angular.forEach(formData.members, function (item) {
                memberIds.push(item.id);
                memberLoginNames.push(item.login_name)
            })
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                assigneeName: formData.assignee.name,
                members: memberIds,
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId,
                files: formData.files,
                approve:1,
                important: formData.important == 1 ? 1 : null
            }
            if (formData.flagFlow) {
                raw.approve = 0;
            }
            $http.post(domain+'/oa/task/addTask', raw).success(function (data) {
                modalInstance.hide();
                if (formData.flagFlow) {
                    fSubmitFlow(formData,data,memberIds)
                }else{
                    window.location.href = '#/main/taskDetail/' + data;
                }
            })
        }
        function initData(){
            $scope.doTab($scope.tabs[0])
        }
        (function () {
            initData();
        })()
    })
    .controller('TaskDetailCtrl', function ($scope,$filter,$ionicModal,$ionicLoading,$state,$interval,
                                            $stateParams,$http,APIRead,Validation,Resolver){
        var id = $stateParams.id
            ,modalInstance
            ,modalChildren
            ,apiChildren
            ,pager;
        $ionicModal.fromTemplateUrl('modules/task/modal-create.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modalChildren = modal;
        });
        $ionicModal.fromTemplateUrl('modal-feedback.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modalInstance = modal;
        });
        function getDetail(){
            $http.get(domain+'/oa/task/getDetail/id/'+id)
                .success(function (data) {
                    $scope.detail = data.detail;
                    $scope.members = data.members;
                    $scope.feedbacks = data.feedbacks;
                    $scope.files = data.files;
                })
        }
        function initData(){
            getDetail();
        }
        (function () {
            initData();
        })();
        $scope.doReply = function (content) {
            $scope.flagRepling = true;
            $http.post(domain+'/oa/message/reply',{content:content,message_id:id})
                .success(function (data) {
                    $scope.flagRepling = false;
                    $scope.replies.unshift({
                        id:data,
                        author:userInfo.name,
                        content:content
                    })
                })
        };
        $scope.close = function () {
            modalInstance.hide();
            modalChildren.hide();
        };
        $scope.openModal = function () {
            $scope.formData = {id: id, schedule: $scope.detail.schedule};
            modalInstance.show();
        };
        $scope.doFeedBack = function (formData) {
            $ionicLoading.show();
            if (formData.description) {
                if ($scope.detail.project) {
                    formData.proId = $scope.detail.project.id;
                    formData.taskName = $scope.detail.name;
                }
                $http.post(domain+'/oa/task/addFeedback',formData)
                    .success(function (data) {
                        var fakeData = {
                            id:data,
                            author: $scope.userInfo.name,
                            feedbackDate: new Date(),
                            description: formData.description
                        };
                        if (formData.files) {
                            var files = [];
                            angular.forEach(formData.files, function (item) {
                                files.push({
                                    name: item.name,
                                    virtual_path: '/upload/files/' + item.filename
                                })
                            })
                            fakeData.files = files;
                        }
                        $scope.detail.schedule = fakeData.schedule = formData.schedule;
                        $scope.feedbacks.push(fakeData);
                        $ionicLoading.hide();
                        modalInstance.hide();
                    })
            }else{
                $ionicLoading.show({
                    template:'未填写反馈内容'
                });
                setTimeout(function () {
                    $ionicLoading.hide();
                },1000)
            }
        };
        var intervalHolder
            ,step = 1;
        $scope.doPlusSchedule = function (formData) {
            formData.schedule += step;
            step++;
        };
        $scope.doTab = function (tab) {
            $scope.flagTab = tab;
            if(tab==1){
                if(!apiChildren){
                    pager = {page: 0, size: 6};
                    apiChildren = APIRead.create('task',pager,$scope);
                }
                apiChildren.initList(false,false,{searcher: 'Sub', id: id});
            }else if(tab==2){
                if(!$scope.logs){
                    $http.get(domain+'/oa/task/getList/logs/id/'+id).success(function (data) {
                        $scope.logs = data;
                    })
                }
            }
        };
        //form
        $scope.openCreate = function () {
            $scope.formData = initFormData();
            modalChildren.show();
        }
        var customs = [{
            expression: '(new Date(formData.startDate)).getTime()>=(new Date(formData.deadline)).getTime()',
            validation: '生效时间不得晚于截止时间'
        }, {
            expression: '!formData.members&&!formData.assignee',
            validation: '未指定接受对象'
        }, {
            expression: 'formData.name&&formData.name.length>20',
            validation: '标题字数过长，需小于20字'
        }, {
            expression: 'formData.flagFlow&&!formData.steps[0].users',
            validation: '未选择审批人'
        }]
        customs.push({
            expression: '(new Date(formData.startDate)).getTime()<(new Date(formData.parentStart)).getTime()',
            validation: '任务生效时间不得早于上级任务开始时间'
        })
        customs.push({
            expression: '(new Date(formData.deadline)).getTime()>(new Date(formData.parentEnd)).getTime()',
            validation: '任务截止时间不得晚于上级任务截止时间'
        });
        var validationForm = Validation.create({
            requires: [{
                field: 'name',
                label: '标题'
            }, {
                field: 'description',
                label: '内容'
            }],
            customs: customs
        })
        function initFormData() {
            var childLeaders = angular.copy($scope.members);
            childLeaders.push({
                id: $scope.leaderId,
                name: $scope.detail.leader
            });
            return {
                parentId: id,
                parentStart: $scope.detail.startDate,
                parentEnd: $scope.detail.deadline,
                inputLeaders: childLeaders,
                title: '子'
            };
        }

        function fSubmitFlow(formData,id,memberIds){
            var flexConfig = {
                app_key: 'task',
                config: Resolver.getFreeConfig(formData.steps)
            };
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                members: memberIds + '',
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId
            };
            var flexRoot = Resolver.getRoot(flexConfig.config);
            var formattedSteps = Resolver.getSteps(flexRoot);
            var nextStep = Resolver.getNextStep(formData, formattedSteps, false, true);
            $http({
                method: 'POST', url: domain+'/oa/flow/submit/ref/task', data: {
                    formData: raw,
                    nextStep: nextStep || {stepId: 'end'},
                    currentStep: Resolver.getFirstStep(formattedSteps),
                    appKey: 'task',
                    processId: null,
                    formId: null,
                    isDraft: null,
                    refType: 'task',
                    refId: id,
                    groupId: $scope.userInfo.groupId,
                    flexConfig: flexConfig || null
                }
            }).success(function (data) {
                modalChildren.hide();
                $state.go('main.flowView',{formId:data.formId,objectId:data.objectId,
                    processId:data.processId,flagHandle:0});
            })
        }
        function fSubmitTask(formData,preMarks){
            var memberIds = [];
            var memberLoginNames = [];
            angular.forEach(formData.members, function (item) {
                memberIds.push(item.id);
                memberLoginNames.push(item.login_name)
            })
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                assigneeName: formData.assignee.name,
                members: memberIds,
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId,
                files: formData.files,
                approve:1,
                important: formData.important == 1 ? 1 : null
            }
            if (formData.flagFlow) {
                raw.approve = 0;
            }
            $http.post(domain+'/oa/task/addTask', raw).success(function (data) {
                $scope.doTab(1);
                if (formData.flagFlow) {
                    fSubmitFlow(formData,data,memberIds)
                }else{
                    modalChildren.hide();
                }
            })
        }
        $scope.doSubmit = function (formData) {
            var result = validationForm.getResult(formData);
            var preMarks = []
            if(formData.members){
                for (var k = 0; k < formData.members.length; k++) {
                    if (formData.members[k].id == formData.assignee.id) {
                        result.push({validation: '成员中不可包含负责人'});
                        break;
                    }
                }
            }
            if (result.length) {
                $scope.result = result;
                var template = '';
                angular.forEach(result, function (item) {
                    template+=item.validation+'<br/>';
                })
                $ionicLoading.show({
                    template:template
                })
                setTimeout(function () {
                    $ionicLoading.hide()
                },1500)
            } else {
                fSubmitTask(formData,preMarks);
            }
        }
    })