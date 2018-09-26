angular.module('oa')
// 总览
    .controller('crmPreview', function ($scope, $state, $stateParams, $http) {
        // 返回详情
        $scope.back = function () {
            $state.go('clientDetail', $stateParams.data)
        }
        // 初始化数据
        $http.get(domain + '/oa/crm/getClientSales/' + $stateParams.data.formData.id).success(
            function (data) {
                angular.extend($scope, data);
            });
    })




    // 联系人
    .controller('crmContact', function ($scope, $state, $stateParams, $http, $ionicModal, $form, $rootScope, $filter, $ionicLoading) {
            // 返回详情
            $scope.back = function () {
                $state.go('clientDetail', $stateParams.data)
            }
            // 获取全部module
            var moduleMap;
            $http.get(domain + '/oa/crm/init').success(
                function (data) {
                    moduleMap = data;
                });

            // 初始化数据
            function initData() {
                $http.get(domain + '/oa/ao/getList/_app_' + $stateParams.data.dbName + '/' + $stateParams.data.formData.id + '?pk=client_id').success(
                    function (data) {
                        $scope.contacts = data;
                    })
            }

            // 加载模态框
            $ionicModal.fromTemplateUrl('modules/crm/template/modal-contact.tpl.html', {
                scope: $rootScope
            }).then(function (modal) {
                $rootScope.contactModal = modal
            })
            // 修改编辑
            $scope.openModal = function (item) {
                if (item) {
                    $rootScope.addItem = false
                } else {
                    $rootScope.addItem = true
                }
                $rootScope.formData = {
                    client_id: $stateParams.data.formData.id
                }
                $rootScope.contactModal.show()
                var dbKey = $stateParams.data.dbName.split('_')[1]
                var data = moduleMap[dbKey]
                var tableSchema;
                tableSchema = JSON.parse(data.tableSchema)
                $form.renderView({
                    viewType: 'FormView',
                    formView: data.formView,
                    tableSchema: tableSchema,
                    scope: $rootScope,
                    elementId: 'contactView',
                    formData: item || $rootScope.formData,
                    node: ''
                })
            }

            $rootScope.add = function () {
                $rootScope.formData.created_date = $rootScope.formData.created_date = $filter(
                    'date')(new Date(), 'yyyy-MM-dd');
                $rootScope.formData.created_by = userInfo.id;
                $rootScope.formData.status = null;
                $http.post(domain + '/oa/ao/add/_app_' + $stateParams.data.dbName, $rootScope.formData).success(function () {
                    $ionicLoading.show({
                        template: '成功'
                    });
                    setTimeout(function () {
                        $ionicLoading.hide()
                        $rootScope.contactModal.hide()
                    }, 500)
                    initData()
                })
            }
            $rootScope.edit = function () {
                $http.post(domain + '/oa/crm/updateContact/' + $stateParams.data.dbName, $rootScope.formData).success(function () {
                    $ionicLoading.show({
                        template: '成功'
                    });
                    setTimeout(function () {
                        $ionicLoading.hide()
                        $rootScope.contactModal.hide()
                    }, 500)
                    initData()
                })
            }

            initData()
        }
    )




    // 交易情况
    .controller('crmTransaction', function ($scope, $state, $stateParams, $http, $form, $ionicModal, $rootScope) {
        // 返回详情
        $scope.back = function () {
            $state.go('clientDetail', $stateParams.data)
        }
        // 初始化数据
        $scope.sales = $stateParams.data.sales
        angular.forEach($stateParams.data.sales, function (item) {
            var tableKey = item.tableKey
            $http.post(domain + '/oa/crm/getListBySqlKey/' + tableKey, {
                byClientId: {
                    clientId: $stateParams.data.formData.id
                }
            }).success(function (data) {
                $scope.salesList = {}
                $scope.salesList[tableKey] = data;
            })
        })
        // 打开交易详情
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-transaction.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.transactionBox = modal;
        })
        $scope.openSaleDetail = function (tableKey, item, index) {
            $rootScope.transactionBox.show()
            $http.get(domain + '/oa/mod/initByTableKey/' + tableKey)
                .success(function (data) {
                    curTableKey = tableKey;
                    curFormId = item.id;
                    curMod = data;
                    getFormData(curMod.module.id, item.id, null, 'salesView');
                })

            function getFormData(modId, formId, pk, elementId) {
                $http.get(domain + '/oa/mod/getModForm/' + modId + '/' + formId,
                    {params: {pk: pk}})
                    .success(function (data) {
                        curFormData = data;
                        curFormId = formId;
                        var schema = JSON.parse(curMod.tableSchema)
                        $form.renderView({
                            formView: curMod.formView,
                            tableSchema: schema,
                            scope: $scope,
                            elementId: elementId || 'form-view',
                            formData: curFormData,
                            node: '',
                            viewType: 'HandleView'
                        })
                    })
            }
        };
    })




    // 销售记录
    .controller('crmSales', function ($scope, $state, $stateParams, $http, $ionicModal, $form, $rootScope, $filter, $ionicLoading) {
        // 返回详情
        $scope.back = function () {
            $state.go('clientDetail', $stateParams.data)
        }

        // 初始化数据
        function initData() {
            $http.post(domain + '/oa/crm/getListBySqlKey/handles/', {
                byClientId: {
                    clientId: $stateParams.data.formData.id
                }
            }).success(function (data) {
                $scope.handles = data;
            })
        }

        // 加载模态框
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-sales.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.salesModal = modal;
        })
        // 打开模态框
        $scope.openModal = function () {
            $rootScope.salesModal.show()
        }

        initData()
    })




    //日程安排
    .controller('crmCalendar', function ($scope, $state, $stateParams, $http, $ionicModal, $form, $rootScope, $filter, $ionicLoading) {
        // 返回详情
        $scope.back = function () {
            $state.go('clientDetail', $stateParams.data)
        }

        // 初始化数据
        function initData() {
            $http.get(domain + '/oa/crm/getAgendas/' + $stateParams.data.formData.id).success(function (data) {
                $scope.calendars = data;
            })
        }

        // 加载模态框
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-calendar.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.calendarModal = modal;
        })
        // 打开模态框
        $scope.openModal = function () {
            $rootScope.calendarModal.show()
        }
        var filterDate = $filter('date')
        $scope.getDate = function (item) {
            if (filterDate(item.start, 'yyyy-MM-dd') == filterDate(
                    item.end, 'yyyy-MM-dd'))
                return filterDate(item.start, 'yyyy-MM-dd HH:mm:ss')
                    + ' 至 ' + filterDate(item.end, 'HH:mm:ss');
            else
                return filterDate(item.start, 'yyyy-MM-dd HH:mm:ss')
                    + ' 至 '
                    + filterDate(item.end,
                        'yyyy-MM-dd HH:mm:ss');
        };

        initData()
    })




    // 日志
    .controller('crmLogs', function ($scope, $state, $stateParams, $http) {
        // 返回详情
        $scope.back = function () {
            $state.go('clientDetail', $stateParams.data)
        }
        var payload = {
            id: $stateParams.data.formData.id,
            page: 1,
            size: 10
        }
        // 初始化数据
        $http.post(domain + '/oa/crm/getLogs?tableKey=' + $stateParams.data.tableKey, payload).success(function (data) {
            $scope.logsList = data.list
            $scope.logsCount = data.count
            doload()
        })
        // 是否开启上拉加载
        var doload = function () {
            var logsList = $scope.logsList
            if (logsList.length < $scope.logsCount) {
                $scope.flagMore = true
            } else {
                $scope.flagMore = false
            }
        }
        // 上拉加载
        $scope.loadMore = function () {
            $http.post(domain + '/oa/crm/getLogs?tableKey=' + $stateParams.data.tableKey, payload).success(function (data) {
                var l = data.list;
                if (l.length == 0) {
                    $scope.flagMore = false
                }
                var list = $scope.logsList
                $scope.logsList = list.concat(l)
            })
            payload.page++;
            $scope.$broadcast('scroll.infiniteScrollComplete')
        }
    })