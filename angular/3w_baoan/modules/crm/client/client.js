/**
 * Created by qin on 2016/8/9.
 */
angular.module('oa')
    .controller('ClientCtrl', function ($scope, $form, $ionicModal, $rootScope, $http, $filter, $state, $search, $ionicScrollDelegate) {
            $scope.pager = {
                page: 1,
                size: 10
            }
            var tableKey = 'client',
                dbName = 'client_yhmxb',
                crmMore = 'handlerId',
                initUrl = domain + '/oa/crm/initList/' + tableKey + '?limit=' + $scope.pager.size + '&offset=' + $scope.pager.size * ($scope.pager.page - 1) + '&more=' + crmMore,
                filters = {normal: null},
                fieldsMap = {}, sales = [
                    {
                        name: '销售订单',
                        tableKey: 'xxsdd'
                    }, {
                        name: '回款',
                        tableKey: 'pay'
                    }
                ];
            // 初始化数据
            var mainList1 = []

            function initData() {
                $http.post(domain + '/oa/crm/initList/' + tableKey + '?limit=' + $scope.pager.size + '&offset=' + $scope.pager.size * ($scope.pager.page - 1) + '&more=' + crmMore, filters).success(function (data) {
                    mainList1 = mainList1.concat(data.list)
                    $scope.mainList = mainList1;
                    $scope.mainCount = data.count;
                    $scope.formView = data.module.formView;
                    $scope.searchSchema = JSON.parse(data.module.tableSchema);
                    angular.forEach($scope.searchSchema, function (field) {
                        fieldsMap[field.id] = field;
                    });
                    doload()
                })
            }

            // 是否开启上拉加载
            var doload = function () {
                var mainList = $scope.mainList
                if (mainList.length < $scope.mainCount) {
                    $scope.flagMore = true
                } else {
                    $scope.flagMore = false
                }
            }

            // 高级搜索模态框
            $ionicModal.fromTemplateUrl('modal-search.tpl.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.searchBox = modal
            })

            // 打开搜索
            $scope.openSearch = function () {
                $scope.searchBox.show();
                $form.renderSearch({
                    elementId: 'search-content',
                    scope: $scope,
                    tableSchema: $scope.searchSchema
                })
                $scope.searchData = {}
            }

            // 首页搜索
            $scope.searchClient = function (e, q) {
                if (e.keyCode == 13) {
                    if (q) {
                        var query = {}
                        query.name = q
                        $scope.query = query;
                        $scope.search(query)
                    } else {
                        delete filters.dynamic
                        initData()
                    }
                }
            }

            // 高级查询
            $scope.search = function (searchData) {
                var searchData1 = {}
                angular.forEach(searchData, function (v, k) {
                    if (v[0] && v[1]) {
                        var a = v[0]
                        var b = v[1]
                        if (/\d{4}-\d{2}-\d{2}/.test(a) && /\d{4}-\d{2}-\d{2}/.test(b)) {
                            v = []
                            v.push(a, b)
                        }
                    }
                    searchData1[k] = v
                })
                var concat = ' and ', filterList = $search.getSqlList(searchData1, fieldsMap, 'c.');
                filters = {};
                filtersLength = 0;
                if (filterList.length) {
                    filters.dynamic = filterList.join(concat);
                }
                filters.normal = null;
                $scope.pager.page = 1;
                $scope.mainList = false;
                var burl = domain + '/oa/crm/initList/' + tableKey + '?limit=100&more=' + crmMore;
                $http.post(burl, filters)
                    .success(function (data) {
                        var curList = data.list;
                        $scope.mainList = curList;
                        $scope.mainCount = data.count;
                        delete searchData
                    }).finally(function () {
                    $ionicScrollDelegate.resize()
                })
                $scope.flagMore = false
                $scope.searchBox.hide()
            };

            // 打开详情
            $scope.openDetail = function (item) {
                $state.go('clientDetail', {
                    tableSchema: $scope.searchSchema,
                    formView: $scope.formView,
                    name: '客户',
                    formData: item,
                    dbName: dbName,
                    tableKey: tableKey,
                    sales: sales
                })
            }

            // 下拉刷新
            $scope.doRefresh = function () {
                delete filters.dynamic
                $scope.pager.page = 1;
                mainList1 = []
                initData()
                $scope.$broadcast('scroll.refreshComplete')
            }

            // 上拉加载
            $scope.loadMore = function () {
                $scope.pager.page++;
                initData()
                $scope.$broadcast('scroll.infiniteScrollComplete')
            }

            initData();
        }
    );