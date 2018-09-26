/**
 * Created by qin on 2016/04/07.
 */
angular.module('oa')
    .controller('TopicCtrl', function ($scope,$http,$state,$ionicModal,$ionicLoading,$api,Validation,$date) {
        var modalInstance
            ,currentTab
            ,pager = {page:0,size:10}
            ,condition = false
            , filterMap = {related:null}
            , api = $api.create({
                name:'top',
                scope:$scope,
                pager:pager
            })
        ,validationForm = Validation.create({
            requires:[{
                field:'name',
                label:'标题'
            },{
                field:'content',
                label:'内容'
            }],
            customs:[{
                expression:'!(formData.flagAll||(formData.userIds&&formData.userIds.length)||(formData.groupIds&&formData.roleIds))',
                validation:'未指定接受对象'
            },{
                expression:'formData.name&&formData.name.length>20',
                validation:'标题字数过长，需小于20字'
            }]
        });
        $ionicModal.fromTemplateUrl('modal-create.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modalInstance = modal;
        });
        $scope.flagTab = 0;
        $scope.tabs = [
            {
                id: 0,
                name: '全部消息',
                key: 'related'
            },
            {
                id: 1,
                name: '未读消息',
                key: 'Unread'
            },
            {
                id: 2,
                name: '已读消息',
                key: 'Read'
            }
        ]
        currentTab = $scope.tabs[0];
        $scope.openCreate = function() {
            $scope.formData = {flagAll:true}
            modalInstance.show();
        };
        $scope.close = function() {
            modalInstance.hide();
        };
        $scope.doSearch = function (data) {
            condition = {name:'%'+data+'%',content:'%'+data+'%',author:'%'+data+'%'}
            api.initList(false,currentTab.key,condition);
        }
        $scope.doSelect = function (item) {
            $state.go('main.topicDetail',{id:item.id})
        };
        $scope.doTab = function (tab) {
            $scope.flagTab = tab.id;
            currentTab = tab
            api.initList(false,filterMap,'list');
        }
        $scope.doRefresh = function () {
            api.initList(false,currentTab.key);
            $scope.$broadcast('scroll.refreshComplete');
        };
        $scope.getFlagMore = function () {
            return $scope.list&&$scope.list.length<$scope.size;
        };
        $scope.doLoad = function () {
            api.getPage(false,currentTab.key)
        };
        //$scope.$on('$stateChangeSuccess', function() {
        //    $scope.doLoad();
        //});
        $scope.doSubmit = function (formData) {
            $ionicLoading.show();
            var result=validationForm.getResult(formData);
            if(result.length){
                $scope.result = result;
                $ionicLoading.show({
                    template: Validation.info(result)
                });
                setTimeout(function () {
                    $ionicLoading.hide()
                },1000)
            }else{
                formData.creatorId = userInfo.id;
                formData.createdDate = $date.getNowDateTime();
                modalInstance.hide();
                $ionicLoading.show();
                $http.post(domain+'/oa/access/add/_top',formData)
                    .success(function (id) {
                        formData.id = id;
                        $scope.list.unshift(angular.copy(formData));
                        $ionicLoading.show({
                            template: '发送成功'
                        });
                        setTimeout(function () {
                            $ionicLoading.hide()
                        },1000);
                    })
            }
        };
        $scope.doRead = function (item) {
            if(!item.flagRead){
                item.flagRead = true;
                $http.post(domain+'/oa/ao/add/_top_flag',{
                    topId:item.id,
                    userId:userInfo.id,
                    flagRead:true
                })
            }
        };
        function getUnread(){
            $http.get(domain+'/oa/message/count').success(function (data) {
                $scope.unread = data;
            })
        }
        function initData(){
            $scope.doTab($scope.tabs[0])
            getUnread();
        }
        (function () {
            initData();
        })()
    })
    .controller('TopicDetailCtrl', function ($scope,$stateParams,$http){
        var id = $stateParams.id;
        function getDetail(){
            $http.get(domain+'/oa/top/getDetail/'+id)
                .success(function (data) {
                    angular.extend($scope,data);
                })
        }
        function initData(){
            getDetail();
        }
        (function () {
            initData();
        })()
        $scope.doReply = function (content) {
            $scope.flagRepling = true;
            $http.post(domain+'/oa/message/reply',{content:content,message_id:id})
                .success(function (data) {
                    $scope.flagRepling = false;
                    $scope.replies.unshift({
                        id:data,
                        author:userInfo.name,
                        content:content
                    })
                })
        };
    })