/**
 * Created by qin on 2016/8/9.
 */
angular.module('oa')
    .service('$client', function () {

    })
    .service('$modalClient', function ($common) {
        var $this = this;
        $common.initModalForm(this,
            'crm/crm-form.tpl.html',
            function (scope) {
                scope.title = '客户';
                scope.formData = {};
                scope.create = function () {
                    $common.http({
                        method:'POST',
                        url:domain+'/crm/opportunity/saveOpportunity',
                        data:scope.formData
                    }, function () {
                        $this.close();
                    })
                }
            },
            [
                {name:'客户名称',key:'name',ctrl:'text'},
                {name:'客户编号',key:'no',ctrl:'text'},
                {name:'客户级别',key:'levelImportance',ctrl:'options',src:'customer_importance'},
                {name:'来源',key:'source',ctrl:'options',src:'customer_source'},
                {name:'行业',key:'industry',ctrl:'options',src:'customer_industry'},
                {name:'子行业',key:'subIndustry',ctrl:''},
                {name:'销售状态',key:'statusSale',ctrl:'customer_status'},
                {name:'客户分级',key:'levelScale',ctrl:'customer_size'},
                {name:'地址',key:'address',ctrl:'text'},
                {name:'电话',key:'tel',ctrl:'number'},
                {name:'备注',key:'memo',ctrl:'textarea'},
                {name:'网址',key:'webSite',ctrl:'text'}
            ]
        );
    })
    .controller('ClientDetailCtrl', function ($scope,$http,$timeout,$filter,$ionicScrollDelegate,$state,$client,$modalClient) {
        $scope.keySet = [
            {
                key:'name',
                name:'客户名称'
            },
            {
                key:'personInchargeName',
                name:'负责人'
            },
            {
                key:'dealStatus',
                name:'成交状态'
            },
            {
                key:'levelImportanceName',
                name:'客户级别'
            },
            {
                key:'sourceName',
                name:'来源'
            },
            {
                key:'industryName',
                name:'行业'
            },
            {
                key:'openSeaName',
                name:'所属公海'
            },
            {
                key:'pickupTime',
                name:'领取时间'
            },
            {
                key:'tel',
                name:'电话'
            },
            {
                key:'memo',
                name:'备注'
            }
        ];
        $scope.openEdit = function () {
            $modalClient.openEdit($scope.detail);
        };
        $scope.detail = $client.curClient
    })
    .controller('ClientCtrl', function ($scope,$http,$timeout,$filter,$ionicScrollDelegate,$state,$client,$modalClient) {
        var page = 0,size = 10,nameKey;
        $scope.list = [];
        function getPage(final){
            $http.post(domain+'/crm/customer/list',{},{
                params:{
                    nameKey:nameKey,
                    page:page++,
                    size:size
                }
            }).success(function (data) {
                $scope.flagLoaded = true;
                $scope.list = $scope.list.concat(data.content)
                $scope.flagMore = !!data.content.length
                })
                .finally(function() {
                    final && final();
                    if($scope.list.length){
                        $timeout(function () {
                            $scope.flagMore = true;
                        },500)
                    }
                });
        }
        getPage();
        $scope.refresh = function () {
            $scope.list = [];
            getPage(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.loadMore = function() {
            getPage(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.search = function (name) {
            nameKey = name;
            $scope.list = [];
            page = 0;
            getPage();
        };
        $scope.goDetail = function (client) {
            $client.curClient = client;
            $state.go('main.crm-clientDetail.info')
        };
        $scope.openCreate = function () {
            $modalClient.openCreate();
        }
    });