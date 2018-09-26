/**
 * Created by qin on 2016/8/14.
 */
angular.module('oa')
    .controller('ProFormCtrl', function ($scope, $stateParams, $flow, $form, $filter, $ionicHistory,
                                         $state, $ionicLoading, $http) {
        $scope.goBack1 = function () {
            //goFinish.goFinish();
//            $state.go('main.workflow',{flagHandle:1})
//            $state.go('main.home')
//            console.log(1)
            $ionicHistory.goBack(-1);
        }
        $scope.doRefresh = function () {
            initContext();
            initEvents();
            $scope.$broadcast('scroll.refreshComplete');
        }
        var modId = $stateParams.modId
            , proId = parseInt($stateParams.proId)
            , modal, subModal, formView, tableSchema;
        $scope.flagEdit = proId;

        function contextCallback(data, nodesMap, currentNode, global, tableSchema) {
            $scope.name = data.module.name;
            formView = data.formView;
            $form.renderView({
                viewType: 'FormView',
                tableSchema: tableSchema,
                scope: $scope,
                elementId: 'mod-form',
                name: $scope.name,
                node: currentNode,
                formData: data.formData || {},
                flagParsed: true,
                module: data.module
            });
            //if ((!proId || data.state >= 0) && global.flagFlexible) {
            //    _renderFlex($scope, tableSchema);
            //}
            //$form.renderChart({
            //    elementId: 'flowChart',
            //    nodesMap: nodesMap,
            //    scope: $scope,asd
            //    width: global.width,
            //    currentNode: currentNode,
            //    tableSchema: tableSchema
            //});
            $scope.appKey = data.module.tableKey;
            $scope.objectId = data.module.id;
            $scope.flagSelectable = currentNode.flagNextNodesSelectable;
            if ($scope.flagSelectable) {
                var prevNode = {}
                $scope.nodesMap = nodesMap;
                $scope.nextNodes = currentNode.nextNodes;
                $scope.openSelectable = function (formData) {
                    $scope.formData = formData
                    modal = $modal.open({
                        templateUrl: 'modules/pro/modal-nodes.tpl.html',
                        scope: $scope,
                        backdrop: 'static'
                    })
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

        function initContext() {
            console.log(proId)
            if (proId > 0) {
                $scope.flagDrop = true;
                $scope.flagEdit = true;
                $flow.initProWithMod({
                    proId: proId,
                    scope: $scope,
                    flagView: true,
                    success: function (data, nodesMap, currentNode, global, tableSchema) {
                        $scope.proFileIds = data.fileIds;
                        contextCallback(data, nodesMap, currentNode, global, tableSchema)
                        if (data.state < 0 && data.logs) {
                            var logs = data.logs;
                            for (var i = logs.length - 1; i > 0; i--) {
                                if (logs[i].actionId == 3) {
                                    $scope.lastNegativeLog = logs[i];
                                    break;
                                }
                            }
                        }
                    }
                })
            } else {
                $scope.formData = {};
                $flow.init(modId, $scope, function (data, nodesMap, currentNode, global, tableSchema) {
                    contextCallback(data, nodesMap, currentNode, global, tableSchema)
                    //'<a class="btn btn-white" ui-sref="main.proView(proId:%s)">点击查看'+
                    //$scope.name+'流程'
                })
            }
        }

        function initEvents() {
            $scope.submit = function (formData) {
                console.log(formData);
                $ionicLoading.show();
                $flow.submit({
                    formData: formData || $scope.formData,
                    scope: $scope,
                    proId: proId || null,
                    success: function (data) {
                        console.log(data);
                        if (data.errCode == 2) {
                            // $ionicLoading.show({template: data.errMsg + '流程已结束'});
                            $ionicLoading.show({template: data.errMsg});
                            setTimeout(function () {
                                $ionicLoading.hide();
                                $state.go('main.workflow', {flagHandle: 1})
                            }, 1000)
                        } else if (data.errCode > 0) {
                            $ionicLoading.show({template: data.errMsg});
                            setTimeout(function () {
                                $ionicLoading.hide();
                                $state.go('main.workflow', {flagHandle: 1})
                            }, 1000)
                        } else {
                            $ionicLoading.show({template: '系统出现未知错误，请截图给管理员。报错日志为:' + data.errMsg});
                            setTimeout(function () {
                                $ionicLoading.hide();
                            }, 1000)
                        }
                    }
                })
            };
            $scope.drop = function () {
                $ionicLoading.show({
                    template: '正在删除流程相关信息'
                });
                $http.get(domain + '/oa/pro/drop/' + proId).success(function (data) {
                    console.log(data)
                    $ionicLoading.show({
                        template: '删除成功'
                    });
                    setTimeout(function () {
                        $ionicLoading.hide();
                        $state.go('main.workflow', {flagHandle: 1})
                    }, 1000)
                })
            };
        }

        $scope.goBack = function () {
            $state.go('main.workflow', {flagHandle: 1})
        };
        initContext();
        initEvents();
    })