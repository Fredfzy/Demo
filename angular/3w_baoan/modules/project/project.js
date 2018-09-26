/**
 * Created by qin on 2016/04/16.
 */
angular.module('oa')
    .controller('ProjectCtrl', function ($scope,APIRead) {
        var pager = {page:0,size:10}
            ,api = APIRead.create('project',pager,$scope);
        api.initList();
    })
    .controller('ProjectDetailCtrl', function ($scope,$http,$ionicModal,$ionicLoading,$filter,
                                               $stateParams,APIReadWrite,Validation,Resolver) {
        var pager = {page:0,size:20}
            ,id = $stateParams.id
            ,modalInstance
            ,api = APIReadWrite.create('task',pager,$scope);
        $ionicModal.fromTemplateUrl('modules/task/modal-create.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            modalInstance = modal;
        });
        function getDetail(){
            $http.get(domain+'/oa/project/getDetail/id/'+id)
                .success(function (data) {
                    $scope.detail = data.detail;
                    $scope.leaders = data.leaders;
                    $scope.members = data.members;
                    $scope.feedbacks = data.feedbacks;
                    $scope.archiveList = data.archiveList;
                })
        }
        function getTaskList(){
            api.initList(false,false,{searcher: 'Injected', id: id})
        }
        function getFeedList(){
            $http.post(domain+'/oa/feed/initList?limit=100',
                {searcher: 'Injected', id: id}).success(function (data) {
                    $scope.feedList = data.list;
                })
        }
        getDetail();
        $scope.doTab = function (tab) {
            $scope.flagTab = tab;
            switch(tab){
                case 0: break;
                case 1: if(!$scope.list)
                    getTaskList();
                    break;
                case 2:if(!$scope.feedList)
                    getFeedList();
                    break;
            }

        };
        $scope.close = function () {
            modalInstance.hide();
        };
        //form
        $scope.openCreate = function () {
            $scope.formData = {proId:parseInt(id),
                proStart: $scope.detail.starttime,
                proEnd: $scope.detail.endtime,
                inputLeaders: $scope.leaders.concat($scope.members),
                title: $scope.detail.name+'的',
                tasks: $scope.list};
            modalInstance.show();
        };
        var customs = [{
            expression: '(new Date(formData.startDate)).getTime()>=(new Date(formData.deadline)).getTime()',
            validation: '生效时间不得晚于截止时间'
        }, {
            expression: '!formData.members&&!formData.assignee',
            validation: '未指定接受对象'
        }, {
            expression: 'formData.name&&formData.name.length>20',
            validation: '标题字数过长，需小于20字'
        }, {
            expression: 'formData.flagFlow&&!formData.steps[0].users',
            validation: '未选择审批人'
        }]
        customs.push({
            expression: '(new Date(formData.startDate)).getTime()<(new Date(formData.proStart)).getTime()',
            validation: '任务生效时间不得早于项目开始时间'
        })
        customs.push({
            expression: '(new Date(formData.deadline)).getTime()>(new Date(formData.proEnd)).getTime()',
            validation: '任务截止时间不得晚于项目截止时间'
        })
        var validationForm = Validation.create({
            requires: [{
                field: 'name',
                label: '标题'
            }, {
                field: 'description',
                label: '内容'
            }],
            customs: customs
        })
        function fSubmitFlow(formData,id,memberIds){
            var flexConfig = {
                app_key: 'task',
                config: Resolver.getFreeConfig(formData.steps)
            };
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                members: memberIds + '',
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId
            };
            var flexRoot = Resolver.getRoot(flexConfig.config);
            var formattedSteps = Resolver.getSteps(flexRoot);
            var nextStep = Resolver.getNextStep(formData, formattedSteps, false, true);
            $http({
                method: 'POST', url: domain+'/oa/flow/submit/ref/task', data: {
                    formData: raw,
                    nextStep: nextStep || {stepId: 'end'},
                    currentStep: Resolver.getFirstStep(formattedSteps),
                    appKey: 'task',
                    processId: null,
                    formId: null,
                    isDraft: null,
                    refType: 'task',
                    refId: id,
                    groupId: $scope.userInfo.groupId,
                    flexConfig: flexConfig || null
                }
            }).success(function (data) {
                modalInstance.hide();
                $state.go('main.flowView',{formId:data.formId,objectId:data.objectId,
                    processId:data.processId,flagHandle:0});
            })
        }
        function fSubmitTask(formData,preMarks){
            var memberIds = [];
            var memberLoginNames = [];
            angular.forEach(formData.members, function (item) {
                memberIds.push(item.id);
                memberLoginNames.push(item.login_name)
            })
            var raw = {
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee.id,
                assigneeName: formData.assignee.name,
                members: memberIds,
                begin_time: $filter('date')(formData.startDate, 'yyyy-MM-dd HH:mm:ss'),
                deadline: formData.deadline,
                parent_id: formData.parentId,
                files: formData.files,
                approve:1,
                important: formData.important == 1 ? 1 : null
            }

            if (formData.proId) {
                raw.project_id = formData.proId;
            }
            if (formData.project_id) {
                raw.project_id = formData.project_id;
            }
            if (preMarks) {
                raw.pre_marks = preMarks + '';
            }
            if (formData.flagFlow) {
                raw.approve = 0;
            }
            $http.post(domain+'/oa/task/addTask', raw).success(function (data) {
                $scope.doTab(1);
                if (formData.flagFlow) {
                    fSubmitFlow(formData,data,memberIds)
                }else{
                    modalInstance.hide();
                }
            })
        }
        $scope.doSubmit = function (formData) {
            var result = validationForm.getResult(formData);
            var preMarks = []
            if(formData.members){
                for (var k = 0; k < formData.members.length; k++) {
                    if (formData.members[k].id == formData.assignee.id) {
                        result.push({validation: '成员中不可包含负责人'});
                        break;
                    }
                }
            }
            if (result.length) {
                $scope.result = result;
                var template = '';
                angular.forEach(result, function (item) {
                    template+=item.validation+'<br/>';
                })
                $ionicLoading.show({
                    template:template
                })
                setTimeout(function () {
                    $ionicLoading.hide()
                },1500)
            } else {
                fSubmitTask(formData,preMarks);
            }
        }
    })