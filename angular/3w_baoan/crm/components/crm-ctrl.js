/**
 * Created by qin on 2016/10/6.
 */
angular.module('oa')
    .directive('crmClients', function ($clients) {
        return {
            restrict: 'E',
            scope: {
                output: '='
            },
            template:'<button class="button button-balanced button-medium" ng-click="open()">{{display||"请选择客户"}}</button>',
            link: function (scope) {
                $clients.setScope(function ($scope,param) {
                    $scope.doConfirm = function () {
                        scope.output = param.curItem.id;
                        scope.display = param.curItem.name;
                        $clients.close();
                    }
                });
                scope.open = function () {
                    $clients.open();
                }
            }
        }
    })
    .directive('crmOptions', function ($http) {
        return {
            restrict: 'E',
            scope: {
                label:'@',
                src:'@',
                output: '='
            },
            template:' <select ng-model="output" ng-options="item.key as item.value for item in options"></select>',
            link: function (scope) {
                $http.get(domain+'/crm/param/findByParentKey?parentKey='+scope.src+'&cascade=false')
                    .success(function (data) {
                        scope.options = data;
                        console.log(scope.output)
                    })
            }
        }
    })