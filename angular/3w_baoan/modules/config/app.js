/**
 * Created by qin on 2016/04/06.
 */
angular.module('oa', ['ionic', 'ngAPI', 'ngFlow', 'ngCtrl'])
    .run(function ($ionicPlatform, $http, $rootScope, $ionicModal, $ionicHistory) {
        $http.defaults.headers.common.token = userInfo.loginName;
        $rootScope.platform = ionic.Platform.platform();
        $rootScope.domain = domain;
        $rootScope.config = config;
        $rootScope.userInfo = userInfo;
        $http.get(domain + '/oa/user/current').success(function (data) {
            $rootScope.userInfo = data;
            userInfo = data;
        });
        $ionicModal.fromTemplateUrl('modules/workflow/modal-catsMods.tpl.html', {
            scope: $rootScope,
            animation: 'fade-in'
        }).then(function (modal) {
            $rootScope.modalInstance = modal;
        });
        $rootScope.open_catsMods = function () {
            $rootScope.modalInstance.show();
        }

        // CRM模态框路由监控
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-transaction.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.transactionBox = modal;
        })
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-contact.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.contactModal = modal
        })
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-calendar.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.calendarModal = modal;
        })
        $ionicModal.fromTemplateUrl('modules/crm/template/modal-sales.tpl.html', {
            scope: $rootScope
        }).then(function (modal) {
            $rootScope.salesModal = modal;
        })
        $rootScope.$on('$stateChangeSuccess', function () {
            if ($ionicHistory.currentStateName() != 'crm_contact') {
                $rootScope.contactModal.remove();
            }
            if ($ionicHistory.currentStateName() != 'crm_transaction') {
                $rootScope.transactionBox.remove();
            }
            if ($ionicHistory.currentStateName() != 'crm_calendar') {
                $rootScope.calendarModal.remove();
            }
            if ($ionicHistory.currentStateName() != 'crm_sales') {
                $rootScope.salesModal.remove();
            }
        })
    })
    .config(function ($stateProvider, $sceProvider, $urlRouterProvider,
                      $ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('返回')
        $sceProvider.enabled(false);
        $urlRouterProvider.otherwise("/main/home");
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style("standard");
        $ionicConfigProvider.navBar.alignTitle("center");
        $ionicConfigProvider.scrolling.jsScrolling(true);
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "modules/main/main.tpl.html"
            })
            .state('main.home', {
                url: "/home",
                views: {
                    'dashView': {
                        templateUrl: "modules/main/dashboard.tpl.html",
                        controller: 'DashCtrl'
                    }
                },
                cache: false
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
            .state('main.topic', {
                url: "/topic",
                views: {
                    'topicView': {
                        templateUrl: "modules/topic/topic.tpl.html",
                        controller: 'TopicCtrl'
                    }
                }
            })
            .state('topicDetail', {
                url: "/topic/:id",
                templateUrl: "modules/topic/topicDetail.tpl.html",
                controller: 'TopicDetailCtrl'
            })
            .state('catsMods', {
                url: "/catsMods",
                templateUrl: "modules/workflow/modal-catsMods.tpl.html",
                controller: 'catsModsCtrl'
            })
            .state('main.workflow', {
                url: "/workflow/:flagHandle",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/workflow/workflow.tpl.html",
                        controller: 'WorkflowCtrl'
                    }
                }
            })

            .state('proForm', {
                url: "/proForm/{modId}/{proId}",
                templateUrl: "modules/pro/form.tpl.html",
                controller: 'ProFormCtrl'
            })
            .state('main.proEdit', {
                url: "/pro/edit/{proId}/{modId}",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/pro/form.tpl.html",
                        controller: 'ProFormCtrl'
                    }
                }
            })
            .state('main.proHandle', {
                url: "/proHandle/:proId",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/pro/view.tpl.html",
                        controller: 'ProHandleCtrl'
                    }
                }
            })
            .state('proHandle', {
                url: "/proHandle/:proId",
                templateUrl: "modules/pro/view.tpl.html",
                controller: 'ProHandleCtrl',
                cache: false
            })
            .state('main.proView', {
                url: "/proView/:proId",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/pro/view.tpl.html",
                        controller: 'ProViewCtrl'
                    }
                }
            })
            .state('proView', {
                url: "/proView/:proId",
                templateUrl: "modules/pro/view.tpl.html",
                controller: 'ProViewCtrl',
                cache: false
            })
            .state('main.flowView', {
                url: "/flowView/{formId}/{objectId}/{processId}/{flagHandle}",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/flow/flowView.tpl.html?" + ver,
                        controller: 'FlowViewCtrl'
                    }
                }
            })
            .state('main.flowView2', {
                url: "/flow/form/{flagHandle}/{formId}/view/{objectId}/process/{processId}",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/flow/flowView.tpl.html",
                        controller: 'FlowViewCtrl'
                    }
                }
            })
            .state('main.flowEdit', {
                url: "/flowEdit/{formId}/{objectId}/{processId}/{flagReject}",
                views: {
                    'WorkflowView': {
                        templateUrl: "modules/flow/flowEdit.tpl.html",
                        controller: 'FlowEditCtrl'
                    }
                }
            })
            .state('main.flowEdit2', {
                url: "/flow/edit/{formId}/view/{objectId}/process/{processId}/{flagReject}",
                views: {
                    'WorkflowView': {
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
            .state('report', {
                url: "/report",
                templateUrl: "modules/common/list-map.tpl.html",
                controller: 'ReportCtrl'
            })
            .state('reportDetail', {
                url: "/reportDetail/:id",
                templateUrl: "modules/report/report.tpl.html",
                controller: 'ReportDetailCtrl'
            })
            .state('archive', {
                url: "/archive",
                templateUrl: "modules/common/list.tpl.html",
                controller: 'ArchiveCtrl'
            })
            .state('archiveList', {
                url: "/archive/:id",
                templateUrl: "modules/archive/archiveList.tpl.html",
                controller: 'ArchiveListCtrl'
            })
            .state('archiveDetail', {
                url: "/archiveDetail/:id",
                templateUrl: "modules/archive/archiveDetail.tpl.html",
                controller: 'ArchiveDetailCtrl'
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
                        controller: 'GroupsCtrl'
                    }
                }
            })
            .state('main.roles', {
                url: "/roles",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list.tpl.html",
                        controller: 'RolesCtrl'
                    }
                }
            })
            .state('main.employee', {
                url: "/employee/{type}/{id}",
                views: {
                    'AppView': {
                        templateUrl: "modules/common/list.tpl.html",
                        controller: 'EmployeeCtrl'
                    }
                }
            })
            .state('gongwen_list', {
                url: '/gongwen_list/:id',
                templateUrl: 'modules/gongwen/gongwen_list.html',
                controller: 'gongwen_list_ctrl'
            })
            .state('gongwen_detail', {
                url: '/gongwen_detail',
                templateUrl: 'modules/gongwen/gongwen_detail.html',
                controller: 'gongwen_detail_ctrl',
                params: {
                    response: '',
                    slide_index: '',
                    modId: '',
                    tableSchema: ''
                }
            })
            .state('crm', {
                url: "/crm",
                templateUrl: "modules/crm/client/client.tpl.html",
                controller: 'ClientCtrl'
            })
            .state('clientDetail', {
                url: "/clientDetail",
                templateUrl: "modules/crm/client/clientDetail.tpl.html",
                controller: 'ClientDetailCtrl',
                params: {
                    tableSchema: '',
                    formView: '',
                    name: '',
                    formData: '',
                    dbName: '',
                    tableKey: '',
                    sales: ''
                }
            })
            .state('crm_preview', {
                url: '/crm_preview',
                templateUrl: 'modules/crm/template/preview.tpl.html',
                controller: 'crmPreview',
                params: {
                    data: ''
                }
            })
            .state('crm_logs', {
                url: '/crm_logs',
                templateUrl: 'modules/crm/template/logs.tpl.html',
                controller: 'crmLogs',
                params: {
                    data: ''
                }
            })
            .state('crm_transaction', {
                url: '/crm_transaction',
                templateUrl: 'modules/crm/template/transaction.tpl.html',
                controller: 'crmTransaction',
                params: {
                    data: ''
                }
            })
            .state('crm_contact', {
                url: '/crm_contact',
                templateUrl: 'modules/crm/template/contact.tpl.html',
                controller: 'crmContact',
                params: {
                    data: ''
                }
            })
            .state('crm_sales', {
                url: '/crm_sales',
                templateUrl: 'modules/crm/template/sales.tpl.html',
                controller: 'crmSales',
                params: {
                    data: ''
                }
            })
            .state('crm_calendar', {
                url: '/crm_calendar',
                templateUrl: 'modules/crm/template/calendar.tpl.html',
                controller: 'crmCalendar',
                params: {
                    data: ''
                }
            })
    })