/**
 * Created by qin on 2016/10/25.
 */
angular.module('oa')
    .controller('AttCtrl', function ($scope, $http, $ionicLoading, $filter) {
        if(!window.wx){
            wx={getLocation: function () {
                
            },openLocation: function () {

            }}
        }
        var longi = 0
            ,lati = 0
            ,location
            ,fileIds = []
            ,localIds = [];
        function getLocation() {
            $scope.locationInfo = '正在获取所在地址信息...';
            wx.getLocation({
                type: 'gcj02',
                success: function (data) {
                    location = data;
                    lati = data.latitude;
                    longi = data.longitude;
                    $http.get("/php/map.php?x=" + lati + "&y=" + longi).success(function (data) {
                        $scope.locationInfo = data
                    })
                },
                cancel: function () {
                    alert('用户拒绝授权获取地理位置');
                }
            });
        }
        getLocation();
        $scope.files = [];
        $scope.formData = {type:0,content:''};
        $scope.openMap = function () {
            if (location) {
                wx.openLocation({
                    latitude: lati, // 纬度，浮点数，范围为90 ~ -90
                    longitude: longi, // 经度，浮点数，范围为180 ~ -180。
                    name: '签到位置', // 位置名
                    address: '签到位置', // 地址详情说明
                    scale: 26, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '签到位置' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            } else {
                $ionicLoading.show({
                    template: '未获取地址'
                });
                setTimeout(function () {
                    $ionicLoading.hide()
                }, 800)
            }
        }
        $scope.doPhoto = function () {
            wx.chooseImage({
                sizeType: ["compressed"],
                sourceType: ["camera"],
                success: function (res) {
                    var localId = res.localIds[0];
                    wx.uploadImage({
                        localId: localId,
                        isShowProgressTips: 1,
                        success: function (res) {
                            var serverId = res.serverId;
                            fileIds.push(serverId);
                        }
                    });
                    $scope.$apply(function () {
                        $scope.files.push({
                            src: localId
                        });
                        localIds.push(localId);
                        document.getElementById('file' + ($scope.files.length - 1)).src = localIds[0];
                    })
                }
            });
        };
        $scope.doPreview = function (item) {
            wx.previewImage({
                current: item.src,
                urls: localIds
            });
        };
        $scope.doAttendance = function () {
            if (true) {
                $ionicLoading.show();
                $http.post(domain + '/oa/attendance/add', angular.extend($scope.formData,{
                    name:userInfo.name,
                    longi:longi,
                    lati:lati,
                    createdDate:$filter('date')(new Date(),'yyyy-MM-dd'),
                    createdTime:$filter('date')(new Date(),'HH:mm:ss'),
                    creatorId:userInfo.id,
                    fileIds:fileIds,
                    location:$scope.locationInfo
                })).success(function () {
                        $ionicLoading.show({
                            template: '签到成功'
                        });
                        setTimeout(function () {
                            $ionicLoading.hide();
                            $scope.close();
                        }, 800);
                    })
            } else {
                $ionicLoading.show({
                    template: '未获取地址'
                });
                setTimeout(function () {
                    $ionicLoading.hide()
                }, 800)
            }
        }
    })