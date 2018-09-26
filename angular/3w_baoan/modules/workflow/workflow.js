/**
 * Created by qin on 2016/04/09.
 */
angular.module('oa')
    .controller('WorkflowCtrl', function ($scope, $http, $stateParams, $api, $state,
                                          $ionicModal, $ionicLoading, APIRead) {
        var modalInstance
            , pager = {page: 0, size: 10}
            , flagHandle = $stateParams.flagHandle == 1
            , currentTab;
        $scope.flagHandle = flagHandle;
        var api = $api.create({
            scope: $scope,
            name: 'pro',
            pager: {page: 0, size: 20}
        });
        $scope.back_android = function () {
            goFinish.goFinish();
        }
        var prevTabKey, filters;
        $ionicModal.fromTemplateUrl('modules/workflow/modal-catsMods.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up',
        }).then(function (modal) {
            $scope.modal = modalInstance = modal;
        });
        $scope.statesStyles = ['positive', 'balanced', 'calm', 'dark', 'assertive']
        $scope.statesStyles[-1] = 'assertive';

        function init(flag) {
            if (flag) {
                filters = {preHandle: null};
                if (config == 'sate')
                    api = $api.create({
                        scope: $scope,
                        name: 'handle',
                        pager: {page: 0, size: 10}
                    });
                $scope.tabs = [
                    {name: '待处理', color: 'navy'},
                    {key: 'handle', name: '待审批', color: 'navy'},
                    {key: 'edit', name: '待编辑', color: 'warning'}
                ];
                // $http.get(domain+'/oa/workflow/initList/UnHandled?limit=10&offset=0')
                //     .success(function (data) {
                //         $scope.oldPros = data.list;
                //     });
            } else {
                $scope.tabs = [
                    {name: '历史', color: 'navy'},
                    {key: 'submitted', name: '已发起的', color: 'navy'},
                    {key: 'handled', name: '已审批的', color: 'success'}
                ];
                filters = {related: null};
                // $http.get(domain+'/oa/workflow/initList/SubmittedOrHandled?limit=8&offset=0')
                //     .success(function (data) {
                //         $scope.oldPros = data.list;
                //     })
            }
            $scope.flagTab = 0;
            $scope.pros = [];
            currentTab = $scope.tabs[0];
            $scope.title = currentTab.name + '工作流';
            initList();
        }

        init($scope.flagHandle);

        function initList() {
            var url = config == 'sate' ? '/oa/handle/initMods' : '/oa/pro/initMods';
            api.initList(function (data) {
//          	console.log(data)
                $http.post(domain + url, data.filtersStr, {
                    headers: {'Content-Type': 'text/html'}
                }).success(function (data) {
//              	console.log(data)
                    $scope.mods = data;
                    var modsMap = {};
                    angular.forEach(data, function (item) {
                        modsMap[item.id] = item;
                    });
                    $scope.modsMap = modsMap;
                })
            }, filters, 'pros');
        }

        function initEvents() {
            $scope.refresh = function () {
                $scope.flagBatching = false;
                delete filters.byMod;
                delete filters.byState;
                delete filters.search;
                initList();
                $scope.$broadcast('scroll.refreshComplete');
            };
            $scope.groupByMod = function (mod) {
                $scope.curMod = mod;
                $scope.flagBatching = false;
                filters.byMod = {modId: mod.id};
                api.initList(false, filters, 'pros');
            };
            $scope.tab = function (tab, callback) {
                $scope.title = tab.name + '工作流';
                pager = {page: 0, size: 10}
                currentTab = tab;
                prevTabKey && delete filters[prevTabKey];
                if (tab.key) {
                    prevTabKey = tab.key;
                    filters[tab.key] = null;
                }
                api.initList(callback, filters, 'pros');
            };
            $scope.doParentTab = function (flag) {
                flagHandle = flag;
                location.href = '#/main/workflow/' + flag
                $state.go('main.workflow', {flagHandle: flag})
                //init(flag);
                //$scope.tab(currentTab)
            };
            $scope.loadMore = function () {
                api.getPage(false, 'pros');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            $scope.openModal = function () {
                modalInstance.show();
            };
            $scope.close = function () {
                console.log(1)
                modalInstance.hide();
            };
        }

        initEvents();
        $scope.doForm = function () {
            modalInstance.hide();
            location.href = '#/main/flowForm';
        };
        $scope.go = function (process) {
            if (flagHandle) {
                if (process.state == 0 || process.state == -1) {
                    $state.go('proForm', {modId: process.modId, proId: process.id});
                } else $state.go('proHandle', {proId: process.id});
            } else {
                $state.go('proView', {proId: process.id});
            }
        };
        $scope.goOld = function (item) {
            if (item.state > 0) {
                $state.go('main.flowView', {
                    formId: item.formId, objectId: item.objectId,
                    processId: item.id, flagHandle: flagHandle
                });
            } else {
                $state.go('main.flowEdit', {
                    formId: item.formId, objectId: item.objectId,
                    processId: item.id, flagReject: item.state
                });
            }
        };
        $scope.$on('$stateChangeSuccess', function () {
            if (!location.hash.indexOf('workflow')) {
                $scope.flagCat = 0;
                init($stateParams.flagHandle);
            }
        });
    }).controller('catsModsCtrl', function ($rootScope, $scope, $mod, $filter, $state, $ionicScrollDelegate) {
    $mod.access(function (data) {
        $scope.cats = $filter('orderBy')(data.cats, 'priority');
        $scope.catsMap = data.catsMap;
        $scope.flagWTab = $scope.cats[0].id;
        /*           $scope.cat($scope.cats[0]);*/
        $scope.catsMap.all = data.mods;
    });
    $scope.cat = function (item) {
        $scope.curCat = $scope.curCat == item ? false : item;
        $ionicScrollDelegate.resize();
    };
    $scope.go = function (name, params) {
//        console.log($scope.modal)
//            $scope.modal.hide();
        $rootScope.modalInstance.hide();
        $state.go(name, params);
    }
})
    .filter('workMap', function () {
        return function (input, query) {
            var output = [];
            angular.forEach(input, function (v) {
                if (v.name.indexOf(query) > -1 || v.tableKey.indexOf(query) > -1 || !query) {
                    output.push(v)
                }
            })
            return output;
        }
    })