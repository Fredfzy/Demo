/**
 * Created by qin on 2016/8/16.
 */
angular.module('ngCtrl', [])
    .directive('cAvatar', function () {
        return {
            restrict: 'E',
            scope: {
                src: '@',
                username: '@'
            },
            template: '<div class="avatar"><img height="100%" src="' + domain + '/upload/icons/{{src}}" alt="" onerror="this.src=\'img/anonym.jpg\'"/><div ng-bind="username"></div></div>'
        }
    })
    .directive('cCheckbox', function () {
        return {
            restrict: 'E',
            scope: {
                output: '='
            },
            template: '<span class="icon ion-ios-{{output?\'checkmark\':\'circle-outline\'}} icon-check" ng-click="output=!output">{{output?\'🔘\':\'⭕\'}}</span>'
        }
    })
    .directive('cDecoration', function () {
        return {
            restrict: 'E',
            scope: {
                output: '=',
                prefix: '@',
                suffix: '@'
            },
            template: '<div><div class="input-prefix">{{prefix}}</div><input type="text" ng-model="output"><div class="input-suffix">{{suffix}}</div></div>'
        }
    })
    .directive('vFiles', function ($http) {
        return {
            restrict: 'E',
            scope: {
                input: '='
            },
            templateUrl: 'modules/components/templates/template-file.tpl.html',
            link: function (scope) {
                // scope.getDetail = function (item) {
                //     if (item.type == 1)
                //         window.wx && wx.previewImage({
                //             current: url,
                //             urls: [url]
                //         });
                //     else {
                //         location.href = url
                //     }
                // };
                if (scope.input) {
                    var icons = ['default', '', 'text', 'application', 'video', 'audio'];

                    function _setIcon(id, src, type, suffix) {
                        var fileIcon = document.getElementById('file-icon-' + id);
                        var fileIcon2 = document.getElementById('files-icon-' + id);
                        if (type == 1) {
                            fileIcon.src = domain + src;
                            fileIcon2.href = domain + src;
                        } else if (suffix == 'doc' || suffix == 'docx') {
                            fileIcon.src = domain + '/img/icons/word.png';
                            fileIcon2.href = domain + src;
                        } else if (suffix == 'xls' || suffix == 'xlsx') {
                            fileIcon.src = domain + '/img/icons/excel.png';
                            fileIcon2.href = domain + src;
                        } else if (suffix == 'ppt' || suffix == 'pptx') {
                            fileIcon.src = domain + '/img/icons/ppt.png';
                            fileIcon2.href = domain + src;
                        } else {
                            fileIcon.src = domain + '/img/icons/default.png';
                            fileIcon2.href = domain + src;
                        }
                    }

                    $http.get(domain + '/oa/ao/getList/_file/' + scope.input)
                        .success(function (data) {
                            scope.list = data;
                            setTimeout(function () {
                                angular.forEach(data, function (item) {
                                    _setIcon(item.id, '/upload/files/' + item.name, item.type);
                                })
                            })
                        })
                }
            }
        }
    })
    .directive('cUpload', function ($http) {
        return {
            restrict: 'E',
            scope: {
                output: '=',
                preset: '=',
                loadType: '@',
                outputField: '@',
                outputType: '@'
            },
            templateUrl: 'modules/components/templates/template-upload.tpl.html',
            link: function (scope, ele) {
                var inputUpload = ele.find('input')[0],
                    filesArr = [],
                    fileIds = [];
                scope.urlMap = {};
                if (scope.preset) {
                    $http.get(domain + '/oa/ao/getList/_file/' + scope.preset)
                        .success(function (data) {
                            scope.presetList = data;
                            setTimeout(function () {
                                angular.forEach(data, function (item) {
                                    fileIds.push(item.id)
                                    _setIcon(item.id, '/upload/files/' + item.name, item.type);
                                })
                            })
                        })
                }

                function bytesToSize(bytes) {
                    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
                    if (bytes == 0) return 'n/a';
                    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
                }

                inputUpload.onchange = function () {
                    var files = this.files,
                        timestamp = +new Date();
                    angular.forEach(files, function (file) {
                        if (file.size > 1) {
                            file.timestamp = timestamp += 1;
                            file.readableSize = bytesToSize(file.size)
                            filesArr.push(file);
                        }
                    });
                    scope.$apply(function () {
                        scope.files = filesArr;
                    });
                    console.log('添加成功：')
                    console.log(scope.files)
                    setTimeout(function () {
                        angular.forEach(files, function (file) {
                            uploadFile(file)
                        })
                    })
                };
                scope.selectFiles = function () {
                    inputUpload.click();
                };
                scope.removeFile = function (file, index) {
                    if (scope.urlMap[file.timestamp]) {
                        if (file.id) {
                            $http.get('')
                        }
                        fileIds.splice(fileIds.indexOf(file.id), 1);
                        console.log(fileIds);
                        scope.output = scope.outputType == 'arr' ? fileIds : fileIds + '';
                    } else
                        stopMap[file.timestamp] = true;
                    scope.files.splice(index, 1);
                    inputUpload = document.createElement('input');
                    inputUpload.setAttribute('id', 'upload0');
                    inputUpload.setAttribute('type', 'file');
                    inputUpload.setAttribute('multiple', 'multiple');
                    inputUpload.setAttribute('style', 'display: none');
                    inputUpload.onchange = function () {
                        var files = this.files
                            , timestamp = +new Date();
                        angular.forEach(files, function (file) {
                            if (file.size > 1) {
                                file.timestamp = timestamp += 1;
                                file.readableSize = bytesToSize(file.size)
                                filesArr.push(file);
                            }
                        });
                        scope.$apply(function () {
                            scope.files = filesArr;
                        });
                        setTimeout(function () {
                            angular.forEach(files, function (file) {
                                uploadFile(file)
                            })
                        })
                    };
                };
                scope.removePresetFile = function (file, index) {
                    scope.presetList.splice(index, 1);
                    fileIds.splice(fileIds.indexOf(file.id), 1);
                    scope.output = scope.outputType == 'arr' ? fileIds : fileIds + '';
                };

                function _setProgress(timestamp, percent) {
                    var fileProgress = document.getElementById('file-progress-' + timestamp);
                    fileProgress.style.width = percent + '%';
                }

                var icons = ['default', '', 'text', 'application', 'video', 'audio'];

                function _setIcon(timestamp, src, type, suffix) {
                    var fileIcon = document.getElementById('file-icon-' + timestamp);
                    if (type == 1) {
                        fileIcon.src = domain + src;
                    } else if (suffix == 'doc' || suffix == 'docx') {
                        fileIcon.src = domain + '/img/icons/word.png';
                    } else if (suffix == 'xls' || suffix == 'xlsx') {
                        fileIcon.src = domain + '/img/icons/excel.png';
                    } else if (suffix == 'ppt' || suffix == 'pptx') {
                        fileIcon.src = domain + '/img/icons/ppt.png';
                    } else {
                        fileIcon.src = domain + '/img/icons/default.png';
                    }
                }

                function uploadFile(file) {
                    var url = domain + '/oa/file/upload';
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader('token', userInfo.loginName);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            console.log(xhr.responseText)
                            var data = JSON.parse(xhr.responseText),
                                url = '/upload/files/' + data.name,
                                curTimestamp = file.timestamp;
                            file.id = data.id;
                            fileIds.push(data.id);
                            scope.output = scope.outputType == 'arr' ? fileIds : fileIds + '';
                            _setIcon(curTimestamp, url, data.type);
                            scope.$apply(function () {
                                scope.urlMap[curTimestamp] = url;
                            })
                        }
                    };
                    xhr.upload.onprogress = function (e) {
                        // console.log(e)
                        if (e.lengthComputable) {
                            var percent = e.loaded / e.total;
                            // console.log(percent)
                            _setProgress(file.timestamp, percent * 100);
                        }
                    };
                    fd.append("file", file);
                    xhr.send(fd);
                }
            }
        }
    })
    .directive('cFormula', function ($formula, $interpolate) {
        return {
            restrict: 'E',
            scope: {
                output: '=',
                form: '@',
                formula: '@',
                index: '=',
                detailId: '@',
                curFieldId: '@'
            },
            template: '<div>{{result}}</div>',
            link: function (scope, element) {
                var formula = scope.formula;

                function calculate() {
                    var formula = $interpolate(scope.formula)(scope.form);
                    scope.$apply(function () {
                        scope.output = eval(formula);
                    })
                }

                var fields = scope.formula.match(/[a-zA-Z]\w+/g)
                    , distinctFields = [], doms = []
                    , detailId = scope.detailId;
                scope.result = scope.output;

                function _getKeyUp() {
                    (function () {
                        angular.forEach(distinctFields, function (field, index) {
                            if (angular.element(doms[index]).find('input')[0]) {
                                this[field] = Number(angular.element(doms[index]).find('input')[0].value) || 0;
                            }
                            else {
                                this[field] = Number(angular.element(doms[index]).find('div')[0].innerText);
                            }
                        });
                        scope.result = scope.output = eval(formula);
                    })();
                }

                var flagBind, pointer = {};

                function addKeyup(dom, formData) {
                    pointer.callback = function () {
                        angular.forEach(distinctFields, function (field) {
                            this[field] = formData[field];
                        });
                        scope.result = formData[scope.curFieldId] = eval(formula) || 0;
                    };
                    if (!flagBind) {
                        flagBind = true;
                        dom.addEventListener('keyup', function () {
                            pointer.callback();
                        })
                    }
                }

                if (detailId) {
                    $formula.detailsMap[scope.detailId] ? $formula.detailsMap[scope.detailId].push(addKeyup) :
                        $formula.detailsMap[scope.detailId] = [addKeyup];
                } else {
                    detailId = '';
                }
                ;
                setTimeout(function () {
                    angular.forEach(fields, function (field) {
                        if (distinctFields.indexOf(field) < 0) {
                            distinctFields.push(field);
                            doms.push(document.getElementById(detailId + field))
                        }
                    });
                    document.addEventListener('keyup', function () {
                        _getKeyUp();
                        calculate();
                    })
                    document.addEventListener('click', function () {
                        _getKeyUp();
                        calculate();
                    })
                });
            }
        }
    })
    .directive('cCurrent', function ($filter) {
        return {
            restrict: 'E',
            scope: {
                output: '='
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                scope.output = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            }
        }
    })
    .directive('cInfo', function ($rootScope) {
        return {
            restrict: 'E',
            scope: {
                inputSrc: '@',
                output: '='
            },
            template: '<span>{{display}}</span>',
            link: function (scope) {
                if (scope.inputSrc == 'name') {
                    if (!scope.output) {
                        scope.display = scope.output = $rootScope.userInfo.name;
                    } else {
                        scope.display = scope.output;
                    }
                } else if (scope.inputSrc == 'department') {
                    scope.display = $rootScope.userInfo.groupName;
                    scope.output = $rootScope.userInfo.groupId;
                } else if (scope.inputSrc == 'job') {
                    scope.display = $rootScope.userInfo.roleName;
                    scope.output = $rootScope.userInfo.roleId;
                }
            }
        }
    })
    .directive('cReadonly', function ($http) {
        return {
            restrict: 'E',
            scope: {
                convertSrc: '@',
                output: '=',
                flagConvert: '=',
                displayField: '@',
                outputField: '@'
            },
            template: '<span>{{display}}</span>',
            link: function (scope) {
                if (scope.flagConvert) {
                    scope.$watch('output', function (newVal) {
                        $http.get('/oa/ao/getFieldByField/' + scope.convertSrc + '/' +
                            scope.displayField + '/' + scope.outputField + '/' + newVal)
                            .success(function (data) {
                                scope.display = data;
                            })
                    })
                } else {
                    scope.$watch('output', function (newVal) {
                        scope.display = newVal;
                    })
                }
            }
        }
    })
    .directive('cReadnum', function ($formula) {
        return {
            restrict: 'E',
            scope: {
                output: '=',
                fieldId: '@'
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                scope.$watch('output', function () {
                    var formulas = $formula.formulaMap[scope.fieldId];
                    console.log(formulas)
                    if (formulas) {
                        angular.forEach(formulas, function (formula) {
                            formula && formula();
                        })
                    }
                })
            }
        }
    })
    .directive('cConvert', function ($http) {
        return {
            restrict: 'E',
            scope: {
                convertSrc: '@',
                from: '=',
                multiple: '@'
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                scope.$watch('from', function (newVal) {
                    if (scope.from) {
                        var field = 'name';
                        scope.convertSrc == 'job' && (scope.convertSrc = 'roles');
                        scope.convertSrc == 'jobs' && (scope.convertSrc = 'roles');
                        scope.convertSrc == 'department' && (scope.convertSrc = 'groups');
                        scope.convertSrc == 'departments' && (scope.convertSrc = 'groups');
                        if (scope.convertSrc == 'dic') {
                            scope.convertSrc = 'dictionary';
                            field = 't_value';
                        }
                        if (scope.multiple) {
                            $http.get(domain + '/oa/ao/getFields/' + scope.convertSrc + '/' + field + '/' + scope.from)
                                .success(function (data) {

                                    scope.output = data + '';
                                })
                        } else {
                            if (scope.convertSrc == 'name') {

                                scope.output = scope.from;
                            } else {
                                $http.get(domain + '/oa/ao/getField/' + scope.convertSrc + '/' + field + '/' + scope.from)
                                    .success(function (data) {

                                        scope.output = data;
                                    })
                            }
                        }
                    }
                })

            }
        }
    })
    .directive('vSql', function ($http) {
        return {
            restrict: 'E',
            scope: {
                sqlMain: '@',
                output: '=',
                displayField: '@',
                outputField: '@',
                driver: '@',
                url: '@',
                username: '@',
                password: '@'
            },
            template: '<span>{{display}}</span>',
            link: function (scope) {
                if (!!scope.output) {
                    var convertSrc = scope.sqlMain.substring(scope.sqlMain.indexOf('from') + 5),
                        indexOfLeft = convertSrc.indexOf(' '),
                        indexOfWhere = convertSrc.indexOf('where');
                    if (indexOfLeft > 0) {
                        convertSrc = convertSrc.substring(0, indexOfLeft);
                    } else if (indexOfWhere > 0) {
                        convertSrc = convertSrc.substring(0, indexOfWhere);
                    }
                    if (scope.displayField == scope.outputField) {
                        scope.display = scope.output;
                    } else {
                        if (scope.driver) {
                            var sqlMain = scope.sqlMain,
                                limit = sqlMain.length,
                                indexWhere = sqlMain.indexOf('where'),
                                indexLeft = sqlMain.indexOf('left'),
                                indexComma = sqlMain.indexOf(',');
                            if (indexWhere > -1) limit = indexWhere;
                            if (indexLeft > -1) limit = indexLeft;
                            if (indexComma > -1) limit = indexComma;
                            var tableName = sqlMain.substring(sqlMain.indexOf('from') + 5, limit);
                            $http.post(domain + '/oa/common/getDBMSField', {
                                tableName: tableName,
                                display: scope.displayField.toLowerCase(),
                                field: scope.outputField.toLowerCase(),
                                value: scope.output,
                                driver: scope.driver,
                                url: scope.url,
                                username: scope.username,
                                password: scope.password
                            }).success(function (data) {
                                scope.display = data;
                            })
                        } else {
                            var url = domain + '/oa/ao/getFieldByField/' + convertSrc + '/' +
                                scope.displayField + '/' + scope.outputField + '/' + scope.output
                            console.log(indexOfLeft, url)
                            $http.get(url)
                                .success(function (data) {
                                    scope.display = data;
                                })
                        }
                    }
                }
            }
        }
    })
    .directive('cWorkflows', function ($filter, $http, $ionicModal) {
        return {
            restrict: 'E',
            scope: {
                output: '='
            },
            template: '<button class="button button-balanced button-medium" ng-click="openModal()">选择历史流程</button>' +
            '<div ng-show="flagSelect" ng-repeat="item in display">{{item.name}} &nbsp;<button class="button button-icon ion-close-circled button-close" ng-click="doRemove(item,$index)"></button></div>',
            link: function (scope, ele) {
                var modal
                    , prevItem = {}
                    , selectitems = []
                    , confirmitems = []
                    , itemmap = {};
                scope.display = [];
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-workflows.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (data) {
                    modal = data;
                });

                function initlist() {
                    $http.post(domain + '/oa/pro/initList/?limit=20&offset=0', {
                        related: null
                    }).success(function (data) {
                        scope.list = data.list;
                    })
                };
                scope.doSelect = function (item) {
                    if (item.flagSelected) {
                        item.flagSelected = false;
                        var index = selectitems.indexOf(item)
                        selectitems.splice(index, 1);
                    } else {
                        selectitems.push(item);
                        item.flagSelected = true;
                    }
                };
                scope.doConfirm = function () {
                    modal.hide();
                    scope.flagSelect = true;
                    angular.forEach(selectitems, function (preitem) {
                        if (confirmitems.indexOf(preitem) < 0) {
                            itemmap[preitem.id] = preitem;
                            confirmitems.push(preitem);
                            scope.display.push({
                                proId: preitem.id,
                                creator: preitem.creator,
                                date: $filter('date')(preitem.created_date, 'yyyy年MM月dd日'),
                                name: preitem.name
                            })
                        }
                    })
                    scope.output = angular.toJson(scope.display);
                };
                scope.doRemove = function (item, index) {
                    scope.display.splice(index, 1);
                    scope.output = angular.toJson(scope.display);
                    item.flagSelected = false;
                    var selectedItem = itemmap[item.proId]
                    selectitems.flagSelected = false;
                    selectitems.splice(selectitems.indexOf(selectitems), 1);
                    confirmitems.splice(confirmitems.indexOf(selectitems), 1);
                };
                scope.openModal = function () {
                    selectitems = [];
                    initlist();
                    modal.show();
                };
                scope.close = function () {
                    modal.hide();
                };
            }
        }
    })
    .directive('vReport', function ($http, $form, $timeout) {
        return {
            restrict: 'E',
            scope: {
                modId: '@',
                outputField: '@',
                displayField: '@',
                output: '='
            },
            template: '<span>{{display}}</span>',
            link: function (scope) {
                if (scope.outputField == scope.displayField) {
                    scope.display = scope.output;
                } else {
                    $http.get(domain + '/oa/mod/getByCtrl/' + scope.modId + '/' + scope.displayField + '/' + scope.outputField + '/' + scope.output)
                        .success(function (data) {
                            console.log(1)
                            scope.display = data;
                        })
                }
            }
        }
    })
    .directive('cReport', function ($http, $ionicModal, $form, $timeout) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                modId: '@',
                flagAccess: '=',
                flagDetailMappings: '=',
                mappings: '@',
                detailMappings: '@',
                outputField: '@',
                displayField: '@',
                rangeSql: '@',
                form: '=',
                output: '='
            },
            template: '<button class="button button-balanced button-medium" ng-click="openSelections()" ng-hide="flagSelect">选择数据</button>' +
            '<div ng-show="flagSelect">{{displayTemplate}} &nbsp;<button class="button button-icon ion-close-circled button-close" ng-click="remove()"></button></div>',
            link: function (scope, element) {
                console.log(scope.flagAccess);
                console.log(scope.flagDetailMappings);
                console.log(scope.form);
                console.log(scope.output);
                console.log(scope.outputField);
                console.log(scope.displayField);
                console.log(scope.mappings);
                var modal, initList, getPage, sqlPart, tableSchema, detailKeys, mappings, detailMappings, curItem,
                    privilegeFields, confirmPage, confirmIndex, formData = scope.form,
                    payload, modalInstance, prevItem = {};
                scope.flagSelect = false;
                scope.page = 1;
                scope.size = 500;
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-select.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    modalInstance = modal;
                });
                if (scope.displayField != scope.outputField)
                    scope.$watch('output', function (newVal) {
                        if (newVal) {
                            $http.get(domain + '/oa/mod/getByCtrl/' + scope.modId +
                                '/' + scope.displayField + '/' + scope.outputField + '/' + newVal)
                                .success(function (data) {
                                    scope.display = data;
                                })
                        }
                    })
                if (scope.output) {
                    scope.flagSelect = true;
                    if (scope.displayField == scope.outputField) {
                        scope.displayTemplate = scope.display = scope.output;
//						console.log(scope.display)
                    } else {
                        $http.get(domain + '/oa/ao/getModFieldByField/' + scope.modId + '/' +
                            scope.displayField + '/' + scope.outputField + '/' + scope.output)
                            .success(function (data) {
                                scope.display = data;
                            })
                    }
                }
                scope.timestamp = +new Date();
                scope.openSelections = function () {
                    modalInstance.show();
                };
                scope.close = function () {
                    modalInstance.hide();
                };
                scope.confirm = function () {
                    scope.flagSelect = true;
                    scope.displayName = scope.display = curItem[scope.displayField];
                    scope.output = curItem[scope.outputField];
                    modal.close();
                    if (scope.form) {
                        if (mappings) {
                            angular.forEach(mappings, function (mapping) {
                                scope.form[mapping.formFieldId] = curItem[mapping.modFieldId];
                            })
                        }
                        if (detailMappings) {
                            angular.forEach(detailMappings, function (detailMapping) {
                                var curFormDetail = formData[detailMapping.formDetailId];
                                !curFormDetail && (curFormDetail = formData[detailMapping.formDetailId] = []);
                                angular.forEach(curItem[detailMapping.modDetailId], function (detailItem, index) {
                                    curFormDetail[index] = detailItem;
                                })
                            })
                        }
                    }
                };
                scope.remove = function () {
                    scope.flagSelect = false;
                    scope.output = scope.display = undefined;
                    if (mappings) {
                        angular.forEach(mappings, function (mapping) {
                            scope.form[mapping.formFieldId] = undefined;
                        })
                    }
                    if (detailMappings) {
                        angular.forEach(detailMappings, function (detailMapping) {
                            var curFormDetail = formData[detailMapping.formDetailId];
                            if (curFormDetail) {
                                formData[detailMapping.formDetailId] = [];
                            }
                        })
                    }
                };
                scope.doPager = function (page) {
                    scope.flagSelected = confirmPage == page ? confirmIndex : -1;
                    getPage(page);
                };
                if (scope.flagAccess) {
                    initList = function () {
                        $http.post(domain + '/oa/rep/init/' + scope.modId, scope.rangeSql, {
                            params: {
                                limit: scope.size,
                                roleId: userInfo.roleId,
                                groupId: userInfo.groupId
                            },
                            headers: {
                                'Content-Type': 'text/html'
                            }
                        }).success(function (data) {
                            scope.list = data.list;
                            scope.modName = data.name;
                            scope.priName = data.name;
                            scope.count = data.count;
                            var priFields = data.fields;
                            tableSchema = JSON.parse(data.tableSchema);
                            delete data.tableSchema;
                            payload = data;
                            scope.sum = data.sum;
                        })
                    };
                    getPage = function (page) {
                        scope.list = false;
                        $http.post(domain + '/oa/rep/getRepPage', payload, {
                            params: {
                                offset: (page - 1) * 10,
                                limit: 10
                            }
                        }).success(function (data) {
                            scope.list = data;
                        })
                    }
                } else {
                    initList = function () {
                        $http.post(domain + '/oa/mod/initModList/' + scope.modId, '1', {
                            params: {
                                limit: scope.size
                            },
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }).success(function (data) {
                            angular.extend(scope, data);
                            sqlPart = data.sqlPart;
                            console.log(data)
                        }).error(function (data) {
                            alert(data);
                        })
                    };
                    getPage = function (page) {

                        scope.list = false;
                        $http.post(domain + '/oa/mod/getModPage', sqlPart, {
                            params: {
                                offset: (page - 1) * 10,
                                limit: 10
                            },
                            headers: {
                                'Content-type': 'text/html'
                            }
                        }).success(function (data) {
                            scope.list = data;
                        })
                    };
                }
                initList();
                scope.doSelect = function (item) {
                    prevItem.flagSelected = false;
                    item.flagSelected = true;
                    prevItem = item;
                    scope.output = scope.outputType ? item : item[scope.outputField];
                    scope.displayTemplate = item[scope.displayField];
                };
                scope.doConfirm = function () {
                    scope.flagSelect = true;
                    scope.form = prevItem;
                    scope.output = scope.outputField == 'object' ? prevItem : prevItem[scope.outputField];
                    console.log(scope.output, prevItem, prevItem[scope.outputField])
                    scope.displayTemplate = prevItem[scope.displayField];
                    modalInstance.hide();
                }
                if (scope.mappings) {
                    mappings = JSON.parse(scope.mappings);
                    console.log(mappings)
                }
                if (scope.flagDetailMappings) {
                    detailMappings = JSON.parse(scope.detailMappings);
                }
                var flagFieldsMap, fieldsMap = {};

                function _initSearch() {
                    scope.searchData = {};
                    if (!flagFieldsMap) {
                        _getFieldsMap();
                        flagFieldsMap = true;
                    }
                    setTimeout(function () {
                        $form.renderSearch({
                            tableSchema: privilegeFields,
                            scope: scope,
                            elementId: 'side-search' + scope.timestamp,
                            flagSide: true
                        })
                    })
                }

                function _getFieldsMap() {
                    angular.forEach(tableSchema, function (field) {
                        fieldsMap[field.id] = field;
                    })
                }

                var filters = {};
                scope.search = function (searchData) {
                    var concat = ' and ',
                        filterName = '',
                        filterList = [];
                    scope.filterName = '';
                    angular.forEach(searchData, function (value, key) {
                        console.log(value, fieldsMap[key])
                        if (value && fieldsMap[key]) {
                            var ctrl = fieldsMap[key].ctrl;
                            console.log(ctrl)
                            if (ctrl == 'text' || ctrl == 'textarea' || ctrl == 'decoration' || ctrl == 'info') {
                                filterList.push('(' + key + ' like "%' + value + '%")');
                                filterName += '<li>' + fieldsMap[key].name + '中包含 ' + value + ' 关键字</li>';
                            } else if (ctrl == 'number' || ctrl == 'currency' || ctrl == 'datediff') {
                                if (value[1] > value[0]) {
                                    filterList.push('(' + key + ' between ' + value[0] + ' and ' + value[1] + ')');
                                    filterName += '<li>' + fieldsMap[key].name + '大于 ' + value[0] + ' 小于 ' + value[1] + '</li>';
                                } else if (value[1] && !value[0]) {
                                    filterList.push(key + '<' + value[1]);
                                } else if (value[0] && !value[1]) {
                                    filterList.push(key + '>' + value[0]);
                                }
                            } else if (ctrl == 'select' || ctrl == 'user' || ctrl == 'dictionary' || ctrl == 'report' || ctrl == 'sql') {
                                filterList.push(key + '=\'' + value + "'");
                                filterName += '<li>' + fieldsMap[key].name + '</li>';
                            } else if (ctrl == 'multiselect' || ctrl == 'users') {
                                filterList.push(key + ' in (' + value + ')');
                                filterName += '<li>' + fieldsMap[key].name + '</li>';
                            } else if (ctrl == 'datetime' || ctrl == 'current') {
                                if (+new Date(value[1]) > +new Date(value[0])) {
                                    filterList.push('(' + key + " between '" + value[0] + "' and '" + value[1] + "')");
                                    filterName += '<li>' + fieldsMap[key].name + '大于 ' + value[0] + ' 小于 ' + value[1] + '</li>';
                                } else if (value[1] && !value[0]) {
                                    filterList.push(key + '<\'' + value[1] + "'");
                                } else if (value[0] && !value[1]) {
                                    filterList.push(key + '>\'' + value[0] + "'");
                                }
                            }
                        }
                    });
                    scope.filterName = filterName;
                    if (filterList.length) {
                        payload.search = filterList.join(concat);
                    } else {
                        delete payload.search;
                    }
                    scope.list = false;
                    $http.post(domain + '/oa/rep/initRepList', payload, {
                        params: {
                            limit: scope.size
                        }
                    }).success(function (data) {
                        scope.list = data.list;
                        scope.count = data.count;
                    })
                }
            }
        }
    })
    .service('$userModal', function ($ionicModal, $rootScope, APIRead, $http, $ionicScrollDelegate) {
        var modal, scope = $rootScope.$new(),
            prevItem = {},
            selectedItems = [],
            selectedPage = 0,
            pager = {
                page: 0,
                size: 500
            },
            api = APIRead.create('user', pager, scope),
            input;
        if (!modal)
            $ionicModal.fromTemplateUrl('modules/components/templates/modal-users.tpl.html', {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function (data) {
                modal = data;
            });
        var preset;

        function initData() {
            api.initList();
        }

        initData();
        initEvents();

        function initEvents() {
            scope.doSearchName = function (name) {
                if (name) {
                    $http({
                        method: 'POST',
                        url: domain + '/oa/u/initList/',
                        params: {
                            offset: 0,
                            limit: pager.size || 8
                        },
                        data: {
                            search: {
                                name: '%' + name + '%'
                            },
                            active: null
                        }
                    }).success(function (data) {
                        scope.list = data.list;
                        $ionicScrollDelegate.resize();
                    })
                } else {
                    initData();
                }
            };
            scope.getFlagInfinite = function () {
                return scope.list && scope.list.length < scope.size;
            };
            scope.doLoad = function (counts) {
                api.getPage(false, false, {
                    search: {
                        name: '%%'
                    }, active: null
                }, counts);
                scope.$broadcast('scroll.infiniteScrollComplete');
            };
            scope.close = function () {
                modal.hide();
            };
        }

        function initMultiple() {
            scope.doSelect = function (item) {
                item.flagSelected = !item.flagSelected;
                if (item.flagSelected) {
                    selectedItems.push(item.id);
                } else {
                    selectedItems.splice(selectedItems.indexOf(item.id), 1);
                }
            }
        }

        function initSingle() {
            scope.doSelect = function (item) {
                prevItem.flagSelected = false;
                item.flagSelected = true;
                prevItem = item;
            }
        }

        this.init = function (args) {
            initData();
            if (args.input) {
                scope.list = args.input;
                scope.flagNoMore = true;
            }
            prevItem = {};
            if (scope.list) {
                angular.forEach(scope.list, function (item) {
                    item.flagSelected = false;
                });
            }
            selectedItems = [];
            var flagMultiple = args.flagMultiple,
                confirmCallback = args.confirm;
            scope.label = args.label;
            if (flagMultiple) {
                initMultiple();
                var presetList = args.preset;
                preset = function (list) {
                    angular.forEach(list, function (item) {
                        for (var i = 0; i < presetList.length; i++) {
                            if (item.id == presetList[i]) {
                                item.flagSelected = true;
                                break;
                            }
                        }
                    })
                };
                if (presetList && scope.list) {
                    preset(scope.list)
                }
            } else {
                initSingle();
                preset = function (list) {
                }
            }
            scope.doConfirm = function () {
                modal.hide();
                confirmCallback && confirmCallback(flagMultiple ? selectedItems : prevItem);
            }
        }
        this.open = function () {
            modal.show();
        };
    })
    .filter('face', function () {
        return function (input) {
            return domain + '/upload/icons/' + input
        }
    })
    .filter('byte', function () {
        return function (input) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB'];
            if (input == 0) return 'n/a';
            var i = parseInt(Math.floor(Math.log(input) / Math.log(1024)));
            return (input / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        }
    })