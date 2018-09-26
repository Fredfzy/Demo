/**
 * Created by qin on 2016/10/6.
 */
angular.module('oa')
    .controller('ErpCtrl', function ($scope,$ionicScrollDelegate) {
        $scope.toggle = function () {
            $ionicScrollDelegate.resize();
        };
        $scope.list = [
            {name:'采购管理'},
            {name:'销售管理'},
            {name:'库存管理'},
            {name:'统计报表'}
        ]
        $scope.map = [
            [
                {name:'采购管理',key:''},
                {name:'请购单',key:''},
                {name:'询价单',key:''},
                {name:'采购单',key:''},
                {name:'采购入库',key:''},
                {name:'退(换)货',key:''},
                {name:'采购收票',key:''},
                {name:'预付款',key:''},
                {name:'付款单',key:''}
            ],
            [
                {name:'报价单',key:''},
                {name:'销售订单',key:''},
                {name:'备货单',key:''},
                {name:'销售出库',key:''},
                {name:'退(换)货单',key:''},
                {name:'销售开票',key:''},
                {name:'预收款',key:''},
                {name:'收款',key:''}
            ],
            [
                {name:'盘点作业',key:''},
                {name:'库存调整单',key:''},
                {name:'库存调拨单',key:''},
                {name:'BOM 组装',key:''},
                {name:'BOM 切割分装',key:''}
            ],
            [
                {name:'库存明细报表',key:''},
                {name:'库存汇总报表',key:''},
                {name:'货品价目配置',key:''},
                {name:'成员提成配置',key:''},
                {name:'采购报表',key:''},
                {name:'销售报表',key:''},
                {name:'库存报表',key:''}
            ]
        ]
    })