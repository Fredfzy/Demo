/**
 * Created by qin on 2016/04/17.
 */
angular.module('oa')
    .service('ArchiveService', function () {
        this.setCurrentDir = function (cat) {
            this.currentDir = cat
        }
        this.setCurrentDocDir = function (report) {
            this.currentDocDir = report
        }
    })
    .service('$dir', function () {

    })
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller('ArchiveCtrl', function ($scope,$http,ArchiveService,$dir) {
        $scope.b=function(){
            goFinish.goFinish();
        }
        $scope.title = '知识文档';
        $scope.infoNothing = '暂无可查看的文档';
        $scope.icon = 'ion-ios-folder-outline'
        $scope.doGo = function (item) {
            ArchiveService.setCurrentDir(item)
            location.href = '#/archive/'+item.id;
        };
        function getRelatedDirs(){
            $http.get(domain+'/oa/archive/getRelatedParentDirs')
                .success(function (data) {
                    $scope.list = data;
                    $scope.list.unshift({id:0,name:'项目文档'})
                })
        }
        function initList() {
            var initUrl = userInfo.loginName.toUpperCase()=='ADMIN'?'/oa/ao/getAll/_dir':'/oa/access/getAllByAcl/_dir';
            $http.get(domain+initUrl).success(function (data) {
            	console.log(data)
                var dirMap = {},dirList = [];
                angular.forEach(data, function (item) {
                    var parentId = item.parentId;
                    if(parentId!=null) {
                        var parentMap = dirMap[parentId];
                        parentMap ? parentMap.push(item) : dirMap[parentId] = [item];
                    } else {
                        dirList.push(item);
                    }
                });
                dirList.unshift({
                    id: 0,
                    name: '共享文件夹',
                    actions: [true, true, false, false, true, true, false]
                });
                $dir.dirMap = dirMap;
                $scope.list = dirList;
                console.log($scope.list)
            })
        }
        $scope.doRefresh = function() {
            var initUrl = userInfo.loginName.toUpperCase()=='ADMIN'?'/oa/ao/getAll/_dir':'/oa/access/getAllByAcl/_dir';
            $http.get(domain+initUrl)
                .success(function(data) {
                    console.log(data)
                    var dirMap = {},dirList = [];
                    angular.forEach(data, function (item) {
                        var parentId = item.parentId;
                        if(parentId!=null) {
                            var parentMap = dirMap[parentId];
                            parentMap ? parentMap.push(item) : dirMap[parentId] = [item];
                        } else {
                            dirList.push(item);
                        }
                    });
                    dirList.unshift({
                        id: 0,
                        name: '共享文件夹',
                        actions: [true, true, false, false, true, true, false]
                    });
                    $dir.dirMap = dirMap;
                    $scope.list = dirList;
                    console.log($scope.list)
                })
                .finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        initList();
    })
    .controller('ArchiveListCtrl', function ($scope,$http,$stateParams,ArchiveService,$dir) {
        var currentDir = ArchiveService.currentDir || {id:$stateParams.id}
            ,id = $stateParams.id;
        $scope.title = currentDir.name;
        $scope.infoNothing = '暂无可查看的文档';
        $scope.doGo = function (item) {
            location.href = domain+'/upload/files/'+item.name;
        };
        $scope.doDir = function (item) {
            location.href = '#/archive/'+item.id;
        }
        var icons = ['default', '', 'text', 'application', 'video', 'audio'];
        function getRelatedDirs(){
            $http.get(domain+'/oa/dir/getDirFiles/' + id)
                .success(function (data) {
                    angular.forEach(data, function (file) {
                        file.icon = file.type==1?'/upload/files/'+file.name:
                        '/img/icons/' + icons[file.type] + '.png';
                    });
                    $scope.list = data;
                })
        }
        getRelatedDirs();
        if($dir.dirMap)
            $scope.dirList = $dir.dirMap[id];
        else {
            $http.get(domain+'/oa/ao/getList/_dir/'+id,{
                params:{pk:'parentId'}
            }).success(function (data) {
                $scope.dirList = data;
            })
        }
    })