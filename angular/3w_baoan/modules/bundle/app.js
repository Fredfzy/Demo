/**
 * Created by qin on 2016/04/06.
 */
angular.module('oa', ['ionic','ngAPI','ngFlow','ngCtrl'])
    .run(function ($ionicPlatform, $http, $rootScope) {
        $http.defaults.headers.common.token = userInfo.loginName;
        $rootScope.platform = ionic.Platform.platform();
        $rootScope.domain = domain;
        $rootScope.userInfo = userInfo;
        $http.get(domain+'/oa/user/current').success(function (data) {
            $rootScope.userInfo = data;
        });
    })
    .config(function ($stateProvider, $sceProvider, $urlRouterProvider,
                      $ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('返回')
        $sceProvider.enabled(false);
        //$urlRouterProvider.otherwise("/main/home");
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style("standard");
        $ionicConfigProvider.navBar.alignTitle("center")
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "modules/bundle/main.tpl.html"
            })
            .state('main.wefuck', {
                url: "/wefuck",
                views: {
                    'wefuck': {
                        templateUrl: "wefuck/wefuck.tpl.html",
                        controller: 'WefuckCtrl'
                    }
                }
            })
            .state('main.home', {
                url: "/home",
                views: {
                    'dashView': {
                        templateUrl: "modules/main/dashboard.tpl.html",
                        controller: 'DashCtrl'
                    }
                }
            })
            //.state('main.crm', {
            //    url: "/crm",
            //    views: {
            //        'crm': {
            //            templateUrl: "crm/crm.tpl.html"
            //        }
            //    }
            //})
            .state('main.erp', {
                url: "/erp",
                views: {
                    'erp': {
                        templateUrl: "erp/erp.tpl.html",
                        controller:'ErpCtrl'
                    }
                }
            })
            .state('main.bulletinDetail', {
                url: "/bulletin/:id",
                views: {
                    'dashView': {
                        templateUrl: "modules/main/bulletinDetail.tpl.html",
                        controller: 'BulletinCtrl'
                    }
                }
            })
            .state('main.crm', {
                url: "/crm",
                views: {
                    'crm': {
                        templateUrl: "crm/crm-main.tpl.html",
                        controller:'CrmCtrl'
                    }
                }
            })
            .state('main.crm-client', {
                url: "/client",
                views: {
                    'crm': {
                        templateUrl: "crm/client/client-list.tpl.html",
                        controller:'ClientCtrl'
                    }
                }
            })
            .state('main.crm-clientDetail', {
                url: "/clientDetail",
                templateUrl: "crm/client/client-detail.tpl.html"
            })
            .state('main.crm-clientDetail.info', {
                url: "/info",
                templateUrl: "crm/client/client-detail-info.tpl.html",
                controller:'ClientDetailCtrl'
            })
            .state('main.crm-chance', {
                url: "/crm-chance",
                views: {
                    'crm': {
                        templateUrl: "crm/crm-list.tpl.html",
                        controller:'CrmChanceCtrl'
                    }
                }
            })
            .state('main.crm-chanceDetail', {
                url: "/crm-chanceDetail",
                views: {
                    'crm': {
                        templateUrl: "crm/crm-detail.tpl.html",
                        controller:'CrmChanceDetailCtrl'
                    }
                }
            })
            .state('main.topicDetail', {
                url: "/topic/:id",
                views: {
                    'dashView': {
                        templateUrl: "modules/topic/topicDetail.tpl.html",
                        controller: 'TopicDetailCtrl'
                    }
                }
            })
            .state('main.workflow', {
                url: "/workflow/:flagHandle",
                views: {
                    'dashView': {
                        templateUrl: "modules/workflow/workflow.tpl.html",
                        controller: 'WorkflowCtrl'
                    }
                }
            })
            .state('main.proForm', {
                url: "/proForm/{modId}/{proId}",
                views: {
                    'dashView': {
                        templateUrl: "modules/pro/form.tpl.html",
                        controller:'ProFormCtrl'
                    }
                }
            })
            .state('main.proHandle', {
                url: "/proHandle/:proId",
                views: {
                    'dashView': {
                        templateUrl: "modules/pro/view.tpl.html",
                        controller:'ProHandleCtrl'
                    }
                }
            })
            .state('main.proView', {
                url: "/proView/:proId",
                views: {
                    'dashView': {
                        templateUrl: "modules/pro/view.tpl.html",
                        controller:'ProViewCtrl'
                    }
                }
            })
            .state('main.flowView', {
                url: "/flowView/{formId}/{objectId}/{processId}/{flagHandle}",
                views: {
                    'dashView': {
                        templateUrl: "modules/flow/flowView.tpl.html?"+ver,
                        controller: 'FlowViewCtrl'
                    }
                }
            })
            .state('main.flowView2', {
                url: "/flow/form/{flagHandle}/{formId}/view/{objectId}/process/{processId}",
                views: {
                    'dashView': {
                        templateUrl: "modules/flow/flowView.tpl.html",
                        controller: 'FlowViewCtrl'
                    }
                }
            })
            .state('main.flowEdit', {
                url: "/flowEdit/{formId}/{objectId}/{processId}/{flagReject}",
                views: {
                    'dashView': {
                        templateUrl: "modules/flow/flowEdit.tpl.html",
                        controller: 'FlowEditCtrl'
                    }
                }
            })
            .state('main.flowEdit2', {
                url: "/flow/edit/{formId}/view/{objectId}/process/{processId}/{flagReject}",
                views: {
                    'dashView': {
                        templateUrl: "modules/flow/flowEdit.tpl.html",
                        controller: 'FlowEditCtrl'
                    }
                }
            })
            .state('main.task', {
                url: "/task",
                views: {
                    'TaskView': {
                        templateUrl: "modules/task/task.tpl.html",
                        controller: 'TaskCtrl'
                    }
                }
            })
            .state('main.taskDetail', {
                url: "/task/:id",
                views: {
                    'TaskView': {
                        templateUrl: "modules/task/taskDetail.tpl.html",
                        controller: 'TaskDetailCtrl'
                    }
                }
            })
            //.state('main.app', {
            //    url: "/app",
            //    views: {
            //        'AppView': {
            //            templateUrl: "modules/pro/pro.tpl.html",
            //            controller: 'AppCtrl'
            //        }
            //    }
            //})
            .state('main.app', {
                url: "/app",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/app.tpl.html",
                        controller: 'AppCtrl'
                    }
                }
            })
            //.state('main.app', {
            //    url: "/app",
            //    views: {
            //        'AppView': {
            //            templateUrl: "modules/test/test.tpl.html",
            //            controller: 'TestCtrl'
            //        }
            //    }
            //})
            .state('main.project', {
                url: "/project",
                views: {
                    'AppView': {
                        templateUrl: "modules/project/project.tpl.html",
                        controller: 'ProjectCtrl'
                    }
                }
            })
            .state('main.projectDetail', {
                url: "/projectDetail/:id",
                views: {
                    'AppView': {
                        templateUrl: "modules/project/projectDetail.tpl.html",
                        controller: 'ProjectDetailCtrl'
                    }
                }
            })
            .state('main.report', {
                url: "/report",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list-map.tpl.html",
                        controller: 'ReportCtrl'
                    }
                }
            })
            .state('main.reportDetail', {
                url: "/reportDetail/:id",
                views: {
                    'AppView': {
                        templateUrl: "modules/report/report.tpl.html",
                        controller: 'ReportDetailCtrl'
                    }
                }
            })
            .state('main.archive', {
                url: "/archive",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list.tpl.html",
                        controller: 'ArchiveCtrl'
                    }
                }
            })
            .state('main.archiveList', {
                url: "/archive/:id",
                views: {
                    'AppView': {
                        templateUrl: "modules/archive/archiveList.tpl.html",
                        controller: 'ArchiveListCtrl'
                    }
                }
            })
            .state('main.archiveDetail', {
                url: "/archiveDetail/:id",
                views: {
                    'AppView': {
                        templateUrl: "modules/archive/archiveDetail.tpl.html",
                        controller: 'ArchiveDetailCtrl'
                    }
                }
            })
            .state('main.attendance', {
                url: "/attendance",
                views: {
                    'AppView': {
                        templateUrl: "modules/attendance/attendance.tpl.html",
                        controller: 'AttendanceCtrl'
                    }
                }
            })
            .state('main.favorite', {
                url: "/favorite",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/favorite.tpl.html",
                        controller: 'AttendanceCtrl'
                    }
                }
            })
            .state('main.setting', {
                url: "/setting",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/setting.tpl.html",
                        controller: 'SettingCtrl'
                    }
                }
            })
            .state('main.version', {
                url: "/version",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/version.tpl.html",
                        controller: 'VersionCtrl'
                    }
                }
            })
            .state('main.company', {
                url: "/company",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/company.tpl.html",
                        controller: 'CompanyCtrl'
                    }
                }
            })
            .state('main.help', {
                url: "/help",
                views: {
                    'AppView': {
                        templateUrl: "modules/app/help.tpl.html?1",
                        //templateUrl: "modules/components/templates/modal-datepicker.tpl.html?1",
                        controller: 'HelpCtrl'
                    }
                }
            })
            .state('main.groups', {
                url: "/groups",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list-recursion.tpl.html",
                        controller:'GroupsCtrl'
                    }
                }
            })
            .state('main.roles', {
                url: "/roles",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list.tpl.html",
                        controller:'RolesCtrl'
                    }
                }
            })
            .state('main.employee', {
                url: "/employee/{type}/{id}",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list.tpl.html",
                        controller:'EmployeeCtrl'
                    }
                }
            })
    })