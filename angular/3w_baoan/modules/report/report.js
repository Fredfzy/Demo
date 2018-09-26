/**
 * Created by qin on 2016/04/16.
 */
angular.module('oa')
    .service('ReportService', function () {
        this.setCurrentCat = function (cat) {
            this.currentCat = cat
        }
        this.setCurrentReport = function (report) {
            this.currentReport = report
        }
    })
    .controller('ReportCtrl', function ($scope, $http, ReportService) {
        $scope.a = function () {
            goFinish.goFinish();
        }
        $scope.backUrl = 'main.app';
        $scope.title = '报表类别';
        $scope.infoNothing = '无权限查看报表';
        $scope.icon = 'ion-ios-albums-outline';
        $scope.go = function (item) {
            ReportService.setCurrentReport(item)
            location.href = '#/reportDetail/' + item.id;
        }

        function getCats() {
            $http.get(domain + '/oa/access/getAccess/1').success(function (data) {
                $scope.list = data.cats;
                $scope.map = data.catsMap;
            });
        }

        getCats();
    })
    .controller('ReportDetailCtrl', function ($scope, $stateParams, $http, $ionicModal, $ionicLoading, $form, $ionicPopup, $ionicScrollDelegate, ReportService, $timeout, $ionicSlideBoxDelegate) {
        var pager = {page: 0, size: 10}
            , id = $stateParams.id
            , condition = {}
            , modalInstance
            , privilegeFields
            , filters = {}
            , fieldsMap = {}, flagFieldsMap;
        console.log(id);
        $ionicModal.fromTemplateUrl('modal-searcher.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            modalInstance = modal;
        });
        $scope.parseJ = function (detail) {
            return JSON.parse(detail)
        };
        $scope.backUrl = 'report'
        init(id);

        function init(modId) {
            $scope.name = '';
            var urlInit = userInfo.userType == 'ADMIN' ? '/oa/rep/initByAdmin/' + modId + '?limit=' + pager.size : '/oa/rep/init';
            $http.post(domain + urlInit, {
                modId: modId,
                groupId: $scope.userInfo.groupId,
                roleId: $scope.userInfo.roleId,
                limit: 10,
                offset: 0,
                open: '1'
            }).success(function (data) {
                $scope.list = data.list;
                $scope.size = data.count;
                $scope.detailTabs = data.tabs;
                $scope.flagMore = $scope.list.length < $scope.size;
                $scope.title = $scope.name = data.name;
                var privilege = data.privilege
                $scope.priName = privilege.name;
                var tableSchema = JSON.parse(data.tableSchema);
                /*if(privilege.fields){
                    var fields = [];
                    privilegeFields = privilege.fields.split(',');
                    for(var i = 0;i<tableSchema.length;i++){
                        for(var j = 0;j<privilegeFields.length;j++){
                            if(tableSchema[i].id == privilegeFields[j]){
                                fields.push(tableSchema[i]);
                                privilegeFields.splice(j,1);
                                break;
                            }
                        }
                        if(!privilegeFields.length) break;
                    }
                    privilegeFields = tableSchema = fields;
                } else {
                    privilegeFields = tableSchema;
                }*/
                privilegeFields = tableSchema;
                $scope.sum = data.sum;
                $form.renderRep({
                    tableSchema: privilegeFields,
                    actions: privilege.actions,
                    elementId: 'rep-view',
                    scope: $scope
                });
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.doRefresh = function () {
            init(id);
        };
        $scope.doLoad = function () {
            $http.post(domain + '/oa/rep/getPage', filters, {
                params: {
                    offset: (++pager.page) * pager.size,
                    limit: pager.size
                }
            }).success(function (data) {
                $scope.list = data;
            })
        };
        $scope.close = function () {
            modalInstance.hide();
            init(id);
        };

        //searcher
        function _getFieldsMap() {
            angular.forEach(privilegeFields, function (field) {
                fieldsMap[field.id] = field;
            })
        }


        $scope.openSearch = function () {
            $scope.searchData = {};
            modalInstance.show();
            if (!flagFieldsMap) {
                _getFieldsMap();
                flagFieldsMap = true;
            }
            // $timeout(function () {
            $form.renderSearch({
                elementId: 'search-view',
                scope: $scope,
                tableSchema: privilegeFields
            })
            // })
        };
        $scope.search = function (searchData) {
            console.log(searchData)
            modalInstance.hide();
            var dynamic = ' 0 ', concat = ' or ';
            angular.forEach(searchData, function (value, key) {
                if (value && fieldsMap[key]) {
                    var ctrl = fieldsMap[key].ctrl;
                    if (ctrl == 'text' || ctrl == 'textarea' || ctrl == 'decoration' || ctrl == 'info') {
                        dynamic += concat + '(' + key + ' like "%' + value + '%")';
                    } else if (ctrl == 'number' || ctrl == 'currency' || ctrl == 'datediff') {
                        if (value[1] > value[0]) {
                            dynamic += concat + '(' + key + ' between ' + value[0] + ' and ' + value[1] + ')';
                        }
                    } else if (ctrl == 'select' || ctrl == 'user') {
                        dynamic += concat + '(' + key + '=' + value + ')';
                    } else if (ctrl == 'multiselect' || ctrl == 'users') {
                        dynamic += concat + '(' + key + ' in (' + value + '))';
                    } else if (ctrl == 'datetime' || ctrl == 'current') {
                        if (+new Date(value[1]) > +new Date(value[0])) {
                            dynamic += concat + '(' + key + ' between ' + value[0] + ' and ' + value[1] + ')';
                        }
                    }
                }
            });
            filters.dynamic = dynamic;
            $http.post(domain + '/oa/rep/initList', filters, {
                params: {
                    limit: pager.size
                }
            }).success(function (data) {
                $scope.list = data.list;
                $scope.size = data.count;
                $ionicSlideBoxDelegate.update();
            })
        };
        $scope.slideHasChanged = function (index) {
            // console.log(index)
//      	alert(index)
            if (index == 10) {
                $ionicPopup.confirm({
                    template: '是否加载下 10 条报表？',
                    cancelText: '取消',
                    okText: '确定',
                    okType: 'balanced'
                }).then(function (res) {
                    if (res) {
                        $scope.list = false;
                        $scope.doLoad();
                    } else {
                        $ionicSlideBoxDelegate.slide(9)
                    }
                });
            }
        };
    })