/**
 * Created by qin on 2016/8/16.
 */
angular.module('oa')
    .controller('ProHandleCtrl', function ($scope, $flow, $form, $http, $filter, $stateParams, $detail, $ionicHistory,
                                           $ionicPopup, $ionicLoading, $state, $userModal) {
        var proId = $stateParams.proId,
            modId, positiveNum, modal;
        $scope.radio_data = [{
            text: "同意",
            value: "同意"
        },
            {
                text: "已阅",
                value: "已阅"
            },
        ];
        $scope.radio_model_data = {
            clientSide: ''
        };
        $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.flagHandle = true;
        $scope.doRefresh = function () {
            initContext();
            initEvents();
            $scope.$broadcast('scroll.refreshComplete');
        }

        function initContext() {
            $flow.initProWithMod({
                proId: proId,
                scope: $scope,
                success: function (data, nodesMap, currentNode, global, tableSchema) {
                    $scope.pro_state = data.state;
                    $scope.currentNodeId = currentNode.id;
                    $scope.flagComments = [];
                    $scope.proFileIds = data.fileIds;
                    $scope.name = data.module.name;
                    $form.renderView({
                        viewType: 'HandleView',
                        tableSchema: tableSchema,
                        scope: $scope,
                        elementId: 'mod-view',
                        name: data.module.name,
                        formData: data.formData,
                        node: currentNode
                    });
                    $scope.logs = data.logs;
                    $scope.nodesMap = nodesMap;
                    $scope.flagCommentRequired = currentNode.flagCommentRequired
                    $scope.flagSelectable = currentNode.flagNextNodesSelectable;
                    if ($scope.flagSelectable) {
                        $scope.flagToNext = (data.positiveNum < 2);
                        var prevNode = {}
                        $scope.nodesMap = nodesMap;
                        $scope.nextNodes = currentNode.nextNodes;
                        $scope.openSelectable = function (formData, message) {

                        };
                        $scope.selectNode = function (node) {
                            prevNode.flagSelected = false;
                            node.flagSelected = true;
                            prevNode = node;
                            $scope.nextNode = nodesMap[node.id];
                        };
                    }
                    var broadcast = {
                        name: '来自' + userInfo.name + '的' + $scope.name + '通知',
                        content: '请查看我在' + $filter('date')(new Date(), 'yyyy年MM月dd日') + '发起的' + $scope.name + '通知'
                    };
                    $scope.broadcasts = [broadcast];
                }
            });
        }

        function initEvents() {
            $scope.openHandle = function (flagPositive) {
                console.log($scope.logs[$scope.logs.length - 1].actionId);
                console.log($scope.logs[$scope.logs.length - 1].resultOpen);
//			    console.log($scope.logs[forward].userId);
                console.log(window.userInfo.id);
                if (flagPositive == true) {
                    $scope.content = '';
                    if ($scope.logs[$scope.logs.length - 1].actionId == 11 || $scope.logs[$scope.logs.length - 1].resultOpen == 1 && flagPositive == true) {
                        var confirmPopup = $ionicPopup.confirm({
                            template: "是：提交给下一个审批人！<br />否：返回给转发人！",
                            cancelText: '否',
                            okText: '是'
                        });
                        confirmPopup.then(function (res) {
                            if (res) { //该发文是转发而来---提交给下一个节点操作
                                console.log('下一个');
                                var myPopup = $ionicPopup.show({
                                    //									template: '',
                                    template: '<ion-radio ng-repeat="item in radio_data" ng-value="item.value" ng-model="radio_model_data.clientSide">{{ item.text }}</ion-radio><textarea ng-model="radio_model_data.clientSide" rows="5" placeholder="在此输入审批意见"></textarea>',
                                    title: '审批意见',
                                    scope: $scope,
                                    buttons: [{
                                        text: '取消',
                                        type: 'button-balanced' + ' button-outline'
                                    },
                                        {
                                            text: '确认通过',
                                            type: 'button-balanced',
                                            onTap: function (e) {
                                                $ionicLoading.show();
                                                $flow.handle({
                                                    forwardId: $scope.logs[$scope.logs.length - 1].userId,
                                                    resultOpen: 1,
                                                    scope: $scope,
                                                    flagPositive: flagPositive,
                                                    formData: $scope.formData,
                                                    message: $scope.radio_model_data.clientSide ? $scope.radio_model_data.clientSide : '通过',
                                                    preRemoveDetailMap: $detail.flagPreRemove ? $detail.preRemoveDetailMap : null,
                                                    success: function (data) {
                                                        if (data.errCode > 0) {
                                                            $ionicLoading.show({
                                                                template: data.errMsg
                                                            });
                                                            setTimeout(function () {
                                                                $ionicLoading.hide();
                                                                $state.go('main.workflow', {
                                                                    flagHandle: 1
                                                                })
                                                            }, 1000)
                                                        } else {
                                                            $ionicLoading.show({
                                                                template: '<div class="assertive">' + data.errMsg + '</div>'
                                                            });
                                                            setTimeout(function () {
                                                                $ionicLoading.hide();
                                                            }, 1000)
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                });
                            } else { //改发文是转发而来---返回转发人操作
                                console.log('上一个');
                                var myPopup = $ionicPopup.show({
                                    //									template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                                    template: '<ion-radio ng-repeat="item in radio_data" ng-value="item.value" ng-model="radio_model_data.clientSide">{{ item.text }}</ion-radio><textarea ng-model="radio_model_data.clientSide" rows="5" placeholder="在此输入审批意见"></textarea>',
                                    title: '审批意见',
                                    scope: $scope,
                                    buttons: [{
                                        text: '取消',
                                        type: 'button-balanced' + ' button-outline'
                                    },
                                        {
                                            text: '确认通过',
                                            type: 'button-balanced',
                                            onTap: function (e) {
                                                $ionicLoading.show();
                                                $flow.handle({
                                                    resultOpen: 1,
                                                    scope: $scope,
                                                    flagPositive: flagPositive,
                                                    formData: $scope.formData,
                                                    message: $scope.radio_model_data.clientSide ? $scope.radio_model_data.clientSide : '通过',
                                                    preRemoveDetailMap: $detail.flagPreRemove ? $detail.preRemoveDetailMap : null,
                                                    success: function (data) {
                                                        if (data.errCode > 0) {
                                                            $ionicLoading.show({
                                                                template: data.errMsg
                                                            });
                                                            setTimeout(function () {
                                                                $ionicLoading.hide();
                                                                $state.go('main.workflow', {
                                                                    flagHandle: 1
                                                                })
                                                            }, 1000)
                                                        } else {
                                                            $ionicLoading.show({
                                                                template: '<div class="assertive">' + data.errMsg + '</div>'
                                                            });
                                                            setTimeout(function () {
                                                                $ionicLoading.hide();
                                                            }, 1000)
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                });
                            }
                        });
                    } else { //改发文不是转发而来--通过操作
                        var myPopup = $ionicPopup.show({
                            //template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                            template: '<ion-radio ng-repeat="item in radio_data" ng-value="item.value" ng-model="radio_model_data.clientSide">{{ item.text }}</ion-radio><textarea ng-model="radio_model_data.clientSide" rows="5" placeholder="在此输入审批意见"></textarea>',
                            title: '审批意见',
                            scope: $scope,
                            buttons: [{
                                text: '取消',
                                type: 'button-balanced' + ' button-outline'
                            },
                                {
                                    text: '确认通过',
                                    type: 'button-balanced',
                                    onTap: function (e) {
                                        $ionicLoading.show();
                                        $flow.handle({
                                            scope: $scope,
                                            flagPositive: flagPositive,
                                            formData: $scope.formData,
                                            message: $scope.radio_model_data.clientSide ? $scope.radio_model_data.clientSide : '通过',
                                            preRemoveDetailMap: $detail.flagPreRemove ? $detail.preRemoveDetailMap : null,
                                            success: function (data) {
                                                console.log(data.errMsg);
                                                if (data.errCode > 0) {
                                                    $ionicLoading.show({
                                                        template: data.errMsg
                                                    });
                                                    setTimeout(function () {
                                                        $ionicLoading.hide();
                                                        $state.go('main.workflow', {
                                                            flagHandle: 1
                                                        })
                                                    }, 1000)
                                                } else {
                                                    $ionicLoading.show({
                                                        template: '<div class="assertive">' + data.errMsg + '</div>'
                                                    });
                                                    setTimeout(function () {
                                                        $ionicLoading.hide();
                                                    }, 1000)
                                                }
                                            }
                                        });
                                    }
                                }
                            ]
                        });
                    }
                } else { //拒绝操作
                    $scope.content = '';
                    var myPopup = $ionicPopup.show({
                        //						template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                        template: '<ion-radio ng-repeat="item in radio_data" ng-value="item.value" ng-model="radio_model_data.clientSide">{{ item.text }}</ion-radio><textarea ng-model="radio_model_data.clientSide" rows="5" placeholder="在此输入审批意见"></textarea>',
                        title: '审批意见',
                        scope: $scope,
                        buttons: [{
                            text: '取消',
                            type: 'button-assertive' + ' button-outline'
                        },
                            {
                                text: '确认拒绝',
                                type: 'button-assertive',
                                onTap: function (e) {
                                    $ionicLoading.show();
                                    $flow.handle({
                                        scope: $scope,
                                        flagPositive: flagPositive,
                                        formData: $scope.formData,
                                        message: $scope.radio_model_data.clientSide ? $scope.radio_model_data.clientSide : '拒绝',
                                        preRemoveDetailMap: $detail.flagPreRemove ? $detail.preRemoveDetailMap : null,
                                        success: function (data) {
                                            $ionicLoading.show({
                                                template: data.errMsg
                                            });
                                            setTimeout(function () {
                                                $ionicLoading.hide();
                                                $state.go('main.workflow', {
                                                    flagHandle: 1
                                                })
                                            }, 1000)

                                        }
                                    });
                                }
                            }
                        ]
                    });
                }
                //                $scope.content = flagPositive?'同意':'';
                //                var myPopup = $ionicPopup.show({
                //                    template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                //                    title: '审批意见',
                //                    scope: $scope,
                //                    buttons: [
                //                        {text: '取消', type: (flagPositive?'button-balanced':'button-assertive')+' button-outline'},
                //                        {
                //                            text: flagPositive?'确认通过':'确认拒绝',
                //                            type: flagPositive?'button-balanced':'button-assertive',
                //                            onTap: function (e) {
                //                                $ionicLoading.show();
                //                                $flow.handle({
                //                                    scope:$scope,
                //                                    flagPositive:flagPositive,
                //                                    formData:$scope.formData,
                //                                    message:$scope.content,
                //                                    preRemoveDetailMap:$detail.flagPreRemove?$detail.preRemoveDetailMap:null,
                //                                    success: function (data) {
                //                                        $ionicLoading.show({template:data.errMsg});
                //                                        setTimeout(function () {
                //                                            $ionicLoading.hide();
                //                                            $state.go('main.workflow',{flagHandle:1})
                //                                        },1000)
                //                                    }
                //                                });
                //                            }
                //                        }]
                //                });
            };
            $scope.openAssist = function () {
                $userModal.init({
                    flagMultiple: false,
                    confirm: function (user) {
                        console.log(user)
                        $ionicLoading.show();
                        $flow.assist({
                            assistId: user.id,
                            scope: $scope,
                            success: function () {
                                $ionicLoading.show({
                                    template: '前加签成功'
                                });
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                    $state.go('main.workflow', {
                                        flagHandle: 1
                                    })
                                }, 1000)
                            }
                        })
                    },
                    label: '选择前加签人员'
                });
                $userModal.open();
            };
            //转发按钮操作
            $scope.forward = function () {
                var myPopup = $ionicPopup.show({
                    //						template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入审批意见"></textarea>',
                    template: '<ion-radio ng-repeat="item in radio_data" ng-value="item.value" ng-model="radio_model_data.clientSide">{{ item.text }}</ion-radio><textarea ng-model="radio_model_data.clientSide" rows="5" placeholder="在此输入审批意见"></textarea>',
                    title: '审批意见',
                    scope: $scope,
                    buttons: [{
                        text: '取消',
                        type: 'button-assertive' + ' button-outline'
                    },
                        {
                            text: '选择人员',
                            type: 'button-assertive',
                            onTap: function (e) {
                                $userModal.open();
                                $userModal.init({
                                    flagMultiple: false,
                                    confirm: function (user) {
                                        $ionicLoading.show();
                                        $flow.assist({
                                            assistId: user.id,
                                            scope: $scope,
                                            message: $scope.radio_model_data.clientSide,
                                            type: 1,
                                            success: function () {
                                                $ionicLoading.show({
                                                    template: '转发成功'
                                                });
                                                setTimeout(function () {
                                                    $ionicLoading.hide();
                                                    $state.go('main.workflow', {
                                                        flagHandle: 1
                                                    })
                                                }, 1000)
                                            }
                                        })
                                    },
                                    label: '选择转发人员'
                                });
                            }
                        }
                    ]
                });

            }
            $scope.openExtra = function () {
                $userModal.init({
                    flagMultiple: true,
                    preset: $scope.extraUserIds,
                    confirm: function (userIds) {
                        $scope.extraUserIds = userIds;
                    },
                    label: '选择后加签人员'
                });
                $userModal.open();
            };
            $scope.openBro = function () {
                $userModal.init({
                    flagMultiple: true,
                    confirm: function (userIds) {
                        $scope.broadcasts = userIds;
                    },
                    label: '选择被通知人员'
                });
                $userModal.open();
            };
        }

        $scope.goBack = function () {
//			goFinish.goFinish();
            $state.go('main.workflow', {flagHandle: 1})
        };

        initContext();
        initEvents();
    })