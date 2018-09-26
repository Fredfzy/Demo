/**
 * Created by qin on 2016/10/5.
 */
/**
 * Created by qin on 2016/8/9.
 */
angular.module('oa')
    .service('$common', function ($ionicModal,$rootScope,$http,$ionicLoading,$interpolate,$compile) {
        this.initModalService = function (templateUrl,scopeCallback) {
            var modal,scope = $rootScope.$new();
            function _init(){
                $ionicModal.fromTemplateUrl(templateUrl, {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function(data) {
                    modal = data;
                });
            }
            _init();
            scope.close = function () {
                modal.hide();
            };
            var ext = {};
            scopeCallback && scopeCallback(scope,ext,modal);
            this.open = function () {
                !modal && _init();
                modal.show();
            };
            this.close = function () {
                modal.hide();
            };
            this.setScope = function (callback) {
                callback(scope,ext);
            }
        };
        var ctrlMap = {
            'text':'<input type="text" ng-model="formData.{{key}}" placeholder="在此输入{{name}}"/>',
            'number':'<input type="number" ng-model="formData.{{key}}" placeholder="在此输入{{name}}"/>',
            'textarea':'<textarea rows="10" ng-model="formData.{{key}}"></textarea>',
            'datetime':'<c-datepicker type="{{type}}" preset="formData.{{key}}" output="formData.{{key}}"></c-datepicker>',
            'options':'<crm-options src="{{src}}" output="formData.{{key}}"></crm-options>',
            'clients':'<crm-clients output="formData.{{key}}"></crm-clients>'
        };
        this.initModalForm = function ($this,templateUrl,scopeCallback,fields) {
            this.initModalService.call($this,templateUrl, function (scope,ext,modal) {
                $this.openCreate = function () {
                    scope.flagEdit = false;
                    $this.open();
                };
                $this.openEdit = function (formData) {
                    scope.flagEdit = true;
                    scope.formData = formData;
                    $this.open();
                };
                scopeCallback && scopeCallback(scope,ext)
                scope.$on('modal.shown', function (data) {
                    var jqForm = angular.element(document.getElementById('form-view'))
                        ,template = '';
                    if(scope.flagEdit){
                        scope.title = '编辑'+scope.title;
                        angular.forEach(fields, function (field) {
                            if(!field.flagEditHidden){
                                template += '<div class="item item-input"><span class="input-label">'+
                                    field.name+'</span>';
                                var ctrl = ctrlMap[field.ctrl];
                                if(ctrl)
                                    template += $interpolate(ctrl)(field);
                                template += '</div>'
                            }
                        });
                    } else {
                        scope.title = '新增'+scope.title;
                        angular.forEach(fields, function (field) {
                            template += '<div class="item item-input"><span class="input-label">'+
                                field.name+'</span>';
                            var ctrl = ctrlMap[field.ctrl];
                            if(ctrl)
                                template += $interpolate(ctrl)(field);
                            template += '</div>'
                        });
                    }
                    jqForm.html(template);
                    $compile(jqForm)(scope);
                });
            });
        };
        this.http = function (httpConfig,successCallback,successKey,msgKey) {
            $ionicLoading.show();
            successKey = successKey||'success';
            msgKey = msgKey || 'msg';
            $http(httpConfig)
                .success(function (data) {
                    if(data[successKey]){
                        $ionicLoading.show({template:data[msgKey]||'处理成功'});
                        successCallback && successCallback(data);
                    } else {
                        $ionicLoading.show({template:data[msgKey]||'出现错误'});
                    }
                    setTimeout(function () {
                        $ionicLoading.hide();
                    },800);
                })
        }
    })
    .service('$sales', function ($common) {
        var $this = this;
        $common.initModalService.call(this,
            'crm/client/modal-sales.tpl.html',
            function (scope) {
                scope.formData = {};
                scope.create = function () {
                    $common.http({
                        method:'POST',
                        url:domain+'/crm/saletrack/saveSaleTrack',
                        data:scope.formData
                    }, function () {
                        $this.close();
                    })
                }
            }
        );
    })
    .service('$clients', function ($common,$http) {
        $common.initModalService.call(this,'modules/components/templates/modal-select.tpl.html',
            function (scope,ext) {
                $http.post(domain+'/crm/customer/list?&page=0&size=8',{})
                    .success(function (data) {
                        scope.flagLoaded = true;
                        scope.list = data.content;
                    });
                scope.displayField = 'name';
                scope.label = '请选择客户';
                var curItem = {};
                scope.doSelect = function (item) {
                    curItem.flagSelected = false;
                    (curItem=item).flagSelected = true;
                    ext.curItem = curItem;
                };
            }
        );
    })
    .service('$modalChance', function ($common) {
        var $this = this;
        $common.initModalForm(this,
            'crm/crm-form.tpl.html',
            function (scope) {
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
                {name:'客户',key:'customerName',ctrl:'clients',flagEditHidden:true},
                {name:'机会名称',key:'name',ctrl:'text'},
                {name:'状态',key:'statusKey',ctrl:'options',src:'opportunity_status'},
                {name:'预计成交日期',key:'expectedDealDate',ctrl:'datetime',type:'date'},
                {name:'预计成交金额',key:'expectedDealPrice',ctrl:'number'},
                {name:'发现日期',key:'foundDate',ctrl:'datetime',type:'date'},
                {name:'需求说明',key:'requirementDesc',ctrl:'textarea'},
                {name:'描述',key:'innerDesc',ctrl:'textarea'},
                {name:'机会来源',key:'sourceKey',ctrl:'options',src:'opportunity_source'},
                {name:'机会类型',key:'typeKey',ctrl:'options',src:'opportunity_type'},
                {name:'销售阶段',key:'saleStageKey',ctrl:'options',src:'opportunity_salestage'}
            ]
        );
    })
    .controller('CrmCtrl', function ($scope,$http,$filter,$ionicScrollDelegate, $ionicActionSheet,$sales,$modalClient) {
        console.log('CrmCtrl');
        var monArr = ['january','february','march','april','may','june','july','august','september','october','november','december'];
        var date = new Date();
        var curMonth = $filter('date')(date,'yyyy-MM');
        var monKey = monArr[date.getMonth()];
        $scope.collapse = function (list) {
            $scope[list+'Limit'] = $scope[list+'Limit'] == 2?$scope[list].details.length:2;
            $ionicScrollDelegate.resize();
        };
        $scope.collapseList = function (list,num) {
            $scope[list+'Limit'] = $scope[list+'Limit'] == num?$scope[list].length:num;
            $ionicScrollDelegate.resize();
        };
        $scope.tab = function () {
            $ionicScrollDelegate.resize();
        };
        $http.get(domain+'/crm/stat/birefData?fullMonth='+curMonth)
            .success(function (data) {
                $scope.counts = data;
            })
        $http.get(domain+'/crm/stat/tradeData?fullMonth='+curMonth)
            .success(function (data) {
                angular.extend($scope,data);
                angular.forEach(data, function (value, key) {
                    $scope[key+'Limit'] = 2;
                });
                var payment = data.payment.total||1;
                var target =data.purpose.purpose||1;
                $scope.percent = payment/target;
            })
        $http.get(domain+'/crm/payment/getAmountTobePay')
            .success(function (data) {
                var amountTobePaySum = 0;
                $scope.amountToBePay = data;
                angular.forEach(data, function (item) {
                    amountTobePaySum+=item.amountTobePay;
                });
                $scope.amountToBePaySum = amountTobePaySum;
                $scope.amountToBePayLimit = 4;
                $ionicScrollDelegate.resize();
            })
        $http.get(domain+'/crm/customer/getForgetCustomers')
            .success(function (data) {
                $scope.forgetCustomers = data;
                $scope.forgetCustomersLimit = 2;
            });
        $scope.openCreate = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '新增销售记录' },
                    { text: '新增客户' }
                ],
                cancelText: '取消',
                buttonClicked: function(index) {
                    if(index==0){
                        $sales.open();
                    } else if(index==1){
                        $modalClient.openCreate();
                    }
                    return true;
                }
            });
        };
    })
    .controller('CrmMenuCtrl', function ($scope) {
        $scope.menuList = [
            {
                state:'client',
                name:'客户'
            },
            {name:'机会',state:'chance'},
            {name:'联系人',state:''},
            {name:'产品',state:''},
            {name:'公海',state:''},
            {name:'成交',state:''},
            {name:'回款',state:''}
        ];
    })
    .service('$detail', function () {

    })
    .controller('CrmChanceCtrl', function ($scope,$state,$http,$detail,$modalChance,$ionicSideMenuDelegate) {
        $scope.tplItem = 'crm/chance/chance.tpl.html';
        $scope.title = '机会';
        $scope.openCreate = function () {
            $modalChance.openCreate();
        };
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $detail.chance = {};
        $scope.go = function (item) {
            $detail.chance = item;
            $state.go('main.crm-chanceDetail');
        };
        $http.post(domain+'/crm/opportunity/getOpportunityList?page=0&size=10',{})
            .success(function (data) {
                $scope.list = data.content;
            })
    })
    .controller('CrmChanceDetailCtrl', function ($scope,$state,$http,$detail,$remove,$common,$modalChance) {
        $scope.detail = $detail.chance;
        $scope.keySet = [
            {name:'客户',key:'customerName'},
            {name:'机会名称',key:'name'},
            {name:'状态',key:'statusVal'},
            {name:'预计成交日期',key:'expectedDealDate'},
            {name:'预计成交金额',key:'expectedDealPrice'},
            {name:'发现日期',key:'foundDate'},
            {name:'需求说明',key:'requirementDesc'},
            {name:'描述',key:'innerDesc'},
            {name:'机会来源',key:'sourceVal'},
            {name:'机会类型',key:'typeVal'},
            {name:'销售阶段',key:'saleStageVal'},
            {name:'创建人',key:'userName'},
            {name:'创建时间',key:'createddate'},
            {name:'最后变化时间',key:'lastmodifieddate'}
        ];
        $scope.back = function () {
            $state.go('main.crm-chance');
            $detail.chance = {};
        };
        $scope.openEdit = function () {
            $modalChance.openEdit($scope.detail);
        };
        $scope.openRemove = function () {
            $remove.open('是否确认删除'+$scope.detail.name, function () {
                $common.http(
                    {url:domain+'/crm/opportunity/delOpportunity?id='+$scope.detail.id},
                    function () {
                        $scope.back();
                    }
                );
            })
        }
    });