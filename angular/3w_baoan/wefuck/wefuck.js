/**
 * Created by qin on 2016/10/5.
 */
angular.module('oa')
    .controller('WefuckCtrl', function ($scope,$http) {
        $http.get(domain+'/oa/wefuck/fuckup')
            .success(function (data) {
                angular.extend($scope,data);
            })
    })