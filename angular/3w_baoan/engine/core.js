/**
 * Created by qin on 2016/7/16.
 */
angular.module('ngFlow', [])
    .service('$flow', function ($http, $filter, $ionicLoading, $userModal, $wechat, $interpolate) {
        var global, nodesMap, module, currentNode, prevNodeId, proId, freezedUserIds = [],
            freezedUserId, flexName;

        function _onHandler(sp, callback) {
            var userInfo = window.userInfo;
            for (var i = 0; i < sp.length; i++) {
                var curSp = sp[i],
                    curSpHandlers = curSp.handlers,
                    flagHandler;
                for (var j = 0; j < curSpHandlers.length; j++) {
                    var curSpHandler = curSpHandlers[j]
                    switch (curSpHandler.type) {
                        case 0:
                            flagHandler = (curSpHandler.userIds.indexOf(userInfo.id) > -1);
                            break;
                        case 1:
                            var groupRoleIds = curSpHandler.groupRoleIds;
                            for (var k = 0; k < groupRoleIds.length; k++) {
                                var curGroupRole = groupRoleIds[k];
                                if (userInfo.roleId == curGroupRole.roleId && userInfo.groupId == curGroupRole.groupId) {
                                    flagHandler = true;
                                    break;
                                }
                            }
                            break;
                        case 2:
                            flagHandler = (curSpHandler.groupIds.indexOf(userInfo.groupId) > -1);
                            break;
                        case 3:
                            flagHandler = (curSpHandler.roleIds.indexOf(userInfo.roleId) > -1);
                            break;
                    }
                    if (flagHandler) break;
                }
                if (flagHandler) {
                    callback && callback(curSp);
                    break;
                }
            }
        }

        function _resolveEditable(currentNode) {
            var editableFieldsSp = currentNode.editableFieldsSp,
                editableDetailsSp = currentNode.editableDetailsSp
            if (editableFieldsSp) {
                _onHandler(editableFieldsSp, function (curSp) {
                    currentNode.editableFields = currentNode.editableFields ?
                        currentNode.editableFields.concat(curSp.fields) : curSp.fields;
                })
            }
            if (editableDetailsSp) {
                _onHandler(editableDetailsSp, function (curSp) {
                    currentNode.editableDetails = currentNode.editableDetails ?
                        currentNode.editableDetails.concat(curSp.editableDetails) : curSp.editableDetails;
                })
            }
        }

        this.init = function (modId, scope, callback) {
            var that = this;
            $http.get(domain + '/oa/mod/init/' + modId)
                .success(function (data) {
                    if (data.flowConfig) {
                        var config = JSON.parse(data.flowConfig),
                            nodeId = data.nodeId || 'start';
                        global = config.global;
                        nodesMap = config.nodesMap;
                        currentNode = nodesMap[nodeId];
                        console.log(currentNode)
                        var tableSchema = JSON.parse(data.tableSchema),
                            fields = [],
                            details = [];
                        angular.forEach(tableSchema, function (field) {
                            if (field.flagDetail) {
                                details.push(field);
                            } else {
                                fields.push(field)
                            }
                        });
                        scope.fields = fields;
                        scope.details = details;
                        callback && callback(data, nodesMap, currentNode, global, tableSchema);
                    }
                    module = data.module;
                    // module.detailKeys && (module.detailKeys = module.detailKeys.split(','));
                })
        };
        this.initPro = function (_proId, callback, url, scope, flagFast) {
            var that = this;
            proId = _proId;
            url = url || 'init';
            $http.get(domain + '/oa/pro/' + url + '/' + proId)
                .success(function (data) {
                    var config = JSON.parse(data.flowConfig),
                        nodeId = data.nodeId
                    nodesMap = config.nodesMap;
                    currentNode = nodesMap[nodeId];
                    freezedUserIds = data.freezedUserIds;
                    if (freezedUserIds.length) {
                        for (var i = 0; i < freezedUserIds.length; i++) {
                            if (freezedUserIds[i].assistId == userInfo.id) {
                                freezedUserId = freezedUserIds[i].userId;
                                currentNode.flagNextNodesSelectable = false;
                                break;
                            }
                        }
                    }
                    var tableSchema;
                    global = config.global;
                    flexName = global.name || false;
                    module = data.module;
                    // module.detailKeys && (module.detailKeys = module.detailKeys.split(','));
                    if (!flagFast) {
                        currentNode && _resolveEditable(currentNode);
                        tableSchema = JSON.parse(data.tableSchema)
                        var fields = [],
                            details = [];
                        angular.forEach(tableSchema, function (field) {
                            if (field.flagDetail) {
                                details.push(field);
                            } else {
                                fields.push(field)
                            }
                        });
                        scope.fields = fields;
                        scope.details = details;
                    }
                    callback && callback(data, nodesMap, currentNode, global, tableSchema);
                })
        };
        this.initProWithMod = function (params) {
            var proId = params.proId,
                callback = params.success,
                flagView = params.flagView,
                flagEdit = params.flagEdit,
                flagFast = params.flagFast,
                scope = params.scope;
            this.initPro(proId, callback, flagEdit ? 'initWithModEdit' : 'initWithMod', scope, flagFast);
            if (flagView) {
                $http.get(domain + '/oa/pro/flag/withdraw/' + proId).success(function (data) {
                    if (data.errCode > 0) {
                        prevNodeId = data.prevNodeId;
                        scope.flagWithdraw = true;
                    }
                })
            }
        };
        this.fastHandle = function (proId, callback) {
            var that = this;
            this.initProWithMod({
                proId: proId,
                flagFast: true,
                success: function (data) {
                    var outScriptPositive = currentNode.outScriptPositive,
                        payload = {
                            flagPositive: true,
                            name: data.name,
                            tableKey: data.module.tableKey,
                            formData: data.formData || {},
                            proId: proId,
                            targetNode: that.getNextNode(data.formData)
                        };
                    if (outScriptPositive) {
                        payload.outScriptPositive = outScriptPositive
                    }
                    freezedUserId && (payload.freezedUserId = freezedUserId);
                    _handle(payload, {}, callback);
                }
            })
        };

        function time(date) {
            return +(new Date(date));
        }

        function _getTargetNodeId(nodes, formData) {
            var targetNodeId;
            (function () {
                angular.forEach(formData, function (value, key) {
                    this[key] = value;
                });
                for (var i = 0; i < nodes.length; i++) {
                    var condition = nodes[i].condition
                    console.log(nodes[i].id, condition, eval(condition))
                    if (condition == 'true' || eval(condition)) {
                        targetNodeId = nodes[i].id;
                        break;
                    }
                }
            })();
            !targetNodeId && alert('target node not found');
            return targetNodeId;
        }

        this.getNextNode = function (formData) {
            var nextNode,
                nextNodes = currentNode.nextNodes;
            return nodesMap[_getTargetNodeId(nextNodes, formData)];
        }
        this.getPrevNode = function (formData) {
            var prevNodes = currentNode.prevNodes;
            return nodesMap[_getTargetNodeId(prevNodes, formData)];
        };
        this.save = function (params) {
            var formData = params.formData,
                scope = params.scope,
                callback = params.success,
                proId = params.proId;
            scope.flagSaving = true;
            $loading.open();
            var payload = {
                name: scope.name || module.name,
                groupId: scope.userInfo.groupId,
                module: module,
                formData: formData || {}
            };
            proId && (payload.proId = proId);
            $http.post(domain + '/oa/pro/save', payload)
                .success(function (data) {
                    scope.flagSaving = false;
                    scope.flagSaved = true;
                    scope.result = data;
                    callback && callback(data);
                })
        };
        var that = this;

        function _preHandleSubmitPayload(nextNode, payload, scope, callback, formData) {
            if (nextNode.flagEnd && global.flagArchive) {
                payload.flagArchive = true;
                payload.dirId = global.dirId;
            }
            if (nextNode.flagHandlersSelectable) {
                _openHandlersSelection(nextNode, formData,
                    userInfo.groupId,
                    function (userIds) {
                        payload.userIds = userIds;
                        _submit(payload, scope, callback);
                    });
            } else {
                _submit(payload, scope, callback);
            }
        }

        function _submit(payload, scope, callback) {
            console.log(payload)
            $ionicLoading.show();
            url = domain + '/oa/pro/handle';
            $http.post(url, payload)
                .success(function (data) {
                    console.log(data);
                    if (data.errCode > 0) {
                        scope.flagSubmitted = true;
                        scope.result = data;
                        $wechat.push({
                            id: data.proId,
                            title: userInfo.name + '将' + scope.name + '提交给您审批',
                            content: $filter('date')(new Date(), 'yyyy年MM月dd日 HH:mm:ss'),
                            userIds: data.userIds,
                            fuckerName: userInfo.name,
                            name: scope.name,
                            type: 'proHandle',
                            icon: userInfo.icon
                        });
                        callback && callback(data, payload.nextNode);
                    } else {
                        if (data.errCode == -2) {
                            currentNode = payload.nextNode;
                            var nextNode = payload.nextNode = that.getNextNode(payload.formData);
                            payload.proId = data.proId;
                            _preHandleSubmitPayload(nextNode, payload, scope, callback, payload.formData);
                        } else {
                            $ionicLoading.show({
                                template: '脚本:' + data.errMsg
                            });
                            setTimeout(function () {
                                $ionicLoading.hide()
                            }, 1000)
                        }
                    }
                }).error(function (data) {
                $http.post('/oa/pro/errLog', {
                    proId: proId,
                    formData: payload.formData,
                    exception: data,
                    user: userInfo
                })
            })
        }

        function _handle(payload, scope, callback, forwardId) {
            $http.post(domain + '/oa/pro/handle', payload)
                .success(function (data) {
                    console.log(data)
                    if (data.open > 0) {
                        payload.forwardId = forwardId;
                        delete payload.open;
                        console.log(payload);
                        _handle(payload, scope, callback, true)
                    }
                    if (data.errCode == -6) {
                        $ionicLoading.hide();
                        $userModal.init({
                            flagMultiple: true,
                            input: data.selectableHandlers,
                            confirm: function (userIds) {
                                payload.userIds = userIds;
                                payload.nextNodeId = data.nextNodeId;
                                _handle(payload, scope, callback, false);
                            },
                            label: '选择审批人员'
                        });
                        $userModal.open();
                    } else if (data.errCode == -1) {
                        currentNode = payload.nextNode;
                        payload.nextNode = that.getNextNode(payload.formData);
                        //callback && callback(data, payload.targetNode);
                        _handle(payload, scope, callback, forwardId)
                    } else {
                        scope.flagHandled = true;
                        scope.result = data;
                        callback && callback(data, payload.nextNode);
                    }
                    if (data.errCode != 6 && data.errCode != 4) {
                        $wechat.push({
                            id: data.proId,
                            title: userInfo.name + '将' + scope.name + '提交给您审批',
                            content: $filter('date')(new Date(), 'yyyy年MM月dd日 HH:mm:ss'),
                            userIds: data.userIds || null,
                            fuckerName: userInfo.name,
                            name: scope.name,
                            type: 'proHandle',
                            icon: userInfo.icon
                        });
                    } else if (data.errCode == 4 || data.errCode == 3) {
                        $wechat.push({
                            id: proId,
                            title: userInfo.name + '拒绝了您的' + scope.name + '流程',
                            content: $filter('date')(new Date(), 'yyyy年MM月dd日 HH:mm:ss'),
                            userIds: data.creatorId,
                            fuckerName: userInfo.name,
                            name: scope.name,
                            type: 'proForm',
                            icon: userInfo.icon
                        });
                    } else if (data.errCode == 6) {   //流程审批通过
                        $wechat.push({
                            id: proId,
                            title: '流程:' + scope.name + '已审批结束',
                            content: $filter('date')(new Date(), 'yyyy年MM月dd日 HH:mm:ss'),
                            userIds: data.creatorId,
                            fuckerName: userInfo.name,
                            name: scope.name,
                            type: 'proView',
                            icon: userInfo.icon
                        });
                        // 2017.9.22结束推送
                    }
                }).error(function (data) {
                $http.post('/oa/pro/errLog', {
                    proId: proId,
                    formData: payload.formData,
                    exception: data,
                    user: userInfo
                })
            })
        }

        function jsonifyDetails(formData, detailKeys) {
            angular.forEach(detailKeys, function (detailKey) {
                formData[detailKey] = angular.toJson(formData[detailKey]);
            })
        }

        var modal

        function _openHandlersSelection(nextNode, formData, groupId, callback) {
            $http.post(domain + '/oa/pro/getUsers', {
                targetNode: nextNode,
                formData: formData,
                groupId: groupId
            }).success(function (data) {
                $ionicLoading.hide();
                $userModal.init({
                    flagMultiple: true,
                    input: data,
                    confirm: function (userIds) {
                        callback && callback(userIds)
                    },
                    label: '选择审批人员'
                });
                $userModal.open();
            });
        }

        this.submit = function (params) {
            var formData = params.formData,
                scope = params.scope,
                callback = params.success,
                proId = params.proId,
                flagValidated = true;
            console.log(formData)
            if (scope.validations) {
                var validations = scope.validations;
                for (var i = 0; i < validations.length; i++) {
                    if (!formData[validations[i]]) {
                        flagValidated = false;
                        $ionicLoading.show({
                            template: '存在未填写的必填字段'
                        });
                        break;
                    }
                }
            }
            if (flagValidated) {
                scope.flagSubmitting = true;
                var nextNode = params.nextNode || scope.nextNode || this.getNextNode(formData);
                if (module.detailKeys == '') {
                    module.detailKeys = null;
                }
                var payload = {
                    name: scope.name || module.name,
                    groupId: scope.userInfo.groupId,
                    module: module,
                    formData: formData || {},
                    nextNode: angular.extend(nextNode, global.config),
                    fileIds: scope.proFileIds,
                    flagPositive:true
                };
                if (flexName) {
                    payload.name = $interpolate(flexName)(formData);
                    payload.flagFlexName = true;
                }
                proId && (payload.proId = proId);
                if (currentNode.outScriptValidatePositive) {
                    payload.outScriptValidatePositive = currentNode.outScriptValidatePositive
                }
                if (scope.broadcasts && scope.broadcasts.length && scope.broadcasts[0].userIds && scope.broadcasts[0].userIds.length) {
                    payload.broadcasts = scope.broadcasts
                }
                if (params.flexConfig) {
                    payload.flexConfig = params.flexConfig
                }
                if (nextNode.flagHandlersSelectable) {
                    _openHandlersSelection(nextNode, formData,
                        scope.userInfo.groupId,
                        function (userIds) {
                            payload.userIds = userIds;
                            _submit(payload, scope, callback);
                        });
                } else {
                    _submit(payload, scope, callback);
                }
            } else {
                callback && callback({
                    errCode: -3,
                    errMsg: '存在未填写的必填字段'
                })
            }
        };
        this.handle = function (params) {
            var flagPositive = params.flagPositive,
                formData = params.formData,
                scope = params.scope,
                message = params.message,
                callback = params.success,
                forwardId = params.forwardId,
                flagValidated = true;
            console.log(formData);
            if (flagPositive && scope.validations) {
                var validations = scope.validations;
                for (var i = 0; i < validations.length; i++) {
                    if (!formData[validations[i]]) {
                        flagValidated = false;
                        break;
                    }
                }
            }
            if (!flagValidated) {
                callback && callback({
                    errCode: -3,
                    errMsg: '存在未填写的必填字段'
                })
                return;
            }
            if (!currentNode) currentNode = {};
            scope.flagHandling = true;
            if (scope.flagComments && scope.flagComments.length) {
                angular.forEach(scope.flagComments, function (field) {
                    var jsonComment = {},
                        comments = [];
                    comments.push({
                        message: message ? message : flagPositive ? '通过' : '拒绝',
                        date: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        name: scope.userInfo.name
                    })
                    if (formData[field] && formData[field].indexOf('{') > -1) {
                        jsonComment = JSON.parse(formData[field])
                    }
                    jsonComment.comments ? jsonComment.comments = jsonComment.comments.concat(comments) :
                        jsonComment.comments = comments;
                    if (scope.userInfo.signImg) {
                        if (!jsonComment.signImg) jsonComment.signImg = scope.userInfo.signImg
                        else jsonComment.signImg += ',' + scope.userInfo.signImg
                    }
                    else {                        //若果没有签名图，则用signImg占据位置
                        if (!jsonComment.signImg) jsonComment.signImg = 'signImg'
                        else jsonComment.signImg += ',signImg'
                    }

                    formData[field] = angular.toJson(jsonComment);
                    currentNode.editableFields ? currentNode.editableFields.push(field) : currentNode.editableFields = [field]
                })
            }
            if (scope.flagLogs) {
                currentNode.editableFields ? currentNode.editableFields.push(scope.flagLogs) : currentNode.editableFields = [scope.flagLogs]
            }
            var nextNode = scope.nextNode ? scope.nextNode : this.getNextNode(formData),
                prevNode = this.getPrevNode(formData);
            var payload = {
                flagPositive: flagPositive,
                name: scope.name || module.name,
                tableKey: module.tableKey,
                formData: formData || {},
                message: message || null,
                proId: proId,
                nextNode: nextNode = angular.extend(nextNode, global.config),
                prevNode: prevNode = angular.extend(prevNode, global.config),
                module:module
            };
            console.log(payload);
            if (params.resultOpen == 1) {
                payload.resultOpen = params.resultOpen;
            }
            if (params.open) {
                payload.open == params.open;
            }
            currentNode = angular.extend(currentNode, global.config)
            var extraUserIds;
            (extraUserIds = scope.extraUserIds) && (payload.extraUserIds = extraUserIds);
            var flagAfterAllHandled = currentNode.flagAfterAllHandled;
            if (flagAfterAllHandled) {
                payload.flagAfterAllHandled = flagAfterAllHandled
            }
            var outScriptPositive;
            if (outScriptPositive = currentNode.outScriptPositive) {
                payload.outScriptPositive = outScriptPositive
            }
            var inScriptPositive = nextNode.inScriptPositive;
            if (inScriptPositive) {
                payload.inScriptPositive = inScriptPositive
            }
            var inScriptNegative;
            if (inScriptNegative = currentNode.inScriptNegative) {
                payload.inScriptNegative = inScriptNegative
            }
            var outScriptNegative = prevNode.outScriptNegative;
            if (outScriptNegative) {
                payload.outScriptNegative = outScriptNegative
            }
            var editableFields;
            if (editableFields = currentNode.editableFields) {
                editableFields.length && (payload.editableFields = editableFields);
            }
            var editableDetails;
            if (editableDetails = currentNode.editableDetails) {
                editableDetails.length && (payload.editableDetails = editableDetails);
            }
            if (scope.broadcasts && scope.broadcasts.length && scope.broadcasts[0].userIds && scope.broadcasts[0].userIds.length) {
                payload.broadcasts = scope.broadcasts
            }
            if (params.preRemoveDetailMap) {
                payload.preRemoveDetailMap = params.preRemoveDetailMap;
            }
            //if(freezedUserIds.length){
            //    for(var i = 0;i<freezedUserIds.length;i++){
            //        console.log(freezedUserIds[i].assistId,scope.userInfo.id)
            //        if(freezedUserIds[i].assistId==scope.userInfo.id){
            //            payload.freezedUserId = freezedUserIds[i].userId;
            //            break;
            //        }
            //    }
            //}
            freezedUserId && (payload.freezedUserId = freezedUserId);
            params.extraUserIds && (payload.extraUserIds = params.extraUserIds);
            _handle(payload, scope, callback, forwardId);
        };
        this.flagWithdraw = function (callback) {
            $http.get(domain + '/oa/pro/flag/withdraw/' + proId)
                .success(function (data) {
                    if (data.errCode > 0) {
                        prevNodeId = data.prevNodeId;
                    }
                    callback && callback(data);
                })
        };
        this.withdraw = function (params) {
            var scope = params.scope,
                callback = params.success,
                prevNode = nodesMap[prevNodeId],
                message = params.message;
            scope.flagWithdrawing = true;
            var payload = {
                proId: proId,
                message: message || null,
                fromNode: {
                    id: currentNode.id,
                    name: currentNode.name,
                    inScriptNegative: currentNode.inScriptNegative || null
                },
                targetNode: {
                    id: prevNode.id,
                    name: prevNode.name,
                    outScriptNegative: prevNode.outScriptNegative || null
                }
            };
            prevNode.flagStart && (payload.targetNode.flagStart = true);
            $http.post(domain + '/oa/pro/withdraw', payload)
                .success(function (data) {
                    scope.flagWithdrawing = false;
                    scope.result = data;
                    callback && callback(data);
                })
        }
        this.assist = function (_params) {
            console.log(_params)
            var scope = _params.scope,
                callback = _params.success,
                assistId = _params.assistId,
                message = _params.message,
                type = _params.type
            var params = {
                proId: proId,
                assistId: assistId,
                message: message,
                type: type
            }
            scope.flagAssisting = true;
            $http.get(domain + '/oa/pro/assist', {
                params: params
            }).success(function (data) {
                console.log(data)
                scope.flagAssisting = false;
                scope.result = data;
                $wechat.push({
                    id: params.proId,
                    title: userInfo.name + '将' + scope.name + '提交给您审批',
                    content: $filter('date')(new Date(), 'yyyy年MM月dd日 HH:mm:ss'),
                    userIds: assistId,
                    fuckerName: userInfo.name,
                    name: scope.name,
                    type: 'proHandle',
                    icon: userInfo.icon
                });
                callback && callback(data);
            })
        };
        this.removeDetailData = function (id, detailKey) {
            $http.get(domain + '/oa/ao/delete/_app_' + module.tableKey + '_' + detailKey + '/' + id)
        }

    })