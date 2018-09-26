/**
 * Created by qin on 2016/04/17.
 */
angular.module('oa')
    .controller('AttendanceCtrl', function ($scope, APIRead) {
        var pager = {page:0,size:10}
            ,api = APIRead.create('attendance',pager,$scope);
        api.initList(function () {

        })
        $scope.doMap = function (x,y) {
            if (x) {
                wx.openLocation({
                    latitude: x,
                    longitude: y,
                    name: '我现在的位置',
                    scale: 26,
                    infoUrl: 'made by qinyang'
                });
            }
        };
        $scope.doDate = function (year,month,date) {
            console.log(year,month,date)
            api.initList(false,false,{
                year:year,month:month-1,day:date
            })
        }
    })