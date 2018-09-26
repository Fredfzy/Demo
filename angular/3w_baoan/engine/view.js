/**
 * Created by qin on 2016/8/14.
 */
angular.module('oa')
    .service('$detail', function () {
        this.flagPreRemove = false;
        this.preRemoveDetailMap = {};
    })
    .service('$formula', function () {
        this.detailsMap = {};
        this.formulaMap = {};
    })
    .service('$sum', function () {
        this.details = [];
    })
    .service('$form', function ($filter, $interpolate, $compile, $sum, $formula, $detail) {
        var ctrlRef = {
            'text': '<div id="{{id}}" class="item item-input"><span class="input-label">{{name}}</span><input type="text" ng-model="formData.{{id}}" placeholder="在此输入{{name}}"></div>',
            'decoration': ' <div id="{{id}}" class="item item-input"><span class="input-label">{{name}}</span><i class="placeholder-icon">{{prefix}}</i><input type="text" ng-model="formData.{{id}}"><i class="placeholder-icon" style="margin-right:50px">{{suffix}}</i></div>',
            'textarea': '<div id="{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><textarea rows="5" preset="formData.{{id}}" ng-model="formData.{{id}}"></textarea></div>',
            'sign': '<div id="{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><c-sign preset="formData.{{id}}" output="formData.{{id}}"  content-id="{{id}}"></c-sign></div>',
            'number': '<div id="{{detailId}}{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><input ng-init="formData.{{id}}?formData.{{id}}=formData.{{id}}-0:null" type="number" ng-model="formData.{{id}}" placeholder="在此输入{{name}}"></div>',
            'currency': '<div id="{{detailId}}{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><i class="icon ion-social-yen placeholder-icon"></i><input type="number" ng-model="formData.{{id}}"></div>',
            'rmb': '<div id="{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><c-rmb ref-field="formData.{{config}}" output="formData.{{id}}" ref-field-id="{{config}}"></c-rmb></div>',
            'calculator': '<div id="{{id}}" class="item item-input cal"><span class="input-label">{{name}}</span><c-calculator c-model="formData.{{id}}" c-form="formData" calculation="{{config}}"></c-calculator></div>',
//          'formula': ' <div id="{{detailId}}{{id}}" class="item item-input"><span class="input-label">{{name}}</span><c-formula cur-field-id="{{id}}" formula="{{config}}" form="formData" output="formData.{{id}}" detail-id="{{detailId}}" index="index"></c-formula></div>',
            'formula': ' <div id="{{detailId}}{{id}}" class="item item-input"><span class="input-label">{{name}}</span><c-formula cur-field-id="{{id}}" formula="{{config}}" form="formData" output="formData.{{id}}" detail-id="{{detailId}}" index="index"></c-formula></div>',
            'sum': '<div id="{{id}}" class="item item-input"><span class="input-label">{{name}}</span><c-sum c-model="formData.{{id}}" form="formData" form-detail="formData.{{detailId}}" detail="{{config}}" detail-id="{{detailId}}" field-id="{{fieldId}}" cur-id="{{id}}"></c-sum></div>',
            'datetime': '<div class="item item-input"><span class="input-label">{{name}}</span><c-datepicker type="{{config}}" preset="formData.{{id}}" output="formData.{{id}}"></c-datepicker></div>',
            'datediff': '<div class="item item-input"><span class="input-label">{{name}}</span> <c-diff c-model="formData.{{id}}" start-ref="formData.{{startRef}}" end-ref="formData.{{endRef}}" unit="{{config}}"></c-diff></div>',
            'select': '<c-select label="{{name}}" preset="formData.{{id}}" preset-field="id" input-src="{{config}}" display-field="name" output="formData.{{id}}" output-field="id"></c-select>',
            'multiselect': '<c-select preset="formData.{{id}}" preset-type="str" input-src="{{config}}" display-field="name" output="formData.{{id}}" output-field="id" output-type="str" multiple="true" label="{{name}}"></c-select>',
            'checkboxes': '<div class="item item-input"><span class="input-label">{{name}}</span><c-checkboxes options="{{config}}" preset="formData.{{id}}" output="formData.{{id}}"></c-checkboxes></div>',
            'dictionary': '<c-select label="{{name}}" preset="formData.{{id}}" preset-field="id" input-src="dic" input="{{config}}" display-field="t_value" output="formData.{{id}}" output-field="id"></c-select>',
            'workflows': '<div class="item item-input"><span class="input-label">{{name}}</span><c-workflows output="formData.{{id}}"></c-workflows></div>',
//            'workflows': '<c-workflows output="formData.{{id}}"></c-workflows>',
            'user': '<c-users label="{{name}}" preset="formData.{{id}}" output="formData.{{id}}" output-field="id"></c-users>',
            'readonly': '<div id="{{id}}" class="item item-input"><span class="input-label">{{name}}</span><c-readonly output="formData.{{id}}" flag-convert="{{flagConvert}}" convert-src="{{convertSrc}}" output-field="{{outputField}}" display-field="{{displayField}}"></c-readonly></div>',
            'readnum': '<div id="{{id}}" class="item item-input"><span class="input-label">{{name}}</span><c-readnum output="formData.{{id}}" field-id="{{id}}"></c-readnum></div>',
            'users': '<c-users label="{{name}}" preset="formData.{{id}}" preset-type="str" output="formData.{{id}}" output-type="str" multiple="true" output-field="id"></c-users>',
            'dataselect': '<div class="item item-input"><span class="input-label">{{name}}</span><c-datafield mappings=' + "'{{config}}'" + ' c-model="formData.{{id}}" c-form="formData"></c-datafield></div>',
            'sql': '<div class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><c-sql preset="formData.{{id}}" output="formData.{{id}}" index="$index" config=' + "'\{{config}}\'" + ' form="formData" parent-form="$parent.formData"></c-sql></div>',
            'upload': '<div class="item item-divider light-bg">{{name}}</div><c-upload preset="formData.{{id}}" output="formData.{{id}}"></c-upload>',
            'sequence': '<div class="item item-input"><span class="input-label">{{name}}</span><c-sequence module="module" output="formData.{{id}}" format="{{config}}"></c-sequence></div>',
            'info': '<div class="item item-input"><span class="input-label">{{name}}</span><c-info output="formData.{{id}}" input-src="{{config}}"></c-info></div>',
            'idmap': '<div class="item item-input"><span class="input-label">{{name}}</span><c-idmap src="{{config}}" input="formData.{{id}}"></c-idmap></div>',
            'current': '<div class="item item-input"><span class="input-label">{{name}}</span><c-current output="formData.{{id}}"></c-current></div>',
            'comments': '<div class="item item-input"><span class="input-label">{{name}}</span><div ng-bind-html="(formData.{{id}}|comments)"></div></div>',
            report: '<div id="{{id}}" class="item item-input item-stacked-label"><span class="input-label">{{name}}</span><c-report label="{{name}}" output="formData.{{id}}" mod-id="{{modId}}" mappings=\'{{mappings}}\' form="formData" output-field="{{outputField}}" display-field="{{displayField}}" flag-access="{{flagAccess}}" flag-detail-mappings="{{flagDetailMappings}}" range-sql="{{rangeSql}}" detail-mappings=\'{{detailMappings}}\'"></c-report></div>',
            'checkbox': '<div class="item item-input"><span class="input-label">{{name}}</span><c-checkbox output="formData.{{id}}"></c-checkbox></div>'
        };
        var viewRef = {
            'text': '<div ng-bind="formData.{{id}}" style="margin-left: 0px;white-space: normal"></div>',
            number: '<span ng-bind="formData.{{id}}"></span>',
            textarea: '<pre class="ctrl-textarea" ng-bind-html="formData.{{id}}"></pre>',
            'info': '<c-convert convert-src="{{config}}" from="formData.{{id}}"></c-convert>',
            'decoration': '<span ng-bind="' + "'{{config.split(',')[0]}}'+(formData.{{id}}||'')+'{{config.split(',')[1]}}'" + '"></span>',
            'currency': '<span ng-bind="formData.{{id}}|currency:' + "'￥'" + '"></span>',
            'rmb': '<span ng-bind="formData.{{id}}|rmb"></span>',
            'datetime': '<span ng-bind="formData.{{id}}" ng-init="formData.{{id}}=(formData.{{id}}|date:' + "'yyyy-MM-dd HH:mm:ss')" + '"></span>',
            'current': '<span ng-bind="formData.{{id}}" ng-init="formData.{{id}}=(formData.{{id}}|date:' + "'yyyy-MM-dd HH:mm:ss')" + '"></span>',
            'select': '<c-convert convert-src="{{config}}" from="formData.{{id}}"></c-convert>',
            'idmap': '<c-convert convert-src="{{config}}" from="formData.{{id}}"></c-convert>',
            'user': '<c-convert convert-src="user" from="formData.{{id}}"></c-convert>',
            'multiselect': '<c-convert convert-src="{{config}}" from="formData.{{id}}" multiple="true"></c-convert>',
            'users': '<c-convert convert-src="user" from="formData.{{id}}" multiple="true"></c-convert>',
            'dictionary': '<c-convert convert-src="dic" from="formData.{{id}}"></c-convert>',
            'sign': '<c-sign-view sign-src="formData.{{id}}"/>',
            'upload': '<v-files input="formData.{{id}}"></v-files>',
            'workflows': '<div ng-bind-html="(formData.{{id}}|prosRef)"></div>',
            'comments': '<div style="font-size: medium" ng-bind-html="(formData.{{id}}|comments)"></div><div ng-if="currentNodeId==' + "'{{config}}'" +
            '" ng-init="flagComments.push(' + "'{{id}}')" + '"></div>',
            'checkbox': '<i ng-class="{\'icon ion-check\':formData.{{id}}}"></i>',
            'sql': '<v-sql sql-main="{{config.sqlMain}}" driver="{{config.driver}}" url="{{config.url}}" username="{{config.username}}" password="{{config.password}}" output="formData.{{id}}" output-field="{{config.ctrl.model}}" display-field="{{config.ctrl.display}}"></v-sql>',
            'readnum': '<span ng-bind="formData.{{id}}"></span>',
            'readonly': '<c-readonly output="formData.{{id}}" flag-convert="{{flagConvert}}" convert-src="{{convertSrc}}" output-field="{{outputField}}" display-field="{{displayField}}"></c-readonly>',
            'logs': '<div ng-init="flagLogs=' + "'{{id}}'" + '"></div><c-logs ng-if="logs" output="formData.{{id}}" logs="logs"></c-logs>',
            'datediff': '<span ng-bind="formData.{{id}}|unitDate:' + "'{{config.split(',')[config.split(',').length-1]}}'" + '"></span>',
        };
        var textTemplate = '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><input type="text" ng-model="searchData.{{id}}" class="form-control"></div>'
            ,
            numTemplate = '<div class="item item-input item-stacked-label"><span class="input-label"<span class="input-label">{{name}}</span><div class="row"><div class="col-sm-6" ng-init="searchData.{{id}}=[]"><div class="input-group"><span class="input-group-addon">大于</span>' +
                '<input type="number" ng-model="searchData.{{id}}[0]" class="form-control"></div></div><div class="col-sm-6"><div class="input-group"><span class="input-group-addon">大于</span>' +
                '<input type="number" ng-model="searchData.{{id}}[1]" class="form-control"></div></div></div></div>'
            ,
            dateTemplate = '<div class="item item-input item-stacked-label light-bg"><span class="input-label" ng-init="searchData.{{id}}=[]">{{name}}</span>' +
                '<div class="item item-input item-borderless"><span class="input-label">早于</span>' +
                '<c-datepicker output="searchData.{{id}}[0]"></c-datepicker></div>' +
                '<div class="item item-input item-borderless"><span class="input-label">晚于</span>' +
                '<c-datepicker output="searchData.{{id}}[1]"></c-datepicker></div></div>';
        var searchRef = {
            'text': textTemplate,
            'decoration': textTemplate,
            'textarea': textTemplate,
            'number': numTemplate,
            'currency': numTemplate,
            'datediff': numTemplate,
            'datetime': dateTemplate,
            'current': dateTemplate,
            'info': textTemplate,
            'user': '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><c-users output="searchData.{{id}}"></c-users></div>',
            'users': '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><c-users output="searchData.{{id}}" multiple="true"></c-users></div>',
            'select': '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><c-select input-src="{{config}}" output="searchData.{{id}}"></c-select></div>',
            'multiselect': '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><c-select input-src="{{config}}" output="searchData.{{id}}" output-field="id" multiple="true"></c-select></div>',
            'dictionary': '<div class="item item-input"><span class="input-label"<span class="input-label">{{name}}</span><c-dictionary input-src="{{config}}" output="searchData.{{id}}"></c-dictionary></div>'
        }
        this.renderSearch = function (params) {
            var tableSchema = params.tableSchema
                , element = angular.element(document.getElementById(params.elementId))
                , scope = params.scope
                , template = '<div class="list light-bg">';
            angular.forEach(tableSchema, function (field) {
                if (searchRef[field.ctrl]) {
                    template += $interpolate(searchRef[field.ctrl])(field);
                }
            });
            element.html(template + '</div>');
            $compile(element)(scope);
        };
        this.renderRep = function (params) {
            var tableSchema = params.tableSchema
                , element = angular.element(document.getElementById(params.elementId))
                , scope = params.scope
                // ,template = '<div ng-if="list" class="list"><div class="card-rep light-bg" ng-repeat="formData in list">';
                ,
                template = '<ion-slide-box ng-if="list" class="list" show-pager="false" on-slide-changed="slideHasChanged($index)"><ion-slide ng-repeat="formData in list"><div class="card-rep light-bg">';
            scope.detailsMap = {};
            angular.forEach(tableSchema, function (field) {
                if (field.flagDetail) {
                    scope.detailsMap[field.id] = field;
                    template += $interpolate('<c-detail label="{{name}}" input="detailsMap.{{id}}" output="formData" readonly="true"></c-detail>')(field);
                } else {
                    var ctrl = field.ctrl;
                    var ctrlTemplate = viewRef[ctrl];
                    if (ctrlTemplate) {
                        template += '<div class="item-rep"><span class="item-rep-label">' + field.name
                            + '</span><div class="item-rep-value">' + $interpolate(ctrlTemplate)(field) + '</div></div>';
                    } else {
                        template += '<div class="item-rep"><span class="item-rep-label">' +
                            field.name + '</span><div ' + (ctrl == 'textarea' ? '' : 'class="item-rep-value"') +
                            ' ng-bind-html="formData.' + field.id + '"></div></div>';
                    }
                }
            });
            // element.html(template + '</div></div>');
            // element.html(template + '</div></ion-slide></ion-slide-box>');
            element.html(template + '</div></ion-slide><ion-slide></ion-slide></ion-slide-box>');
            $compile(element)(scope);
        };
        this.renderDetail = function (params) {
            var fields = $filter('orderBy')(params.detail.fields, 'index'),
                detailId = params.detail.id,
                element = params.element,
                scope = params.scope
                , formData = params.formData;
            var validations = [];
            var template = '<div class="list light-bg" ng-if="formData">';
            var editableFields = $detail.editableDetailFieldIdsMap ? $detail.editableDetailFieldIdsMap[detailId] : false;
            var renderField;
            if (editableFields) {
                renderField = function (field) {
                    if (editableFields.indexOf(field.id) > -1 && ctrlRef[field.ctrl])
                        template += $interpolate(ctrlRef[field.ctrl])(field);
                    else if (viewRef[field.ctrl])
                        template += $interpolate(viewRef[field.ctrl])(field);
                    else
                        template += '<div class="item-data"><span class="input-label">' +
                            field.name + '</span><div>{{formData.' + field.id + '||\'\'}}</div></div>';
                }
            } else {
                renderField = function (field) {
                    if (ctrlRef[field.ctrl])
                        template += $interpolate(ctrlRef[field.ctrl])(field);
                }
            }
            scope.validations = validations;
            validations.length && (scope.validations = validations);
            angular.forEach(fields, function (field) {
                field.detailId = detailId;
                renderField(field);
                if (field.required) {
                    template += '<div ng-if="!formData.' + field.id +
                        '" class="help-block text-danger">*' + field.name + '为必填</div>'
                    validations.push(field.id);
                }
            });
            element.html(template + '</div>');
            $compile(element)(scope);
        };
        this.getHandleView = function (tableSchema, scope, formData,
                                       editableFields, editableDetailIds) {
            var template = '<div id="pro-view" class="list light-bg">';
            var validations = []
                , indexMap = {}
                , templates = []
                , fieldsMap = {}
                , details = [];
            scope.detailsMap = {};
            angular.forEach(tableSchema, function (field, index) {
                indexMap[field.id] = index;
                var itemTemplate;
                if (field.flagDetail) {
                    details.push(field.id);
                    scope.detailsMap[field.id] = field;
                    var flagReadOnly = true;
                    if (editableDetailIds && editableDetailIds.indexOf(field.id) > -1) {
                        flagReadOnly = false;
                    }
                    itemTemplate =
                        $interpolate('<c-detail label="{{name}}" input="detailsMap.{{id}}" detail-id="{{id}}" output="formData"' +
                            (flagReadOnly ? ' readonly="true"' : '') + '></c-detail>')(field);
                } else {
                    if (field.ctrl == 'textarea') {
                        itemTemplate = '<div class="item item-input item-stacked-label"><span class="input-label">' +
                            field.name + '</span><div class="item-text-wrap">' +
                            (viewRef[field.ctrl] ? $interpolate(viewRef[field.ctrl])(field) : formData[field.id]) + '</div></div>';
                    } else if (viewRef[field.ctrl]) {
                        itemTemplate = '<div class="item ' + (field.ctrl != 'upload' ? 'item-input' : 'item-stacked-label') + '' +
                            '"><span class="input-label">' + field.name
                            + '</span>' + $interpolate(viewRef[field.ctrl])(field) + '</div>';
                    } else {
                        itemTemplate = '<div class="item item-input"><span class="input-label">' +
                            field.name + '</span><textarea rows="4"style=" width:200px;overflow-y: scroll;resize: none">' + (formData[field.id] || '') + '</textarea></div>';
                    }
                }
                scope.validations = validations;
                if (editableFields) {
                    indexMap[field.id] = index;
                    fieldsMap[field.id] = field;
                    templates.push(itemTemplate);
                } else {
                    template += itemTemplate;
                }
            });
            validations.length && (scope.validations = validations);
            if (editableFields) {
                angular.forEach(editableFields, function (fieldId) {
                    var field = fieldsMap[fieldId], ctrlTemplate;
                    if (field) {
                        if (ctrlTemplate = ctrlRef[field.ctrl])
                            templates[indexMap[fieldId]] = $interpolate(ctrlTemplate)(field);
                        if (field.required) {
                            template += '<div ng-if="!formData.' + field.id +
                                '" class="assertive">*' + field.name + '为必填</div>'
                            validations.push(field.id);
                        }
                    } else {
                        console.error('ctrlRef[field]', fieldId)
                    }
                });
                angular.forEach(templates, function (item) {
                    template += item;
                })
            }
            if (formData.created_date) {
                formData.created_date = $filter('date')(formData.created_date, 'yyyy-MM-dd HH:mm:ss');
            }
            if (details) {
                angular.forEach(details, function (detail) {
                    var detailList = formData[detail];
                    if (detailList && detailList.length > 0) {
                        angular.forEach(detailList, function (item) {
                            item.created_date = $filter('date')(item.created_date || new Date(), 'yyyy-MM-dd HH:mm:ss');
                        })
                    }
                });
            }
            return template;
        };
        this.getFormView = function (tableSchema, scope) {
            var template = '<div id="pro-view" class="list light-bg">';
            var validations = [];
            scope.detailsMap = {};
            angular.forEach(tableSchema, function (field) {
                if (ctrlRef[field.ctrl])
                    template += $interpolate(ctrlRef[field.ctrl])(field);
                if (field.flagDetail) {
                    scope.detailsMap[field.id] = field;
                    template += $interpolate('<c-detail label="{{name}}" input="detailsMap.{{id}}" output="formData" detail-id="{{id}}"></c-detail>')(field);
                }
                if (field.required) {
                    template += '<div ng-if="!formData.' + field.id +
                        '" class="assertive">*' + field.name + '为必填</div>'
                    validations.push(field.id);
                }
            });
            validations.length && (scope.validations = validations);
            return template;
        }
        this.render_gongwen = function (params) {
            var tableSchema = params.tableSchema
                , module = params.module
                , element = angular.element(document.getElementById(params.elementId))
                , scope = params.scope
                ,
                template = '<ion-slide-box on-slide-changed="slideHasChanged($index)"><ion-slide ng-repeat="formData in detail_items"><div class="row row-wrap" style="background-color:white;">'
            angular.forEach(tableSchema, function (field) {
                var ctrl = field.ctrl;
                var ctrlTemplate = viewRef[ctrl];
                if (ctrlTemplate) {
                    template += '<div class="col col-50" style="border:1px solid #f2f2f2"><span>' + field.name + ':</span><span>' + $interpolate(ctrlTemplate)(field) + '</span></div>'
                } else {
                    template += '<div class="col col-50" style="border:1px solid #f2f2f2"><span>' +
                        field.name + '：</span><div ' + (ctrl == 'textarea' ? '' : 'class="item-rep-value"') +
                        ' ng-bind-html="formData.' + field.id + '"></div></div>';
                }

            })
            element.html(template + '</div></ion-slide></ion-slide-box>');
            $compile(element)(scope);
        }
        this.renderView = function (params) {
            var tableSchema = $filter('orderBy')(params.tableSchema, 'index'),
                element = angular.element(document.getElementById(params.elementId)),
                scope = params.scope
                , node = params.node
                , name = params.name
                , formData = params.formData
                , editableFields
                , editableDetailIds
                , details = [];
            scope.module = params.module;
            scope.formData = formData;
            $sum.details = [];
            $detail.editableDetailFieldIdsMap = {};
            $formula.detailsMap = {};
            angular.forEach(tableSchema, function (field) {
                formData[field.id] = formData[field.id] || field.default || null;
            })
            if (node.invisibleFields) {
                angular.forEach(node.invisibleFields, function (field) {
                    for (var i = 0; i < tableSchema.length; i++) {
                        if (field == tableSchema[i].id) {
                            tableSchema.splice(i, 1);
                            break;
                        }
                    }
                })
            }
            if (node.editableFields) {
                editableFields = node.editableFields;
            }
            if (node.editableDetails) {
                editableDetailIds = [];
                angular.forEach(node.editableDetails, function (detail) {
                    var detailId = detail.detailId;
                    details.push(detailId);
                    $detail.preRemoveDetailMap[detailId] = [];
                    $detail.editableDetailFieldIdsMap[detailId] = detail.fields;
                    editableDetailIds.push(detail.detailId);
                })
            }
            var template = this['get' + params.viewType](tableSchema, scope, formData,
                editableFields, editableDetailIds) + '</div>';
            scope.template = template;
            element.html('<div ng-if="formData">' + template + '</div>');
            $compile(element)(scope);
            if (formData.created_date) {
                formData.created_date = $filter('date')(formData.created_date, 'yyyy-MM-dd HH:mm:ss');
            }
            if (details) {
                angular.forEach(details, function (detail) {
                    var detailList = formData[detail];
                    if (detailList && detailList.length > 0) {
                        angular.forEach(detailList, function (item) {
                            item.created_date = $filter('date')(item.created_date || new Date(), 'yyyy-MM-dd HH:mm:ss');
                        })
                    }
                });
            }
        };
    });