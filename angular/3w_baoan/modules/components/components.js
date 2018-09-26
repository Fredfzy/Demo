/**
 * Created by qin on 2016/04/07.
 */
angular.module('oa')
/*	.directive('cUsers', function($ionicModal, APIRead,$http,$ionicScrollDelegate) {
		return {
			restrict: 'E',
			scope: {
				preset: '=',
				presetType: '@',
				presetField: '@',
				input: '=',
				output: '=',
				outputField: '@',
				outputType: '@',
				multiple: '@',
				label: '@',
				display: '=',
				displayField: '@'
			},
			templateUrl: 'modules/components/templates/template-users.tpl.html',
			link: function(scope) {
				console.log(scope.preset);
				console.log(scope.output);
				console.log(scope.presetField)
				var modalInstance,
					prevItem = {},
					selectedPage = 0,
					selectedItems = [],
					pager = {
						page: 0,
						size: 10
					},
				api = APIRead.create('u', pager, scope);
				$ionicModal.fromTemplateUrl('modules/components/templates/modal-users.tpl.html', {
					scope: scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					modalInstance = modal;
				});

				function initScope() {
					scope.label = scope.label || '选择人员(' + (scope.multiple ? '多选' : '单选') + ')';
					scope.outputField = scope.outputField || 'id';
					scope.presetField = scope.presetField || 'id';
					scope.pager = {
						page: 0,
						size: 16
					}
					scope.displayTemplate = scope.multiple ? [] : '';
					if(scope.multiple && scope.presetType == 'str') {
						scope.preset = scope.preset.split(',');
					}
					scope.displayField = scope.displayField || 'name';
				}

				function initData() {
					if(scope.input) {
						scope.list = scope.input;
					} else {
						api.initList(function() {
							if(scope.preset) {
								fGetPresettedItem()
							}
						});
					}
				}

				function fSetMultiOutput() {
					if(scope.outputField == 'object') {
						scope.output = scope.displayTemplate
					} else {
						var output = []
						var display = [];
						angular.forEach(scope.displayTemplate, function(item) {
							output.push(item[scope.outputField])
							display.push(item[scope.displayField])
						})
						scope.output = scope.outputType == 'arr' ? output : output + '';
						scope.display = display + '';
					}
				}

				function fGetPresettedItem() {
//					console.log(scope.preset)
					if(scope.multiple) {
						var flag = scope.preset.length;
						for(var j = 0; j < scope.list.length && flag > 0; j++) {
							var item = scope.list[j];
							for(var k = 0; k < scope.preset.length; k++) {
								if(scope.preset[k] == item.id ||
									scope.preset[k] == item[scope.presetField]) {
									item.flagSelected = true;
									scope.displayTemplate.push(item);
									flag--;
									break;
								}
							}
						}
					} else {
						var presetId = scope.presetField == 'object' ? scope.preset.id : scope.preset
						for(var l = 0; l < scope.list.length; l++) {
							var item = scope.list[l];
							if(presetId == item.id) {
								prevItem = item;
								item.flagSelected = true;
								scope.displayTemplate = item.name;
								break;
							}
						}
					}
				}

				function fGetSelectedItem() {
					if(scope.multiple) {
						angular.forEach(scope.list, function(item) {
							for(var j = 0; j < scope.displayTemplate.length; j++) {
								if(scope.displayTemplate[j].id == item.id) {
									item.flagSelected = true;
									break;
								}
							}
						})
					} else {
						if(scope.pager.page == selectedPage) {
							for(var i = 0; i < scope.list.length; i++) {
								if(scope.list[i][scope.outputField] == prevItem[scope.outputField]) {
									scope.list[i].flagSelected = true;
									prevItem = scope.list[i];
									break;
								}
							}
						}
					}
				}
				function initEvents() {
					scope.openSelections = function() {
						scope.displayTemplate=[];
						modalInstance.show();
						api.initList();
					}
//					scope.doPager = function(page) {
//						scope.pager.page = page;
//						api.getPage(fGetSelectedItem);
//					}
//					scope.doChangeRole = function(roleId) {
//						if(!scope.pager.condition) scope.pager.condition = {
//							name: null,
//							roleId: null,
//							groupId: null
//						}
//						if(roleId) {
//							scope.pager.condition.roleId = roleId;
//							api.scope = scope;
//							api.initList();
//						}
//					}
//					scope.doChangeGroup = function(groupId) {
//						if(!scope.pager.condition) scope.pager.condition = {
//							name: null,
//							roleId: null,
//							groupId: null
//						}
//						if(groupId) {
//							scope.pager.condition.groupId = groupId;
//							api.scope = scope;
//							api.initList();
//						}
//					}
					scope.doSearchName = function(name) {
						scope.flagNoMore=false;
						if(name){
							$http({
								method:'POST',
								url:domain+'/oa/u/initList/',
								params:{
									offset: 0,
									limit:pager.size || 8
								},
								data:{
									search:{
										name:'%'+name+'%'
									},
									active:null
								}
							}).success(function(data){
								scope.list = data.list;
								$ionicScrollDelegate.resize();
							})
						}else{
							api.initList();
						}
//						api.initList(false, false,{search:{
//                                  name: '%' + name + '%'
//                              },active:null});
//                      scope.$broadcast('scroll.infiniteScrollComplete');
					}
//					scope.doRefresh = function() {
//						scope.pager.condition = undefined;
//						scope.flagRefresh = true;
//						$timeout(function() {
//							scope.flagRefresh = false;
//						}, 100)
//						api.initList();
//					};
//					scope.getFlagInfinite = function() {
//						return scope.list && scope.list.length < scope.size;
//					};
					scope.doLoad = function(counts) {
						api.getPage(false, false,{search:{
                                    name: '%%'
                                },active:null},counts);
						scope.$broadcast('scroll.infiniteScrollComplete');
					}
					scope.doSelect = function(item) {
						if(scope.multiple) {
							item.flagSelected = !item.flagSelected;
							if(item.flagSelected) {
								scope.displayTemplate.push(item);
							} else {
								scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
							}
						} else {
							prevItem.flagSelected = false;
							item.flagSelected = true;
							scope.displayModal = item.name;
							prevItem = item;
						}
						console.log(scope.displayTemplate)
					}
					scope.doConfirm = function() {
						if(scope.multiple) {
							console.log(1)
							fSetMultiOutput()
						} else {
							scope.output = scope.outputField == 'object' ? prevItem : prevItem[scope.outputField];
							scope.displayTemplate = prevItem.name;
						}
//						console.log(prevItem, scope.outputField)
						modalInstance.hide();
					}
					scope.close = function() {
						modalInstance.hide();
					}
					scope.doRemove = function(item) {
						item.flagSelected = false;
						scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
						fSetMultiOutput()
					}
				}

				(function() {
					initScope();
					initData();
					initEvents();
				})()
			}
		}
	})*/
    .directive('cUsers', function ($ionicModal, APIRead, $http, $ionicScrollDelegate) {
        return {
            restrict: 'E',
            scope: {
                preset: '=',
                presetType: '@',
                presetField: '@',
                input: '=',
                output: '=',
                outputField: '@',
                outputType: '@',
                multiple: '@',
                label: '@',
                display: '=',
                displayField: '@'
            },
            templateUrl: 'modules/components/templates/template-users.tpl.html',
            link: function (scope) {
                console.log(scope.preset);
                console.log(scope.output);
                console.log(scope.presetField)
                var modalInstance,
                    prevItem = {},
                    selectedPage = 0,
                    selectedItems = [],
                    pager = {
                        page: 0,
                        size: 500
                    },
                    api = APIRead.create('user', pager, scope);
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-users.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    modalInstance = modal;
                });

                function initScope() {
                    scope.label = scope.label || '选择人员(' + (scope.multiple ? '多选' : '单选') + ')';
                    scope.outputField = scope.outputField || 'id';
                    scope.presetField = scope.presetField || 'id';
                    scope.pager = {
                        page: 0,
                        size: 100
                    }
                    scope.displayTemplate = scope.multiple ? [] : '';
                    if (scope.multiple && scope.presetType == 'str' && scope.preset) {
                        scope.preset = scope.preset.split(',');
                    }
                    scope.displayField = scope.displayField || 'name';
                }

                function initData() {
                    if (scope.input) {
                        scope.list = scope.input;
                    } else {
                        api.initList(function () {
                            if (scope.preset) {
                                fGetPresettedItem()
                            }
                        });
                    }
                }

                function fSetMultiOutput() {
                    if (scope.outputField == 'object') {
                        scope.output = scope.displayTemplate
                    } else {
                        var output = []
                        var display = [];
                        angular.forEach(scope.displayTemplate, function (item) {
                            output.push(item[scope.outputField])
                            display.push(item[scope.displayField])
                        })
                        scope.output = scope.outputType == 'arr' ? output : output + '';
                        scope.display = display + '';
                    }
                }

                function fGetPresettedItem() {
                    console.log(scope.preset)
                    if (scope.multiple) {
                        var flag = scope.preset.length;
                        for (var j = 0; j < scope.list.length && flag > 0; j++) {
                            var item = scope.list[j];
                            for (var k = 0; k < scope.preset.length; k++) {
                                if (scope.preset[k] == item.id ||
                                    scope.preset[k] == item[scope.presetField]) {
                                    item.flagSelected = true;
                                    scope.displayTemplate.push(item);
                                    flag--;
                                    break;
                                }
                            }
                        }
                    } else {
                        var presetId = scope.presetField == 'object' ? scope.preset.id : scope.preset
                        for (var l = 0; l < scope.list.length; l++) {
                            var item = scope.list[l];
                            if (presetId == item.id) {
                                prevItem = item;
                                item.flagSelected = true;
                                scope.displayTemplate = item.name;
                                break;
                            }
                        }
                    }
                }

                function fGetSelectedItem() {
                    if (scope.multiple) {
                        angular.forEach(scope.list, function (item) {
                            for (var j = 0; j < scope.displayTemplate.length; j++) {
                                if (scope.displayTemplate[j].id == item.id) {
                                    item.flagSelected = true;
                                    break;
                                }
                            }
                        })
                    } else {
                        if (scope.pager.page == selectedPage) {
                            for (var i = 0; i < scope.list.length; i++) {
                                if (scope.list[i][scope.outputField] == prevItem[scope.outputField]) {
                                    scope.list[i].flagSelected = true;
                                    prevItem = scope.list[i];
                                    break;
                                }
                            }
                        }
                    }
                }

                function initEvents() {
                    scope.openSelections = function () {
                        scope.displayTemplate = []
                        modalInstance.show();
                        api.initList();
                        console.log(scope.outputField)

                    }
                    scope.doPager = function (page) {
                        scope.pager.page = page;
                        api.getPage(fGetSelectedItem);
                    }
                    scope.doChangeRole = function (roleId) {
                        if (!scope.pager.condition) scope.pager.condition = {
                            name: null,
                            roleId: null,
                            groupId: null
                        }
                        if (roleId) {
                            scope.pager.condition.roleId = roleId;
                            api.scope = scope;
                            api.initList();
                        }
                    }
                    scope.doChangeGroup = function (groupId) {
                        if (!scope.pager.condition) scope.pager.condition = {
                            name: null,
                            roleId: null,
                            groupId: null
                        }
                        if (groupId) {
                            scope.pager.condition.groupId = groupId;
                            api.scope = scope;
                            api.initList();
                        }
                    }
                    scope.doSearchName = function (e, name) {
                        scope.flagNoMore = false;
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
                            api.initList();
                        }
//						api.initList(false, false,{search:{
//                                  name: '%' + name + '%'
//                              },active:null});
//                      scope.$broadcast('scroll.infiniteScrollComplete');
                    }

                    scope.doRefresh = function () {
                        scope.pager.condition = undefined;
                        scope.flagRefresh = true;
                        $timeout(function () {
                            scope.flagRefresh = false;
                        }, 100)
                        api.initList();
                    };
                    scope.getFlagInfinite = function () {
                        return scope.list && scope.list.length < scope.size;
                    };
                    <!--2-2017.9.7-->
                    scope.doLoad = function (counts) {
                        api.getPage(false, false, {
                            search: {
                                name: '%%'
                            }, active: null
                        }, counts);
                        scope.$broadcast('scroll.infiniteScrollComplete');
                    };

                    scope.doSelect = function (item) {
                        if (scope.multiple) {
                            item.flagSelected = !item.flagSelected;
                            if (item.flagSelected) {
                                scope.displayTemplate.push(item);
                            } else {
                                scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
                            }
                        } else {
                            prevItem.flagSelected = false;
                            item.flagSelected = true;
                            scope.displayModal = item.name;
                            prevItem = item;
                        }
                    }
                    scope.doConfirm = function () {
                        if (scope.multiple) {
                            fSetMultiOutput()
                        } else {
                            scope.output = scope.outputField == 'object' ? prevItem : prevItem[scope.outputField];
                            scope.displayTemplate = prevItem.name;
                            console.log(prevItem, scope.outputField)
                        }
                        modalInstance.hide();
                    }
                    scope.close = function () {
                        modalInstance.hide();
                    }
                    scope.doRemove = function (item) {
                        item.flagSelected = false;
                        scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
                        fSetMultiOutput()
                    }
                }

                (function () {
                    initScope();
                    initData();
                    initEvents();
                })()
            }
        }
    })

    .directive('cSelect', function ($ionicModal, $http, Util) {
        return {
            restrict: 'E',
            scope: {
                preset: '=',
                presetField: '@',
                presetType: '@',
                output: '=',
                outputType: '@',
                outputField: '@',
                displayField: '@',
                input: '=',
                inputSrc: '@',
                multiple: '@',
                recursion: '@',
                label: '@',
                doChange: '&'
            },
            templateUrl: 'modules/components/templates/template-select.tpl.html',
            link: function (scope) {
//				              console.log(scope.preset)
                var selectedItems = [],
                    templateName = scope.recursion ? 'recursion' : 'select',
                    modalInstance, prevItem = {};
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-' + templateName + '.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    modalInstance = modal;
                });

                function initScope() {
                    scope.presetField = scope.presetField || 'id';
                    scope.outputField = scope.outputField || 'id';
                    scope.displayField = scope.displayField || 'name';
                    scope.displayTemplate = scope.multiple ? [] : '请选择' + (scope.label || '');
                }

                function initData() {
                    var callback;
                    if (scope.inputSrc) {
                        if (scope.inputSrc == 'dic') {
                            $http.get(domain + '/oa/common/dictionary/id/' + scope.input).success(function (data) {
                                scope.list = data;
                                callback && callback()
                            })
                        } else {
//							console.log(scope.inputSrc)
                            $http.get(domain + '/oa/common/' + scope.inputSrc).success(function (data) {
//								scope.recursion ? Util.getRecursion(data, scope) :
                                scope.list = data;
                                callback && callback();
                            })
                        }
                    } else if (scope.input) {
                        scope.list = scope.input;
                        callback && callback()
                    }
                    if (scope.preset) {
                        (scope.multiple && scope.presetType == 'str') && (scope.preset = scope.preset.split(','));
//						console.log(scope.preset)
                        if (scope.multiple) {
                            selectedItems = scope.preset;
                            callback = function () {
                                console.log(scope.list)
                                for (var i = 0; i < scope.list.length; i++) {
//									var item = scope.list[i]
                                    for (var j = 0; j < scope.preset.length; j++) {
                                        if (scope.preset[j] == scope.list[i][scope.presetField]) {
                                            console.log(scope.list[i])
                                            scope.list[i].flagSelected = true;
                                            scope.displayTemplate.push(scope.list[i]);
                                            break;
                                        }
                                    }
                                }
                                console.log(scope.displayTemplate)
                            }
                        } else {
                            callback = function () {
                                for (var i = 0; i < scope.list.length; i++) {
                                    var item = scope.list[i];
                                    if (scope.preset == item[scope.presetField]) {
                                        item.flagSelected = true;
                                        scope.output = scope.presetField == 'object' ? item : item[scope.presetField];
                                        scope.displayTemplate = item[scope.displayField];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                function fSetMultiOutput() {
                    if (scope.outputField != 'object') {
                        scope.output = scope.outputType == 'arr' ? selectedItems : selectedItems + '';
                    } else {
                        scope.output = scope.displayTemplate;
                    }
                }

                function initEvents() {
                    scope.openSelections = function () {
                        modalInstance.show();
                    }
                    scope.close = function () {
                        modalInstance.hide();
                    }
                    scope.doGetChildren = function (e) {
                        e.stopPropagation();
                    }
                    scope.doSelect = function (item) {
                        if (scope.multiple) {
                            if (item.flagSelected = !item.flagSelected) {
                                scope.displayTemplate.push(item);
                                selectedItems.push(item[scope.outputField]);
                            } else {
                                scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
                                selectedItems.splice(selectedItems.indexOf(item[scope.outputField]), 1);
                            }
                            fSetMultiOutput()
                        } else {
                            prevItem.flagSelected = false;
                            item.flagSelected = true;
                            prevItem = item;
                            scope.output = scope.outputType ? item : item[scope.outputField];
                            scope.displayTemplate = item[scope.displayField];
                        }
                        scope.doChange && scope.doChange({
                            id: item[scope.outputField]
                        })
                    }
                    scope.doRemove = function (item) {
                        scope.displayTemplate.splice(scope.displayTemplate.indexOf(item), 1);
                        selectedItems.splice(selectedItems.indexOf(item[scope.outputField]), 1);
                        item.flagSelected = false;
                        fSetMultiOutput()
                    }
                    scope.doConfirm = function () {
                        if (scope.multiple) {
                            fSetMultiOutput()
                        } else {
                            scope.output = scope.outputField == 'object' ? prevItem : prevItem[scope.outputField];
                            console.log(scope.output, prevItem, prevItem[scope.outputField])
                            scope.displayTemplate = prevItem[scope.displayField];
                        }
                        modalInstance.hide();
                    }
                }

                (function () {
                    initScope();
                    initData();
                    initEvents();
                })()
            }
        }
    })
    .directive('cRmb', function () {
        return {
            restrict: 'E',
            template: '<span>{{output|rmb}}</span>',
            //            scope: {
            //                form: '=',
            //                output: '=',
            //                dependency: '@'
            //            },
            scope: {
                refField: '=',
                refFieldId: '@',
                output: '='
            },
            link: function (scope) {
                //                document.getElementById('mod-form').addEventListener('touchstart', function () {
                //                    console.log(scope.dependency, scope.form[scope.dependency])
                //                    scope.output = scope.form[scope.dependency];
                //                })
                //                  $rmb.rmbMap[scope.refFieldId] = function (newVal) {
                //                                      console.log(newVal)
                //                                      scope.$apply(function () {
                //                                          scope.output = newVal;
                //                                      });
                //                                  }
                scope.$watch('refField', function (newVal) {
                    scope.output = newVal;
                })
            }
        }
    })
    .directive('cAttachments', function () {
        return {
            restrict: 'E',
            scope: {
                input: '=',
                output: '=',
                outputType: '@',
                flagAccess: '='
            },
            templateUrl: 'modules/components/templates/template-attachments.tpl.html',
            link: function (scope) {
                var modal;
                scope.icons = {
                    'vnd.ms-excel': 'fa-file-excel-o',
                    'pdf': 'fa-file-pdf-o',
                    'msword': 'fa-file-word-o'
                }
                scope.domain = domain;
                scope.doPreview = function (item) {
                    window.location.href = domain + item.virtual_path;
                }
            }
        }
    })
    .directive('cDetail', function ($ionicModal, $ionicLoading, $timeout, $filter, $form, $sum, $formula, $detail, $ionicScrollDelegate, $location, $anchorScroll) {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                input: '=',
                output: '=',
                preset: '=',
                outputType: '@',
                inputRemoved: '=',
                flagEdit: '@',
                readonly: '='
            },
            templateUrl: 'modules/components/templates/template-detail-c.tpl.html',
            link: function (scope, ele) {
                var modalInstance;
                var detailId = scope.input.id;
                (function () {
                    initScope();
                })();

                function initScope() {
                    scope.validation = [];
                    scope.output[detailId] = scope.output[detailId] || [];
                }

                var view;
                if (!modalInstance)
                    $ionicModal.fromTemplateUrl('modules/components/templates/modal-detail.tpl.html', {
                        scope: scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        modalInstance = modal;
                        setTimeout(function () {
                            view = angular.element(modal.el).find('section')
                            $form.renderDetail({
                                detail: scope.input,
                                scope: scope,
                                element: view,
                                formData: scope.formData
                            });
                        })
                        //                  console.log(scope.detailId)
                    });
                scope.id = Math.random().toString(36).substr(2);
                var flagEdit, index;
                scope.openModal = function (formData, _index) {
                    scope.flagEdit = flagEdit = !!formData;
                    index = _index;
//					scope.formData = false;
                    $timeout(function () {
                        scope.formData = formData || {}
                        if ($formula.detailsMap[detailId]) {
                            angular.forEach($formula.detailsMap[detailId], function (callback) {
                                callback && callback(view[0], scope.formData);
                            })
                        }
                    });
                    modalInstance.show();
                };
                scope.resize = function () {
                    //$ionicScrollDelegate.resize();
                    if (scope.limit == 2) {
                        scope.limit = scope.list.length
                    } else {
                        scope.limit = 2;
                        $location.hash(scope.id + '0');
                        $anchorScroll();
                    }
                };
                scope.remove = function () {
                    if (scope.formData.id) {
                        $detail.flagPreRemove = true;
                        $detail.preRemoveDetailMap[detailId].push(scope.formData.id);
                    }
                    if ($sum.details.length) {
                        angular.forEach($sum.details, function (detail) {
                            angular.forEach($sum[detail], function (callback) {
                                callback && callback();
                            })
                        })
                    }
                };
                scope.getWidth = function (items) {
                    var width = 0;
                    angular.forEach(items, function (item) {
                        width += item.name.length * 30;
                    })
                    return width + 'px'
                };
                scope.close = function () {
                    modalInstance.hide();
                };

                scope.doConfirm = function (formData) {
                    console.log(formData)
                    /*if(formData.id){
                        formData.id=$filter('rmb')(formData.id);
                    }*/

                    /*一个坑*/

                    /*	if(formData.dField1){
                            formData.dField1=$filter('rmb')(formData.dField1);
                        }*/
                    var flag = true;
                    if (scope.validations) {
                        var validations = scope.validations;
                        for (var i = 0; i < validations.length; i++) {
                            if (!formData[validations[i]]) {
                                flag = false;
                                $ionicLoading.show({
                                    template: '存在未填写的必填字段',
                                    duration: 1000
                                });
                            }
                        }
                    }
//					if(scope.validation.length) {
//						for(var i = 0; i < scope.validation.length; i++) {
//							if(!formData[scope.validation[i]]) {
//								flag = false;
//							}
//						}
//					}
                    if (flag) {
                        modalInstance.hide();
                        if (flagEdit) {
                            scope.output[detailId][index] = formData;
                            console.log(scope.output[detailId])
                        } else {
                            console.log(scope.output[detailId])
                            scope.output[detailId].push(formData)
                            scope.formData = false;
                        }
                        if ($sum.details.length) {
                            angular.forEach($sum.details, function (detail) {
                                angular.forEach($sum[detail], function (callback) {
                                    callback && callback();
                                })
                            })
                        }
                    }
                }
            }
        }
    })
    /*    .directive('cDetail', function($ionicModal, $timeout, $form, $sum, $formula, $detail, $ionicScrollDelegate, $location, $anchorScroll) {
            return {
                restrict: 'E',
                scope: {
                    label: '@',
                    input: '=',
                    output: '=',
                    preset: '=',
                    outputType: '@',
                    inputRemoved: '=',
                    flagEdit: '@',
                    readonly: '='
                },
                templateUrl: 'modules/components/templates/template-detail-c.tpl.html?' + ver,
                link: function(scope, ele) {
                    var modalInstance;
                    var detailId = scope.input.id

                    ;
                    (function() {
                        initScope();
                    })();

                    function initScope() {
                        scope.validation = [];
                        scope.output[detailId] = scope.output[detailId] || [];
                    }
                    var view;
                    if(!modalInstance)
                        $ionicModal.fromTemplateUrl('modules/components/templates/modal-detail.tpl.html', {
                            scope: scope,
                            animation: 'slide-in-up'
                        }).then(function(modal) {
                            modalInstance = modal;
                            setTimeout(function() {
                                view = angular.element(modal.el).find('section')
                                $form.renderDetail({
                                    detail: scope.input,
                                    scope: scope,
                                    element: view,
                                    formData: scope.formData
                                });
                            })
                            console.log(scope.detailId)
                        });
                    scope.id

                        = Math.random().toString(36).substr(2);
                    var flagEdit, index;
                    scope.openModal = function(formData, _index) {
                        scope.flagEdit = flagEdit = !!formData;
                        index = _index;
                        scope.formData = false;
                        $timeout(function() {
                            scope.formData = formData || {}
                            if($formula.detailsMap[detailId]) {
                                angular.forEach($formula.detailsMap[detailId], function(callback) {
                                    callback && 　callback(view[0], scope.formData);
                                })
                            }
                        });
                        modalInstance.show();
                    };
                    scope.resize = function() {
                        //$ionicScrollDelegate.resize();
                        if(scope.limit == 2) {
                            scope.limit = scope.list.length
                        } else {
                            scope.limit = 2;
                            $location.hash(scope.id

                                + '0');
                            $anchorScroll();
                        }
                    };
                    scope.remove = function() {
                        if(scope.formData.id

                        ) {
                            $detail.flagPreRemove = true;
                            $detail.preRemoveDetailMap[detailId].push(scope.formData.id

                            );
                        }
                        if($sum.details.length) {
                            angular.forEach($sum.details, function(detail) {
                                angular.forEach($sum[detail], function(callback) {
                                    callback && callback();
                                })
                            })
                        }
                    };
                    scope.getWidth = function(items) {
                        var width = 0;
                        angular.forEach(items, function(item) {
                            width += item.name

                                .length * 30;
                        })
                        return width + 'px'
                    };
                    scope.close = function() {
                        modalInstance.hide();
                    };
                    scope.doConfirm = function(formData) {
                        var flag = true;
                        if(scope.validation.length) {
                            for(var i = 0; i < scope.validation.length; i++) {
                                if(!formData[scope.validation[i]]) {
                                    flag = false;
                                }
                            }
                        }
                        if(flag) {
                            console.log(formData)
                            modalInstance.hide();
                            if(flagEdit) {
                                scope.output[detailId][index] = formData;
                            } else {
                                scope.output[detailId].push(formData)
                                scope.formData = false;
                            }
                            if($sum.details.length) {
                                angular.forEach($sum.details, function(detail) {
                                    angular.forEach($sum[detail], function(callback) {
                                        callback && callback();
                                    })
                                })
                            }
                        }
                    }
                }
            }
        })*/

    .directive('cAttachmentsHandler', function () {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                input: '=',
                output: '=',
                outputType: '@',
                inputRemoved: '='
            },
            templateUrl: 'modules/components/templates/template-attachments-handler.tpl.html',
            link: function (scope, ele) {
                var uploader = ele.find('input')[0],
                    files = [],
                    currentFile,
                    path = '/upload/files/',
                    xhr, i = 0;
                scope.outputField = scope.outputField || 'object';
                scope.outputType = scope.outputType || 'arr';
                scope.files = [];
                scope.inputRemoved = [];

                function fUpload(file) {
                    var fd = new FormData()
                    fd.append("file", file.file)
                    xhr = new XMLHttpRequest();
                    xhr.addEventListener("load", function (evt) {
                        var responseObj = JSON.parse(evt.currentTarget.response);
                        i++;
                        scope.$apply(function () {
                            file.flagLoading = false;
                        })
                        file.filename = responseObj.filename;
                        file.virtual_path = path + file.filename;
                        if (i == scope.files.length) {
                            scope.$apply(function () {
                                scope.output = scope.files;
                            });
                        }
                    }, false);
                    xhr.open("POST", domain + "/oa/file/upload");
                    xhr.setRequestHeader("token", "admin");
                    xhr.send(fd)
                }

                function initEvents() {
                    scope.doSelectFiles = function () {
                        uploader.value = "";
                        uploader.click();
                    }
                    scope.doRemoveOutputFile = function (tempFile) {
                        scope.files.splice(scope.files.indexOf(tempFile), 1);
                    };
                    scope.doRemoveInputFile = function (tempFile) {
                        scope.input.splice(scope.input.indexOf(tempFile), 1);
                        scope.inputRemoved.push(tempFile.id)
                    };
                    uploader.onchange = function () {
                        files = [];
                        i = scope.files.length;
                        angular.forEach(uploader.files, function (file) {
                            console.log(file)
                            var tempFile = {
                                file: file,
                                name: file.name,
                                ext: file.type,
                                flagUpload: true,
                                size: (file.size < 1024 * 1024) ? (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB' : (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB',
                                flagSize: file.size > 15728640,
                                flagLoading: true
                            }
                            tempFile.index = scope.files.length
                            scope.$apply(function () {
                                scope.files.push(tempFile)
                            })
                            if (!tempFile.flagSize) {
                                fUpload(tempFile)
                            }
                        })
                    }
                }

                (function () {
                    initEvents()
                })();
            }
        }
    })
    .directive('cDatepicker', function ($filter, $ionicModal) {
        return {
            restrict: 'E',
            scope: {
                preset: '=',
                presetType: '@',
                inputSrc: '@',
                inputField: '@',
                output: '=',
                outputField: '@',
                display: '=',
                doChange: '&',
                type: '@'
            },
            template: '<button class="button button-clear button-balanced" ng-click="openModal()">{{output}}</button>',
            link: function (scope) {
                var dateObj, lastTailsLength = 0,
                    calendarDates = [],
                    prevDate = {},
                    modal;
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-datepicker.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (data) {
                    modal = data;
                });
                scope.openModal = function () {
                    modal.show();
                }
                scope.close = function () {
                    modal.hide();
                }
                scope.type = scope.type || 'date';
//				console.log(scope.preset)
                if (scope.preset) {
                    scope.output = $filter('date')(new Date(scope.output), scope.type == 'date' ?
                        'yyyy/MM/dd' : 'yyyy/MM/dd HH:mm:ss')
                    dateObj = new Date(scope.output)
                } else {
                    var newdate = new Date();
                    newdate.setSeconds(0);
                    scope.output = $filter('date')(newdate, scope.type == 'date' ? 'yyyy/MM/dd' : 'yyyy/MM/dd HH:mm:ss');
//					console.log(scope.output)
                    dateObj = new Date();
                    dateObj.setSeconds(0);
                }

                function getDateParts() {
                    scope.year = dateObj.getFullYear();
                    scope.month = dateObj.getMonth() + 1;
                    scope.date = dateObj.getDate();
                    scope.weeks = ["一", "二", "三", "四", "五", "六", "日"]
                    scope.hour = dateObj.getHours();
                    scope.minutes = dateObj.getMinutes();
                }

                getDateParts();

                function getLastDateOfMonth(month) {
                    switch (month) {
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            return 30;
                            break;
                        case 2:
                            return 29;
                            if (scope.year % 4 == 0 && scope.year % 100 != 0 || scope.year % 400 == 0)
                                return 28;
                            break;
                        default:
                            return 31;
                            break;
                    }
                }

                function getToday() {
                    var rowIndex = lastTailsLength + scope.date / 7,
                        colIndex = scope.date % 7
                    if (colIndex == 0) {
                        rowIndex--;
                        colIndex = 7;
                    }
                    calendarDates[rowIndex][colIndex].css = 'balanced-bg';
                }

                function genCalendar() {
                    dateObj.setDate(1)
                    calendarDates = [];
                    var lastDate = getLastDateOfMonth(scope.month),
                        weekDay = dateObj.getDay(),
                        weekDates = [];
                    weekDay == 0 && (weekDay = 7)
                    for (var i = 1; i < weekDay; i++) {
                        lastTailsLength++;
                        weekDates.push({})
                    }
                    calendarDates.push(weekDates);
                    for (i = 1; i <= lastDate; i++) {
                        if (weekDay > 7) {
                            weekDay = 1;
                            weekDates = [];
                            calendarDates.push(weekDates);
                        }
                        weekDay++;
                        var dateCell = {
                            date: i
                        };
                        if (i == scope.date) {
                            prevDate = dateCell;
                            dateCell.flagSelected = true;
                        }
                        weekDates.push(dateCell)
                    }
                    scope.calendarDates = calendarDates
                }

                genCalendar();
                scope.doMonth = function (month) {
                    if (month > 12) {
                        scope.year++;
                        dateObj.setYear(scope.year);
                        month = 1;
                    }
                    scope.month = month
                    dateObj.setMonth(month - 1);
                    genCalendar();
                }
                scope.doYear = function (year) {
                    scope.year = year;
                    dateObj.setYear(year);
                    genCalendar();
                }
                scope.doDate = function (item) {
                    prevDate.flagSelected = false;
                    prevDate = item;
                    prevDate.flagSelected = true;
                    scope.date = item.date;
                }
                scope.doConfirm = function (hour, minutes) {
                    modal.hide();
                    scope.output = scope.year + '/' +
                        (scope.month < 10 ? '0' + scope.month : scope.month) + '/' +
                        (scope.date < 10 ? '0' + scope.date : scope.date) + ' ' +
                        (hour < 10 ? '0' + hour : hour) + ':' +
                        (minutes < 10 ? '0' + minutes : minutes) + ':00'
                    scope.doChange && scope.doChange({
                        year: dateObj.getYear(),
                        month: scope.month,
                        date: scope.date,
                        dateStr: scope.output
                    })
                }
            }
        }
    })
    .directive('cForward', function ($filter) {
        return {
            restrict: 'E',
            scope: {
                logs: '=',
                output: '=',
                config: '@'
            },
            link: function (scope, element) {
                console.log(scope.logs);
                console.log(scope.config);
                var html = '',
                    json = [];
                angular.forEach(scope.logs, function (item) {
                    if (item.actionId == 2 && item.ext != '流程到此结束' && item.nodeId == scope.config) {
                        html += '<div class="m-b-sm"><div style="font-size: medium;">' + (item.message || '未填写审批意见') + '</div>' +
                            '<small>由 ' + item.name + ' 通过 &nbsp;&nbsp;&nbsp;' +
                            $filter('date')(item.createdDate, 'yyyy-MM-dd HH:mm:ss') +
                            '</small></div>'
                        json.push(item)
                    } else if (item.actionId == 3 && item.nodeId == scope.config) {
                        html += '<div class="m-b-sm"><div>' + (item.message || '未填写审批意见') + '</div>' +
                            '<small>由 ' + item.name + ' 拒绝 &nbsp;&nbsp;&nbsp;' +
                            $filter('date')(item.createdDate, 'yyyy-MM-dd HH:mm:ss') +
                            '</small></div>'
                        json.push(item)
                    } else if (item.actionId == 11 && item.nodeId == scope.config) {
                        html += '<div class="m-b-sm"><div>' + (item.resultData || '未填写审批意见') + '</div>' +
                            '<small>由 ' + item.name + ' 转发 &nbsp;&nbsp;&nbsp;' +
                            $filter('date')(item.createdDate, 'yyyy-MM-dd HH:mm:ss') +
                            '</small></div>'
                        json.push(item)
                    }
                });
                scope.output = angular.toJson(json);
                element.html(html);
            }
        }
    })
    //  .directive('cSql', function ($ionicModal, $http, $interpolate, $timeout) {
    //      return {
    //          restrict: 'E',
    //          template: '<button class="button button-balanced button-medium" ng-click="openModal()" ng-if="!flagSelect">选择数据</button>' +
    //          '<div ng-show="flagSelect">{{displayName}} &nbsp;<button class="button button-icon ion-close-circled button-close" ng-click="doRemove()"></button></div>',
    //          scope: {
    //              form: '=',
    //              output: '=',
    //              config: '@',
    //              preset: '=',
    //              src: '@'
    //          },
    //          link: function (scope) {
    //              var modal
    //                  , config
    //                  , sqlGetPage
    //                  , prevItem = {}
    //                  , flagReg
    //                  , page = 1
    //                  , size = 10
    //                  , sqlMainClean;
    //              console.log(scope.form);
    //              console.log(scope.output);
    //              console.log(scope.config);
    //              console.log(scope.preset);
    //              console.log(scope.src);
    //              $ionicModal.fromTemplateUrl('modules/components/templates/modal-sql.tpl.html', {
    //                  scope: scope,
    //                  animation: 'slide-in-up'
    //              }).then(function (data) {
    //                  modal = data;
    //              });
    //              function genGetPage() {
    //                  if (flagReg = (config.sqlMain.indexOf('{{') > -1)) {
    //                      sqlGetPage = $interpolate(config.sqlMain)(scope.form);
    //                  } else {
    //                      sqlGetPage = config.sqlMain
    //                  }
    //                  sqlGetPage += ' limit ' + size;
    //              }
    //
    //              function getPage(page) {
    //                  return sqlGetPage + ' offset ' + ((page - 1) * size);
    //              }
    //
    //              function initList() {
    //                  genGetPage();
    //                  $http.post(domain+'/oa/common/initSqlList', {
    //                      getPage: getPage(1),
    //                      getCount: config.sqlMainCount
    //                  }).success(function (data) {
    //                      $timeout(function () {
    //                          scope.flagMore = true;
    //                      },1000)
    //                      scope.list = data.list;
    //                      scope.size = data.count;
    //                  })
    //              }
    //
    //              function initConfig() {
    //                  config = JSON.parse(scope.config);
    //                  console.log(config)
    //                  sqlMainClean = config.sqlMain = config.sqlMain.replace(/@apos;/g, "'");
    //                  console.log(sqlMainClean)
    //                  config.sqlMainCount = config.sqlMainCount.replace(/@apos;/g, "'")
    //                  console.log(config.sqlMainCount)
    //                  initList();
    //                  scope.display = config.display;
    //                  if(scope.preset&&config.ctrl){
    //                      var displayField = config.ctrl.display
    //                          ,outputField = config.ctrl.model;
    //                      if(displayField==outputField){
    //                          scope.displayName = scope.preset;
    //                          scope.flagSelect = true;
    //                      } else {
    //                          var convertSrc = sqlMainClean.substring(sqlMainClean.indexOf('from')+5)
    //                              ,indexOfWhere = convertSrc.indexOf('where');
    //                          if(indexOfWhere>0){
    //                              convertSrc = convertSrc.substring(0,indexOfWhere);
    //                          }
    //                          console.log('/oa/ao/getFieldByField/'+convertSrc+'/'+
    //                              displayField+'/'+outputField+'/'+scope.preset);
    //                          $http.get('/oa/ao/getFieldByField/'+convertSrc+'/'+
    //                              displayField+'/'+outputField+'/'+scope.preset)
    //                              .success(function (data) {
    //                                  scope.displayName = data;
    //                                  scope.flagSelect = true;
    //                              })
    //                      }
    //                  }
    //                  var filters = [];
    //                  angular.forEach(config.display, function (item, index) {
    //                      filters.push({
    //                          id: index + 1,
    //                          name: item.name,
    //                          fieldName: item.sqlKey,
    //                          icon: ''
    //                      })
    //                  })
    //                  scope.filters = filters;
    //              }
    //
    //              function initModal() {
    //                  scope.close = function () {
    //                      modal.hide();
    //                  }
    //                  scope.openModal = function () {
    //                      flagReg && initList();
    //                      modal.show();
    //                  }
    //              }
    //
    //              scope.doSearch = function (condition) {
    //                  config.sqlMain = sqlMainClean;
    //                  var filter = [];
    //                  angular.forEach(scope.display, function (value, key) {
    //                      filter.push(value.sqlKey + ' like "' + condition + '"');
    //                  });
    //                  filter = filter.join(' or ')
    //                  console.log(config.sqlMain, filter)
    //                  if (filter) {
    //                      if (config.sqlMain.indexOf('where') < 0) {
    //                          config.sqlMain += ' where ' + filter
    //                      } else {
    //                          config.sqlMain += ' and ' + filter
    //                      }
    //                  }
    //                  initList();
    //              };
    //              scope.doPager = function () {
    //                  scope.flagMore = scope.list.length<scope.size;
    //                  page++
    //                  $http.post(domain+'/oa/common/getSqlList', {
    //                      getList: getPage(page)
    //                  }).success(function (data) {
    //                      scope.list = scope.list.concat(data);
    //                      scope.$broadcast('scroll.infiniteScrollComplete');
    //                  })
    //              };
    //              scope.doRemove = function () {
    //                  prevItem.flagSelected = false;
    //                  scope.output = undefined;
    //                  scope.flagSelect = false;
    //                  if (config.mapping) {
    //                      angular.forEach(config.mapping, function (item) {
    //                          scope.form[item.formKey] = undefined;
    //                      })
    //                  }
    //              };
    //              scope.doSelect = function (item) {
    //              	selectitems=item;
    //                  prevItem.flagSelected = true;
    //                  item.flagSelected = true;
    //                  prevItem = item;
    //              };
    //              scope.doConfirm = function () {
    //                  modal.hide();
    //                  scope.flagSelect = true;
    //                  scope.output = prevItem[config.ctrl.model];
    //                  console.log(scope.output)
    //                  scope.displayName = config.ctrl.display ? prevItem[config.ctrl.display] : scope.output;
    //                  if (config.mapping) {
    //                  	console.log(config.mapping);
    //                  	console.log(selectitems)
    //                      angular.forEach(config.mapping, function (item) {
    //                          scope.form[item.formKey] = prevItem[item.sqlKey]
    //                      })
    //                  }
    //              };
    //              (function () {
    //                  initConfig();
    //                  initModal();
    //              })()
    //          }
    //      }
    //})
    .directive('cSql', function ($ionicModal, $http, $interpolate) {
        return {
            restrict: 'E',
            template: '<button class="button button-balanced button-medium" ng-click="openModal()" ng-show="!flagSelect">选择数据</button>' +
            '<div ng-show="flagSelect">{{displayName}} &nbsp;<button class="button button-icon ion-close-circled button-close" ng-click="doRemove()"></button></div>',
            scope: {
                form: '=',
                parentForm: '=',
                output: '=',
                preset: '=',
                config: '@',
                src: '@',
                label: '@',
                index: '='
            },
            link: function (scope, ele) {
                var modal, config, sqlGetPage, sqlGetCount, prevItem = {},
                    flagReg, size = 100,
                    sqlMainClean, childData, getPage, initUrl, pageUrl, pk, getPayload, getPagePay, selectedItems = {},
                    selectedPks = {},
                    flagAllMap = {},
                    detailId, tableName, fields, range, alias = '',
                    curIndex;
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-sql.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (data) {
                    modal = data;
                });
                config = JSON.parse(scope.config);
                console.log(config);
                console.log(scope.flagMultiple);
                console.log(scope.parentForm);
                console.log(scope.form)
                scope.sqlInit = angular.copy(config.sqlMain);
                scope.sqlInitCount = angular.copy(config.sqlMainCount);
                scope.selectedPks = selectedPks;
                if (scope.flagMultiple = config.flagMultiple) {
                    console.log(ele[0].parentNode && ele[0].parentNode.dataset)
                    if (ele[0].parentNode && ele[0].parentNode.dataset) {
                        detailId = ele[0].parentNode.dataset.detail;
                    }
                    scope.selectAll = function (flagAll) {
                        if (flagAll) {
                            angular.forEach(scope.list, function (item, index) {
                                selectedPks[scope.page + '' + index] = flagAll;
                                selectedItems[scope.page + '' + index] = item;
                            })
                        }
                    };
                    scope.selectItem = function (flagItem, item, index) {
                        if (flagItem) {
                            selectedItems[scope.page + '' + index] = item;
                        } else {
                            delete selectedItems[scope.page + '' + index];
                        }
                        console.log(selectedItems);
                    }
                }
                scope.doSearch = function (condition) {
                    config.sqlMain = sqlMainClean;
                    var filter = [];
                    angular.forEach(condition, function (value, key) {
                        filter.push('ttt.' + key + " like '" + value + "'");
                    });
                    filter = filter.join(' or ');
                    if (filter) {
                        config.sqlMain = 'select ttt.* from (' + scope.sqlInit + ') ttt where ' + filter;
                        config.sqlMainCount = 'select count(1) from (' + scope.sqlInit + ') ttt where ' + filter;
                    }
                    initList1();
                }
                if (config.url) {
                    pk = config.ctrl.model;
                    config.sqlMain = config.sqlMain.replace(/["]/g, "'");
                    config.sqlMainCount = config.sqlMainCount.replace(/["]/g, "'");
                    var sqlMain = config.sqlMain,
                        whereIndex = sqlMain.indexOf('where');
                    tableName = sqlMain.substring(sqlMain.indexOf('from') + 5, whereIndex > -1 ? whereIndex : sqlMain.length);
                    if (sqlMain.indexOf('left') > -1)
                        alias = tableName.substring(tableName.indexOf(' '), tableName.indexOf('left')) + '.';
                    fields = sqlMain.substring(sqlMain.indexOf('select') + 7, sqlMain.indexOf('from'));
                    range = whereIndex > -1 ? sqlMain.substring(whereIndex, sqlMain.length) : '';
                    getPage = function (page) {
                        if (page > 1)
                            return 'select top 10 ' + fields + ' from ' + tableName + (range ? (range + ' and ') : ' where ') + alias + pk +
                                ' not in (select top ' + (page - 1) * 10 + ' ' + alias + pk + ' from ' + tableName + range + ' order by ' + alias + pk + ')';
                        else
                            return 'select top 10 * from (' + sqlGetPage + ') a';
                    };
                    console.log('select top 10 ' + fields + ' from ' + tableName + (range ? (range + ' and ') : ' where ') + alias + pk +
                        ' not in (select top ' + (2 - 1) * 10 + ' ' + alias + pk + ' from ' + tableName + range + ' order by ' + alias + pk + ')')
                    getPayload = function () {
                        return {
                            getPage: getPage(1),
                            getCount: sqlGetCount,
                            driver: config.driver,
                            url: config.url,
                            username: config.username,
                            password: config.password
                        }
                    };
                    getPagePay = function (page) {
                        return {
                            getList: getPage(page),
                            driver: config.driver,
                            url: config.url,
                            username: config.username,
                            password: config.password
                        }
                    }
                    initUrl = domain + '/oa/common/initDBMSList';
                    pageUrl = domain + '/oa/common/getDBMSList';
                } else {
                    getPage = function (page) {
                        return sqlGetPage + ' offset ' + ((page - 1) * size);
                    };
                    getPayload = function () {
                        return {
                            getPage: getPage(1),
                            getCount: sqlGetCount
                        }
                    };
                    getPagePay = function (page) {
                        return {
                            getList: getPage(page)
                        }
                    }
                    initUrl = domain + '/oa/common/initSqlList';
                    pageUrl = domain + '/oa/common/getSqlList';
                }

                function genGetPage() {
                    if (flagReg) {
                        if (scope.parentForm) {
                            var snapShotForm = angular.copy(scope.form);
                            sqlGetPage = $interpolate(scope.sqlInit)(angular.extend(snapShotForm, scope.parentForm));
                            sqlGetCount = $interpolate(scope.sqlInitCount)(angular.extend(snapShotForm, scope.parentForm));
                            console.log(sqlGetPage);
                            console.log(sqlGetCount);
                        } else {
                            sqlGetPage = $interpolate(scope.sqlInit)(scope.form);
                            sqlGetCount = $interpolate(scope.sqlInitCount)(scope.form);
                            console.log(sqlGetPage);
                            console.log(sqlGetCount);
                        }
                    } else {
                        sqlGetPage = scope.sqlInit
                        sqlGetCount = scope.sqlInitCount
                    }
                    sqlMainClean = sqlGetPage;
                    if (!config.url)
                        sqlGetPage += ' limit ' + size;
                }

                function genGetPage1() {
                    if (flagReg) {
                        if (scope.parentForm) {
                            var snapShotForm = angular.copy(scope.form);
                            sqlGetPage = $interpolate(config.sqlMain)(angular.extend(snapShotForm, scope.parentForm));
                            sqlGetCount = $interpolate(config.sqlMainCount)(angular.extend(snapShotForm, scope.parentForm));
                        } else {
                            sqlGetPage = $interpolate(config.sqlMain)(scope.form);
                            sqlGetCount = $interpolate(config.sqlMainCount)(scope.form);
                        }
                    } else {
                        sqlGetPage = config.sqlMain
                        sqlGetCount = config.sqlMainCount
                    }
                    sqlMainClean = sqlGetPage;
                    if (!config.url)
                        sqlGetPage += ' limit ' + size;
                }

                function initList() {
                    scope.page = 1;
                    genGetPage();
                    scope.list = false;
                    console.log(getPayload())
                    $http.post(initUrl, getPayload())
                        .success(function (data) {
                            console.log(data.list)
                            scope.list = data.list;
                            scope.size = data.count;
                            if (scope.list.length < data.count) {
                                scope.flagMore = true;
                            } else {
                                scope.flagMore = false;
                            }
                            if (scope.flagMore) {
                                scope.doPager = function () {
                                    var sqlGetPage_more = scope.sqlInit + ' limit ' + scope.size + ' offset 0';
                                    var more_post_data = {
                                        getCount: scope.sqlInitCount,
                                        getPage: sqlGetPage_more
                                    }
                                    $http.post(initUrl, more_post_data).success(function (data) {
                                        console.log(data)
                                        scope.flagMore = false;
                                        scope.list = data.list;
                                        scope.$broadcast('scroll.infiniteScrollComplete');
                                    }).error(function (data) {
                                        console.log(data);
                                    })
                                }
                            }
                            console.log(scope.list)
                        })
                }

                function initList1() {
                    scope.page = 1;
                    genGetPage1()
                    scope.list = false;
                    $http.post(initUrl, getPayload())
                        .success(function (data) {
                            scope.list = data.list;
                            scope.size = data.count;
                        })
                }

                function initConfig() {
                    sqlMainClean = scope.sqlInit = scope.sqlInit.replace(/@apos;/g, "'");
                    scope.sqlInitCount = scope.sqlInitCount.replace(/@apos;/g, "'");
                    console.log(sqlMainClean);
                    console.log(scope.sqlInitCount);
                    if (scope.sqlInit.indexOf('[[') > -1) {
                        flagReg = true;
                        scope.sqlInit = scope.sqlInit.replace(/\[\[/g, '"{{').replace(/]]/g, '}}"');
                        scope.sqlInitCount = scope.sqlInitCount.replace(/\[\[/g, '"{{').replace(/]]/g, '}}"');
                        console.log(scope.sqlInit);
                        console.log(scope.sqlInitCount);
                    }
                    if (scope.sqlInit.indexOf('{{') > -1) {
                        flagReg = true;
                    }
                    initList();
                    scope.display = config.display;
                    angular.forEach(config.display, function (value) {
                        scope.sqlFilter = value['sqlKey'];
                    })
                    console.log(scope.sqlFilter)
                    var displayField = config.ctrl.display,
                        outputField = config.ctrl.model;
                    if (displayField == outputField) {
                        scope.$watch('output', function (newVal) {
                            if (newVal) {
                                scope.flagSelect = true;
                                scope.output = scope.displayName = newVal;
                            } else {
                                scope.flagSelect = false;
                                scope.output = null;
                            }
                        })
                    }
                    if (scope.preset && config.ctrl) {
                        if (displayField == outputField) {
                            scope.displayName = scope.preset;
                            scope.flagSelect = true;
                        } else {
                            var convertSrc = sqlMainClean.substring(sqlMainClean.indexOf('from') + 5),
                                indexOfWhere = convertSrc.indexOf(' ');
                            if (indexOfWhere > 0) {
                                convertSrc = convertSrc.substring(0, indexOfWhere);
                            }
                            $http.get(domain + '/oa/ao/getFieldByField/' + convertSrc + '/' +
                                displayField + '/' + outputField + '/' + scope.preset)
                                .success(function (data) {
                                    scope.displayName = data;
                                    scope.flagSelect = true;
                                })
                        }
                    }
                    var filters = [];
                    angular.forEach(config.display, function (item, index) {
                        filters.push({
                            id: index + 1,
                            name: item.name,
                            fieldName: item.sqlKey,
                            icon: ''
                        })
                    })
                    scope.filters = filters;
                }

                function initModal() {
                    scope.close = function () {
                        modal.hide();
                    }
                    scope.openModal = function () {
                        initList();
                        modal.show();
                    }
                }

                scope.doRemove = function () {
                    prevItem.flagSelected = false;
                    scope.output = undefined;
                    scope.flagSelect = false;
                    if (config.mapping) {
                        angular.forEach(config.mapping, function (item) {
                            scope.form[item.formKey] = undefined;
                        })
                    }
                    if (config.flagSubMapping) {
                        angular.forEach(config.subMapping, function (subMapping) {
                            var formKey = subMapping.mapping[0].formKey,
                                sqlKey = subMapping.mapping[0].sqlKey
                            var detail = scope.form[subMapping.detailId];
                            angular.forEach(childData, function (item) {
                                for (var i = 0; i < detail.length; i++) {
                                    if (detail[i][formKey] == item[sqlKey]) {
                                        detail.splice(i, 1);
                                    }
                                }
                            })
                        })
                    }
                };
                scope.doSelect = function (item) {
                    prevItem.flagSelected = false;
                    item.flagSelected = true;
                    prevItem = item;
                };
                scope.doConfirm = function () {
                    modal.hide();
                    scope.flagSelect = true;
                    scope.output = prevItem[config.ctrl.model];
                    scope.displayName = config.ctrl.display ? prevItem[config.ctrl.display] : scope.output;
                    if (config.mapping) {
                        if (detailId && scope.parentForm) {
                            var index = scope.index;
                            angular.forEach(selectedItems, function (selectedItem) {
                                var detailItem = {}
                                angular.forEach(config.mapping, function (item) {
                                    detailItem[item.formKey] = selectedItem[item.sqlKey];
                                });
                                //scope.parentForm[detailId].push(detailItem);
                                scope.parentForm[detailId][index++] = detailItem;
                            })
                        } else {
                            angular.forEach(config.mapping, function (item) {
                                scope.form[item.formKey] = prevItem[item.sqlKey]
                            })
                            if (scope.form.suilv) {
                                scope.form.suilv = Number(scope.form.suilv);
                            }
                        }
                    }
                    if (config.flagSubMapping) {
                        $http.post(domain + '/oa/common/getSqlList', {
                            getList: config.sqlChildren,
                            condition: prevItem
                        })
                            .success(function (data) {
                                childData = data;
                                angular.forEach(config.subMapping, function (subMapping) {
                                    var detail = scope.form[subMapping.detailId]
                                    detail.length < 2 && (detail.splice(0, 1))
                                    angular.forEach(data, function (item) {
                                        var subItem = {};
                                        angular.forEach(subMapping.mapping, function (mapping) {
                                            subItem[mapping.formKey] = item[mapping.sqlKey]
                                        });
                                        detail.push(subItem)
                                    })
                                })
                            })
                    }
                };
                initConfig();
                initModal();
            }
        }
    })
    .directive('cDatafield', function ($ionicModal, $http) {
        return {
            restrict: 'E',
            template: '<button class="button button-balanced" ng-click="openModalDataTable()" ng-if="!cModel">选择数据</button>' +
            '<div ng-if="cModel">{{cModel}} &nbsp;<button class="button button-icon icon ion-close-circled" ng-click="eRemove()"></button></div>',
            scope: {
                cForm: '=',
                cModel: '=',
                mappings: '@',
                src: '@'
            },
            link: function (scope) {
                var mappings = JSON.parse(scope.mappings),
                    resultId,
                    titles = [],
                    ids = [],
                    fieldsMappings = [],
                    schema = {},
                    prev = {},
                    dbms = '',
                    parentData = {},
                    modalDataTable, filters = [];
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-datafield.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (data) {
                    modalDataTable = data;
                });

                function fSetMappings() {
                    angular.forEach(mappings.titles, function (title, index) {
                        filters.push({
                            id: index + 1,
                            name: title.value,
                            fieldName: title.key,
                            icon: ''
                        })
                        titles.push(title.value);
                        if (title.key)
                            ids.push(title.key);
                        if (title.ctrl) {
                            schema[title.key] = {
                                ctrl: title.ctrl
                            }
                            if (title.keyConfig)
                                schema[title.key].keyConfig = title.keyConfig;
                        }
                    });
                    scope.filters = filters;
                }

                scope.doSearch = function (condition) {
                    console.log(condition)
                    parentData.filter = null;
                    var filter = [];
                    angular.forEach(condition, function (value, key) {
                        filter.push(key + ' like "' + value + '"');
                    });
                    filter = filter.join(' or ');
                    filter &&
                    (parentData.filter = mappings.refConfig ? mappings.refConfig.parentWhere + ' and ' + filter : filter);
                    initList();
                }

                function fSetTitles() {
                    angular.forEach(mappings.mappings, function (mapping) {
                        fieldsMappings[mapping.dataId] = mapping.distId;
                    });
                }

                function initConfig() {
                    fSetTitles();
                    fSetMappings();
                }

                function fInitParentData() {
                    parentData = {
                        tableName: mappings.isSys ? mappings.src : '_app_' + mappings.src,
                        //offset: 0,
                        //limit: 10,
                        fields: ids + ''
                    }
                    if (mappings.cors) {
                        dbms = '/dbms';
                        parentData.driver = mappings.database.driver;
                        parentData.url = mappings.database.url;
                        parentData.username = mappings.database.username;
                        parentData.password = mappings.database.password;
                        parentData.tableName = mappings.database.tableName;
                    }
                    if (mappings.ref) {
                        parentData.sequence = mappings.refConfig.primaryKey;
                        parentData.filter = mappings.refConfig.parentWhere || null;
                        parentData.tableName = mappings.refConfig.parentSrc;
                        if (mappings.refConfig.flagMultiRef) {
                            var arr = []
                            angular.forEach(mappings.refConfig.parentChildRefs, function (ref) {
                                if (ids.indexOf(ref.primaryKey) < 0) {
                                    arr.push(ref.primaryKey)
                                }
                            })
                            if (arr.length) {
                                parentData.fields = ids + ',' + arr
                            }
                        } else {
                            if (ids.indexOf(mappings.refConfig.primaryKey) < 0) {
                                parentData.fields = ids + ',' + mappings.refConfig.primaryKey
                            }
                        }
                    }
                }

                function fSetChildData() {
                    var tempData = angular.copy(parentData);
                    tempData.tableName = mappings.refConfig.childSrc;
                    tempData.sequence = mappings.refConfig.parentKey;
                    var fields = [];
                    angular.forEach(mappings.mappings, function (mapping, index) {
                        fields.push(mapping.dataId);
                    });
                    if (mappings.refConfig.flagMultiRef) {
                        var filter = []
                        angular.forEach(mappings.refConfig.parentChildRefs, function (ref) {
                            filter.push(ref.parentKey + "='" + prev[ref.primaryKey] + "'");
                        })
                        tempData.filter = filter.join(' and ');
                    } else {
                        tempData.filter = (mappings.refConfig.parentKey + '=\'' + prev[mappings.refConfig.primaryKey] + "'");
                    }
                    tempData.fields = fields + '';
                    return tempData;
                }

                function initList() {
                    $http({
                        url: domain + '/oa/common/jdbc' + dbms,
                        data: parentData,
                        method: 'POST'
                    })
                        .success(function (data) {
                            scope.size = data.size;
                            scope.list = data.list;
                        })
                }

                function initParentList() {
                    fInitParentData();
                    initList();
                }

                function initEvents() {
                    scope.doPager = function (page) {
                        parentData.offset = (page - 1) * 10;
                        $http({
                            url: domain + '/oa/common/jdbc' + dbms + '/page',
                            data: parentData,
                            method: 'POST'
                        })
                            .success(function (data) {
                                scope.list = data;
                            })
                    }
                    scope.doSelect = function (tempData) {
                        tempData.flagSelected = !tempData.flagSelected;
                        prev.flagSelected = !prev.flagSelected;
                        prev = tempData;
                    };

                    scope.eRemove = function () {
                        scope.flagSelect = false;
                        prev.flagSelected = !prev.flagSelected;
                        scope.cModel = undefined;
                        prev = {};
                        console.log(scope.cModel)
                        if (mappings.ref) {
                            scope.cForm[mappings.detailId] = [];
                        } else {
                            for (var dataId in fieldsMappings) {
                                scope.cForm[fieldsMappings[dataId]] = undefined;
                            }
                        }
                    }
                    scope.openModalDataTable = function () {
                        modalDataTable.show();
                        if (!scope.doConfirm)
                            scope.doConfirm = function () {
                                if (mappings.ref) {
                                    scope.flagSelect = true;
                                    var childData = fSetChildData()
                                    $http({
                                        url: '/oa/common/jdbc' + dbms + '/page',
                                        data: childData,
                                        method: 'POST'
                                    })
                                        .success(function (data) {
                                            var tempDetail = [];
                                            if (data.length > 0) {
                                                for (var i = 0; i < data.length; i++) {
                                                    var tempDetailRecord = {}
                                                    angular.forEach(mappings.mappings, function (mapping) {
                                                        tempDetailRecord[mapping.distId] = data[i][mapping.dataId];
                                                    })
                                                    tempDetail.push(tempDetailRecord)
                                                }
                                                console.debug(tempDetail, scope.cForm, "tempDetail")
                                                scope.cForm[mappings.detailId] = tempDetail;
                                            }
                                        })
                                } else {
                                    for (var dataId in fieldsMappings) {
                                        scope.cForm[fieldsMappings[dataId]] = prev[dataId];
                                    }
                                    scope.flagSelect = true;
                                }
                                scope.cModel = prev[mappings.dataId];
                                modalDataTable.hide();
                            }
                        if (!scope.cancel)
                            scope.cancel = function () {
                                modalDataTable.hide();
                            }
                    };
                }

                function initScope() {
                    scope.filter = {
                        title: titles[0],
                        field: ids[0]
                    };
                    scope.titles = titles;
                    scope.ids = ids;
                    scope.schema = schema;
                    scope.pager = {
                        page: 0,
                        size: 10
                    };
                }

                (function () {
                    initConfig();
                    initParentList();
                    initScope();
                    initEvents();
                })()
            }
        }
    })
    .directive('cDictionary', function ($http) {
        return {
            restrict: 'E',
            scope: {
                preset: '=',
                presetType: '@',
                inputSrc: '@',
                inputField: '@',
                output: '=',
                outputField: '@',
                display: '=',
                label: '@'
            },
            template: '<select ng-model="output" ng-options="item.id as item.t_value for item in list"></select>',
            link: function (scope) {
                scope.outputField = scope.outputField || 'id';
                $http.get(domain + '/oa/common/dictionary/id/' + scope.inputSrc).success(function (data) {
                    scope.list = data;
                    if (scope.preset) {
                        for (var i = 0; i < scope.list.length; i++) {
                            var item = scope.list[i]
                            if (scope.preset == item[scope.outputField]) {
                                scope.output = item[scope.outputField];
                                scope.displayTemplate = item.t_value;
                                break;
                            }
                        }
                    } else {
                        scope.output = item.id;
                    }
                })
            }
        }
    })
    .directive('cCalculator', function () {
        return {
            restrict: 'E',
            scope: {
                calculation: '@',
                cForm: '=',
                cModel: '='
            },
            template: '<div>{{cModel}}</div>',
            link: function (scope, ele) {
                var parentEle = ele.parent().parent().parent().parent().parent();
                console.log(parentEle)
                var calculations = [
                    function (x, y) {
                        return x + y;
                    },
                    function (x, y) {
                        return x - y;
                    },
                    function (x, y) {
                        return x * y;
                    },
                    function (x, y) {
                        return x / y;
                    }
                ];
                if (scope.calculation) {
                    var CalArr = scope.calculation.split(','),
                        flagFloat = false,
                        tempResult;
                    scope.cModel = tempResult = 0;
                    parentEle[0].addEventListener("click", function () {
                        scope.$apply(function () {
                            scope.cModel = calculate();
                        })
                        console.log(scope.cForm, scope.cForm[CalArr[0]], scope.cForm[CalArr[2]])
                    });

                    function calculate() {
                        if (scope.cForm[CalArr[0]] != undefined && scope.cForm[CalArr[2]] != undefined) {
                            tempResult = calculations[CalArr[1]](parseFloat(scope.cForm[CalArr[0]]),
                                parseFloat(scope.cForm[CalArr[2]]))
                        }
                        if (CalArr[0].split('.')[1] || CalArr[2].split('.'))
                            flagFloat = true;
                        if (CalArr.length > 4) {
                            for (var i = 3; i < CalArr.length; i += 2) {
                                if (CalArr[i] != '')
                                    tempResult = calculations[CalArr[i]](tempResult, scope.cForm[CalArr[i + 1]]);
                                if (CalArr[i + 1].split('.')[1])
                                    flagFloat = true;
                            }
                        }
                        if (flagFloat)
                            tempResult = parseFloat(tempResult).toFixed(2)
                        return tempResult;
                    }
                }
            }
        }
    })
    .directive('cSum', function ($sum) {
        return {
            restrict: 'E',
            scope: {
                form: '=',
                detail: '@',
                detailId: '@',
                fieldId: '@',
                cModel: '='
            },
            template: '<div>{{result}}</div>',
            link: function (scope, element) {
                if ($sum.details.indexOf(scope.detailId) < 0) {
                    $sum.details.push(scope.detailId);
                    $sum[scope.detailId] = [];
                }
                $sum[scope.detailId].push(
                    function () {
                        var result = 0;
                        angular.forEach(scope.form[scope.detailId], function (row) {
                            result += Number(row[scope.fieldId]);
                        });
                        scope.result = isNaN(result) ? 0 : result;
                        scope.cModel = scope.result || 0;
                    })

                function sum() {
                    if (scope.form && scope.detail) {
                        var detail = scope.detail.split(',')
                        var detailId = detail[0];
                        var fieldId = detail[1];
                        var flagFloat = false;
                        var result = 0;
                        for (var i = 0; i < scope.form[detailId].length; i++) {
                            if (scope.form[detailId][i][fieldId].toString().split('.')[1]) {
                                flagFloat = true;
                                result += parseFloat(scope.form[detailId][i][fieldId]);
                            } else {
                                result += parseInt(scope.form[detailId][i][fieldId]);
                            }
                        }
                        scope.$apply(function () {
                            scope.cModel = scope.result = flagFloat ? parseFloat(result).toFixed(2) : result;
                        })
                    } else {
                        scope.cModel = scope.result = 0;
                    }
                }

                scope.eSum = function () {
                    sum();
                }
            }
        }
    })
    .directive('cDiff', function () {
        return {
            restrict: 'E',
            scope: {
                cModel: '=',
                startRef: '=',
                endRef: '=',
                unit: '@'
            },
            template: '<div>{{difference}}</div>',
            link: function (scope) {
                var fSetDiff = function (startRef, endRef) {
                    startRef = startRef.replace(/\-/g, "/");
                    endRef = endRef.replace(/\-/g, "/");
                    var startDate = new Date(startRef).getTime();
                    var endDate = new Date(endRef).getTime();
                    var unit = scope.unit || 'day';
                    if (startDate > endDate)
                        scope.difference = '开始时间不得大于结束时间'
                    else if (unit == 'day') {
                        scope.cModel = Math.ceil((endDate - startDate) / 86400000);
                        isNaN(scope.cModel) && (scope.cModel = 0)
                        scope.difference = scope.cModel + '天';
                    } else if (unit == 'hour') {
                        scope.cModel = parseInt((endDate - startDate) / 3600000);
                        scope.difference = scope.cModel + '小时';
                    } else if (unit == 'minute') {
                        scope.cModel = parseInt((endDate - startDate) / 60000);
                        scope.difference = scope.cModel + '分钟';
                    }
                }
                scope.$watch('startRef', function (newValue, oldValue) {
                    fSetDiff(newValue, scope.endRef)
                });
                scope.$watch('endRef', function (newValue, oldValue) {
                    fSetDiff(scope.startRef, newValue)
                });
            }
        }
    })
    .directive('cSequence', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                output: '=',
                inputSrc: '=',
                module: '=',
                format: '@'
            },
            template: '<span ng-bind="output"></span>',
            link: function (scope) {
                $http.post(domain + '/oa/common/flowingId', {
                    tableKey: '_app_' + scope.module.tableKey,
                    objectId: scope.module.id,
                    format: scope.format
                }).success(function (data) {
                    scope.output = data;
                })
            }
        }
    })
    .directive('vField', function ($http) {
        return {
            restrict: 'E',
            scope: {
                outputSrc: '@',
                outputField: '@',
                inputId: '@',
                inputIds: '@',
                multiple: '@'
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                if (scope.outputSrc == 'departments') scope.outputSrc = 'groups'
                if (scope.multiple) {
                    if (scope.inputIds) {
                        $http({
                            method: 'POST',
                            data: {
                                ids: scope.inputIds
                            },
                            url: domain + '/oa/common/src/' + scope.outputSrc + '/field/' + scope.outputField + '/ids'
                        }).success(function (data) {
                            scope.output = data + '';
                        })
                    }
                } else {
                    if (scope.inputId) {
                        $http.get(domain + '/oa/common/src/' + scope.outputSrc + '/field/' + scope.outputField + '/id/' + scope.inputId).success(function (data) {
                            scope.output = data + '';
                        })
                    }
                }
            }
        }
    })
    .directive('vInfo', function ($http) {
        return {
            restrict: 'E',
            scope: {
                input: '=',
                convertType: '@'
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                if (scope.input) {
                    var src;
                    if (scope.convertType == 'name') scope.output = scope.input
                    else {
                        if (scope.convertType == 'department' ||
                            scope.convertType == 'departments') src = 'groups'
                        else if (scope.convertType == 'job') src = 'roles'
                        else src = scope.convertType
                        $http.get(domain + '/oa/common/name/' + src + '/id/' + scope.input)
                            .success(function (data) {
                                scope.output = data;
                            })
                    }
                }
            }
        }
    })
    .directive('cSign', function ($http, $ionicModal, Util) {
        return {
            restrict: 'E',
            scope: {
                output: '=',
                contentId: '@'
            },
            template: '<button class="button button-balanced icon ion-edit" ng-click="openModal()"></button>' +
            '<img src="" id="signImg" alt="" width="48" height="48" style="border: 1px solid;"/>',
            link: function (scope, ele) {
                var canvas, ctx, color = "#000",
                    modal, signImg = ele.find('img')[0];
                $ionicModal.fromTemplateUrl('modules/components/templates/modal-sign.tpl.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (data) {
                    modal = data;
                });
                scope.close = function () {
                    modal.hide();
                }
                scope.openModal = function () {
                    modal.show();
                    setTimeout(function () {
                        newCanvas();
                    }, 1000);
                };
                scope.doReset = function () {
                    newCanvas();
                }

                function newCanvas() {
                    //define and resize canvas
                    document.getElementById("content" + scope.contentId).style.height = window.innerHeight - 90;
                    var canvas = '<canvas id="canvas' + scope.contentId + '" width="' + window.innerWidth + '" height="' + (window.innerHeight - 90) + '"></canvas>';
                    document.getElementById("content" + scope.contentId).innerHTML = canvas;

                    // setup canvas
                    canvas = document.getElementById("canvas" + scope.contentId)
                    ctx = canvas.getContext("2d");
                    ctx.font = "24px Arial";
                    ctx.fillText('签名人：' + userInfo.name, 10, 30);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 3;

                    // setup to trigger drawing on mouse or touch
                    drawTouch();

                    scope.doSign = function () {
                        var base64 = canvas.toDataURL("image/png");
                        uploadImg(base64);
                        signImg.src = base64;
                        modal.hide();
                    }
                }

                function uploadImg(base64) {
                    var formData = new FormData();
                    formData.append('file',
                        Util.convertBase64ToBlob(base64));
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', domain + '/circle/handwrite', true);
                    xhr.setRequestHeader("token", "admin");
                    xhr.send(formData);
                    xhr.addEventListener("load", function (evt) {
                        scope.$apply(function () {
                            scope.output = evt.currentTarget.response;
                        })
                    }, false);
                }

                // prototype to	start drawing on touch using canvas moveTo and lineTo
                function drawTouch() {
                    var start = function (e) {
                        ctx.beginPath();
                        x = e.changedTouches[0].pageX;
                        y = e.changedTouches[0].pageY - 44;
                        ctx.moveTo(x, y);
                    };
                    var move = function (e) {
                        e.preventDefault();
                        x = e.changedTouches[0].pageX;
                        y = e.changedTouches[0].pageY - 44;
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    };
                    document.getElementById("canvas" + scope.contentId).addEventListener("touchstart", start, false);
                    document.getElementById("canvas" + scope.contentId).addEventListener("touchmove", move, false);
                };
            }
        }
    })
    .directive('cIdmap', function ($http) {
        return {
            restrict: 'E',
            scope: {
                input: '=',
                inputSrc: '@'
            },
            template: '<span>{{output}}</span>',
            link: function (scope) {
                var src = scope.inputSrc;
                scope.input && getValue(src);
                scope.$watch('input', function (newVal, oldVal) {
                    newVal != oldVal && getValue(src)
                })

                function getValue(src) {
                    console.log(src)
                    src == 'dictionary' ?
                        $http({
                            url: domain + '/oa/common/src/' + src + '/field/' + field + '/id/' + id
                        }).success(function (data) {
                            scope.display = scope.output = data + '';
                        }) :
                        $http({
                            url: domain + '/oa/common/map/' + src,
                            data: {
                                keys: scope.input
                            },
                            method: 'POST'
                        }).success(function (data) {
                            var arr = [];
                            angular.forEach(data.names, function (item) {
                                arr.push(item.name)
                            })
                            scope.output = arr + '';
                        })
                }
            }
        }
    }).directive('cCheckboxes', function () {
    return {
        restrict: 'E',
        scope: {
            output: '=',
            preset: '=',
            options: '@'
        },
        templateUrl: 'modules/components/templates/template-checkboxes.tpl.html',
        link: function (scope) {
            if (scope.options) {
                scope.checkboxes = scope.isArray ? scope.options : scope.options.split(',');
                var results = [];
                scope.checkFlags = [];
                if (scope.preset) {
                    scope.output = scope.preset;
                    var presetOptions = scope.preset.split(',');
                    angular.forEach(scope.checkboxes, function (checkbox, index) {
                        for (var i = 0; i < presetOptions.length; i++) {
                            if (presetOptions[i] == checkbox) {
                                scope.checkFlags[index] = true;
                                results.push(scope.checkboxes[index])
                            }
                        }
                    })
                }
                scope.eCheck = function (index) {
                    //scope.checkFlags[index] = !scope.checkFlags[index];
                    if (scope.checkFlags[index]) {
                        results.push(scope.checkboxes[index])
                    } else {
                        results.splice(results.indexOf(scope.checkboxes[index]), 1)
                    }
                    scope.output = results + '';
                }
            }

        }
    }
})
    .directive('cLogs', function ($filter) {
        return {
            restrict: 'E',
            scope: {
                logs: '=',
                output: '='
            },
            link: function (scope, element) {
                var html = '',
                    json = [];
                angular.forEach(scope.logs, function (item) {
                    if (item.actionId == 2) {
                        html += '<div class="m-b-sm"><div style="font-size: medium;">' + (item.message || '通过') + '</div>' +
                            '<small>由 ' + item.name + ' 通过 &nbsp;&nbsp;&nbsp;' +
                            $filter('date')(item.createdDate, 'yyyy-MM-dd HH:mm:ss') +
                            '</small></div>'
                        json.push(item)
                    } else if (item.actionId == 3) {
                        html += '<div class="m-b-sm"><div>' + (item.message || '拒绝') + '</div>' +
                            '<small>由 ' + item.name + ' 拒绝 &nbsp;&nbsp;&nbsp;' +
                            $filter('date')(item.createdDate, 'yyyy-MM-dd HH:mm:ss') +
                            '</small></div>'
                        json.push(item)
                    }
                });
                scope.output = angular.toJson(json);
                element.html(html);
            }
        }
    })
    .filter('comments', function ($interpolate) {
        return function (input) {
            var output = '';
            if (input && input.indexOf('{') > -1) {
                var bundle = JSON.parse(input);
                angular.forEach(bundle.comments, function (item) {
                    output += $interpolate('<div><div style="font-size: medium;margin-bottom: -5px">{{message}}</div>' +
                        '<small style="font-size: 12px">{{name}} {{date}}</small></div>')(item);
                })
                if (bundle.signImg) {
                    output += '<img width="60px" height="60px" src="' + domain + '/upload/signs/ori_' + bundle.signImg + '"/>'
                }
            }
            return output;
        }
    })
    .filter('unitDate', function () {
        var map = {
            day: '天',
            hour: '小时',
            minute: '分钟'
        }
        return function (input, unit) {
            if (input)
                return input + (map[unit] || '');
        }
    })
    .filter('prosRef', function ($interpolate) {
        return function (input) {
            var output = input;
            if (input && input.indexOf('{') > -1) {
                output = ''
                var pros = JSON.parse(input);
                angular.forEach(pros, function (pro) {
                    output += $interpolate('<div><a href="#/main/proView/{{proId}}" target="_blank">' +
                        '<strong>{{name}}</strong> <small>{{creator}} {{date}}</small></a></div>')(pro);
                })
            }
            return output;
        }
    })

    .filter('carMap', function () {
        return function (input, query) {
            var output = [];
            angular.forEach(input, function (v) {
                if (v.t_value) {
                    if (v.t_value.indexOf(query) > -1 || !query) {
                        output.push(v);
                    }
                } else if (v.resName) {
                    if (v.resName.indexOf(query) > -1 || !query) {
                        output.push(v);
                    }
                }
            })
            return output;
        }
    })
    .filter('userMap', function () {
        return function (input, query) {
            var output = [];
            angular.forEach(input, function (v) {
                if (v.name) {
                    if (v.name.indexOf(query) > -1 || !query) {
                        output.push(v);
                    }
                } else if (v.login_name) {
                    if (v.login_name.indexOf(query) > -1 || !query) {
                        output.push(v);
                    }
                }
            })
            return output;
        }
    })
    .filter('sqlQuery', function () {
        return function (input, query1, query2) {
            console.log(input)
            console.log(query2)
            var output = [];
            angular.forEach(input, function (v) {
                console.log(v[query2])
                if (!query1) {
                    output.push(v);
                } else {
                    var a = ''
                    if (typeof v[query2] != 'string') {
                        a = v[query2].toString()
                    } else {
                        a = v[query2]
                    }
                    if (a.indexOf(query1) > -1) {
                        output.push(v);
                    }
                }
            })
            return output;
        }
    })