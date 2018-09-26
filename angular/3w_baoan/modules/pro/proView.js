/**
 * Created by qin on 2016/8/16.
 */
/**
 * Created by qin on 2016/8/16.
 */
angular.module('oa')
    .controller('ProViewCtrl', function ($scope, $flow, $form, $http, $filter, $stateParams, $ionicHistory,
                                         $ionicPopup, $ionicLoading, $state, $userModal) {
        var proId = $stateParams.proId
            , modId, positiveNum
            , modal;
        $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd')
        $scope.doRefresh = function () {
            initContext();
            initEvents();
            $scope.$broadcast('scroll.refreshComplete');
        }
        function initContext() {
            $flow.initProWithMod({
                proId: proId,
                scope: $scope,
                flagView: true,
                success: function (data, nodesMap, currentNode, global, tableSchema) {
                    console.log(data)
                    console.log(currentNode)
                    $scope.currentNodeId = currentNode.id;
                    $scope.flagComments = [];
                    $scope.name = data.module.name;
                    $scope.proFileIds = data.fileIds
                    $form.renderView({
                        viewType: 'HandleView',
                        tableSchema: tableSchema,
                        scope: $scope,
                        elementId: 'mod-view',
                        name: data.module.name,
                        formData: data.formData,
                        node: currentNode
                    });
                    console.log($form.renderView.formData)
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
                        name: '来自' + userInfo.name + '的通知' + $scope.name + '֪ͨ',
                        content: '请查看' + $filter('date')(new Date(), 'yyyy-MM-dd') + '的流程' + $scope.name + '֪ͨ'
                    };
                    $scope.broadcasts = [broadcast];
                }
            });
        }

        function initEvents() {
            $scope.openWithdraw = function () {
                $scope.content = '';
                var myPopup = $ionicPopup.show({
                    template: '<textarea ng-model="$parent.content" rows="5" placeholder="在此输入撤回原因"></textarea>',
                    title: '撤回原因',
                    scope: $scope,
                    buttons: [
                        {text: '取消', type: 'button-balanced button-outline'},
                        {
                            text: '确认撤回',
                            type: 'button-balanced',
                            onTap: function (e) {
                                $ionicLoading.show();
                                $flow.withdraw({
                                    scope: $scope,
                                    message: $scope.content,
                                    success: function (data) {
                                        $ionicLoading.show({template: data.errMsg});
                                        setTimeout(function () {
                                            $ionicLoading.hide();
                                            $state.go('main.workflow', {flagHandle: 1})
                                        }, 1000)
                                    }
                                });
                            }
                        }]
                });
            };
            $scope.openBro = function () {
                $userModal.init({
                    flagMultiple: true,
                    confirm: function (userIds) {
                        $scope.broadcasts = userIds;
                    },
                    label: '被通知人'
                });
                $userModal.open();
            };
        }

        $scope.goBack = function () {
            // $ionicHistory.goBack();
         $state.go('main.workflow',{flagHandle:0})
        };
        initContext();
        initEvents();
    })