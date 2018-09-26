/**
 * Created by qin on 2016/04/15.
 */
angular.module('oa')
    .service('EmployeeService',function () {
        this.setCurrentItem = function (item) {
            this.currentItem = item;
        }
    })
    .controller('AppCtrl', function ($scope) {
        $scope.doGo = function (url) {
            location.href = url;
        }
    })
    .controller('SettingCtrl', function ($scope) {

    })
    .controller('VersionCtrl', function ($scope) {
        $scope.version = 'v0.0.1';
        $scope.domain = domain
    })
    .controller('CompanyCtrl', function ($scope,$http) {
        $http.get(domain+'/oa/common/company/summary')
            .success(function (data) {
                $scope.summary = data;
            })
    })
    .controller('GroupsCtrl', function ($scope,$http,Util,EmployeeService) {
        $scope.backUrl = 'main.company';
        $scope.title = '部门组织';
        $scope.icon = 'ion-ios-browsers-outline';
        function getGroups(){
            $http.get(domain+'/oa/common/groups')
                .success(function (data) {
                    Util.getRecursion(data,$scope)
                })
        }
        $scope.doGo = function (item) {
            EmployeeService.setCurrentItem(item);
            location.href = '#/main/employee/role/'+item.id;
        }
        getGroups();
    })
    .controller('RolesCtrl', function ($scope,$http,EmployeeService) {
        $scope.backUrl = 'main.company';
        $scope.title = '岗位结构';
        $scope.icon = 'ion-social-buffer-outline';
        function getRoles(){
            $http.get(domain+'/oa/common/roles')
                .success(function (data) {
                    $scope.list = data;
                })
        }
        $scope.doGo = function (item) {
            EmployeeService.setCurrentItem(item);
            location.href = '#/main/employee/role/'+item.id;
        }
        getRoles();
    })
    .controller('EmployeeCtrl', function ($scope,$http,$stateParams,EmployeeService) {
        var type = $stateParams.type;
        $scope.backUrl = 'main.'+type+'s';
        $scope.title = EmployeeService.currentItem.name;
        $scope.infoNothing = '无法找到该'+(type=='role'?'岗位':'部门')+'下的所属人员';
        $scope.flagFinal = true;
        $scope.icon = 'ion-ios-person-outline';
        function getEmployee(){
            $http.get(domain+'/oa/'+type+'/getList/Users/id/'+$stateParams.id)
                .success(function (data) {
                    $scope.list = data;
                })
        }
        getEmployee();
    })
    .controller('HelpCtrl', function ($scope,$filter,$http) {
        var scope = $scope;
        $scope.search = function (name) {
            $http.get('http://33oa.gnway.cc:8888/crm/customer/list?nameKey='+name+'&page=0&size=8');

        }
    })