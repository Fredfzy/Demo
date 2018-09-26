/**
 * Created by qin on 2016/04/07.
 */
angular.module('oa')
    .controller('DashCtrl', function ($scope, $state, $http, $filter, $ionicModal, $ionicLoading,$rootScope) {
        $rootScope.modalInstance.show();
        var modalInstance,
            modalAttendance,
            contactPager = {page: 0, size: 10}
        $http.get(domain+'/oa/access/getAllByAclSp/_bul')
            .success(function (data) {
                $scope.bulletinList = data;
            })
        $ionicModal.fromTemplateUrl('modal-contacts.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            modalInstance = modal;
        });
        $ionicModal.fromTemplateUrl('modules/main/modal-attendance.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            modalAttendance = modal;
        });
        $http.get(domain + '/oa/bulletin/getList/news').success(function (data) {
            $scope.news = data;
        });
        $scope.go = function (state) {
            $state.go(state);
        };
        function getNews() {
            $scope.aclList = undefined
            $http.get(domain + '/oa/news/initAclList?limit=10').success(function (data) {
                $scope.aclList = data.list;
            });
        }

        function getMemos() {
            $scope.aclList = undefined
            $http.get(domain + '/oa/news/getMemoList').success(function (data) {
                $scope.aclList = data;
            });
        }

        $scope.doTab = function (tab) {
            $scope.flagTab = tab;
            if (tab == 0) {
                getNews();
            } else {
                getMemos();
            }
        };
        $scope.doTab(0);
        $scope.$on('$stateChangeSuccess', function () {
            $scope.doTab(0);
        });
        function initUserList() {
            $http.get(domain + '/oa/user/initList?limit=6')
                .success(function (data) {
                    $scope.userList = data.list;
                    $scope.userSize = data.count;
                })
        }

        initUserList();
        $scope.doMemo = function (item, type, id) {
            $ionicLoading.show()
            $http.get(domain + '/oa/news/addMemo/type/' + type + '/id/' + id)
                .success(function (data) {
                    $ionicLoading.hide()
                    item.flagMemo = 1;
                })
        };
        $scope.doDeMemo = function (item, type, id, index) {
            $ionicLoading.show()
            $http.get(domain + '/oa/news/deMemo/type/' + type + '/id/' + id)
                .success(function (data) {
                    $ionicLoading.hide()
                    item.flagMemo = 0;
                    $scope.aclList.splice(index,1)
                })
        };
        $scope.marginLeft = (document.documentElement.clientWidth/5-50)/2;
        //contacts
        $scope.doRefreshContacts = function () {
            initUserList();
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.getFlagContacts = function () {
            return $scope.userList && $scope.userList.length < $scope.userSize;
        };
        $scope.doLoadContacts = function () {
            contactPager.page++
            $http({
                url: domain + '/oa/user/getPage',
                params: {
                    offset: contactPager.page * contactPager.size,
                    limit: contactPager.size
                }
            }).success(function (data) {
                $scope.userList = $scope.userList.concat(data);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }
        $scope.close = function () {
            modalInstance.hide();
            modalAttendance.hide();
        };
        $scope.openContacts = function () {
            modalInstance.show();
        };
        //attendance
        var location = {};
        $scope.types = [
            {id: 0, name: '上班'},
            {id: 1, name: '下班'},
            {id: 2, name: '外勤'}
        ];
        $scope.flagType = 0;

        $scope.openAttendance = function () {
            modalAttendance.show();
        };
    })
    .controller('BulletinCtrl', function ($scope, $http, $stateParams) {
        $http.get(domain+'/oa/ao/get/_bul/'+$stateParams.id).success(function (data) {
            $scope.detail = data;
        })
    })
    .controller('EveCtrl', function ($scope, $state, $http, $filter,$mod,$ionicScrollDelegate,$rootScope) {
            var proViewStates = [
                {name:'未提交',color:'warning'},
                {name:'审批中',color:'balanced'},
                {name:'已结束',color:'success'}
            ];
            proViewStates[-1] = {name:'被拒绝',color:'danger'};
            proViewStates[-2] = {name:'被撤回',color:'danger'};
            var proHandleStates = [
                {name:'待提交',color:'warning'},
                {name:'待审批',color:'primary'}
            ];
            proHandleStates[-1] = {name:'待编辑',color:'danger'};
            proHandleStates[-2] = {name:'待编辑',color:'danger'};
            $scope.types = [
                {name:'内部邮件',color:'info',icon:'ion-email',
                    go: function (item) {
                        $state.go('topicDetail',{id:item.topId})
                    },
                    states:[
                        {name:'未读',color:'energized'},
                        {name:'已读',color:'balanced'}
                    ]},
                {name:'待办流程',color:'balanced',icon:'ion-ios-compose-outline',
                    go: function (item) {
                        $state.go('proHandle',{proId:item.proId})
                    },states:proHandleStates},
                {name:'历史流程',color:'balanced',icon:'ion-ios-paper-outline',
                    go: function (item) {
                        $state.go('proView',{proId:item.proId})
                    },states:proViewStates}
            ];
            function initBundle(){
                $http.get(domain+'/oa/eve/getList/8')
                    .success(function (data) {
                        $scope.eveList = $filter('orderBy')(data,'createdDate',true)
                    });
            }
            initBundle();
            $scope.$on('$stateChangeSuccess', function() {
                initBundle();
            });
             $mod.access(function (data) {
                        $rootScope.cats = $filter('orderBy')(data.cats,'priority');
                        $rootScope.catsMap = data.catsMap;
                        $rootScope.flagWTab = $rootScope.cats[0].id;
                        $rootScope.cat($rootScope.cats[0]);
                        $rootScope.catsMap.all = data.mods;
                    });
                    $rootScope.cat = function (item) {
                        $rootScope.curCat = $rootScope.curCat == item?false:item;
                        $ionicScrollDelegate.resize();
                    };
                    $rootScope.go = function (name,params) {
                        $rootScope.modal.hide();
                        $rootScope.go(name,params);
                    }
                    $rootScope.close = function () {
                                    //modalInstance.hide();
                                    goFinish.goFinish();
                      };
        })