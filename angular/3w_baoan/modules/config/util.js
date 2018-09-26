/**
 * Created by Administrator on 2016/2/14.
 */
angular.module('oa')
	.factory('APIRead', function($http, $ionicScrollDelegate) {
		function API(name, pager, scope) {
			this.name = name;
			this.pager = pager;
			this.scope = scope
		}
		API.prototype.initList = function(callback, listType, condition) {
			this.pager.page = 0;
			var scope = this.scope;
			scope.list = undefined;
			scope.size = 0;
			var config = {
				url: domain + '/oa/' + this.name + '/initList',
				params: {
					offset: 0,
					limit: this.pager.size || 8
				}
			}
			if(condition) {
				config.method = 'POST';
				config.data = condition;
			}
			$http(config)
				.success(function(data) {
//					scope.flagNoMore = true;
					scope.list = data.list;
					scope.size = data.count;
					$ionicScrollDelegate.resize();
					callback && callback(data);
				})
		}
		API.prototype.getPage = function(callback, listType, condition,counts) {
			var scope = this.scope;
			var config = {
				url: domain+'/oa/' + this.name + '/initList',
				params: {
					limit:counts,
					offset: 0
				}
			}
			if(condition) {
				config.method = 'POST';
				config.data = condition;
			}
			$http(config).success(function(data) {
//				console.log(data);
//				scope.flagNoMore=true;
				scope.list=data.list
//				angular.forEach(data, function(item) {
//					scope.list.push(item);
//				})
				callback && callback(data);
				scope.$broadcast('scroll.infiniteScrollComplete');
			})
		}
		return {
			extend: function() {
				return new API();
			},
			create: function(name, pager, scope) {
				return new API(name, pager, scope)
			}
		}
	}).factory('APIReadWrite', function(APIRead, $http) {
		function API(name, pager, scope) {
			this.name = name;
			this.pager = pager;
			this.scope = scope
		}
		API.prototype = APIRead.extend();
		API.prototype.add = function(formData, callback, type, flagReturnId) {
			var scope = this.scope;
			scope.flagAdded = false;
			$http({
				method: 'post',
				url: domain + '/oa/' + this.name + (type ? ('/' + type) : '') + '/add' + (flagReturnId ? 'AndGetId' : ''),
				data: formData
			}).success(function(data) {
				scope.flagAdded = true;
				callback && callback(data);
			})
		}
		return {
			create: function(name, pager, scope) {
				return new API(name, pager, scope)
			}
		}
	})
	.factory('Validation', function($location, $anchorScroll) {
		function Validation(criterion) {
			this.criterion = criterion || {}
		}
		Validation.prototype.setRequires = function(requires) {
			this.criterion.requires = requires
		}
		Validation.prototype.getResult = function(formData) {
			var result = []
			if(this.criterion.requires) {
				angular.forEach(this.criterion.requires, function(item) {
					if(!formData[item.field]) {
						item.validation = item.label + '为必填';
						result.push(item);
					}
				})
			}
			if(this.criterion.customs) {
				angular.forEach(this.criterion.customs, function(item) {
					if(eval(item.expression)) {
						result.push(item);
					}
				})
			}
			return result;
		}
		return {
			create: function(criterion) {
				return new Validation(criterion);
			},
			scrollToValidation: function(id) {
				$location.hash(id);
				$anchorScroll();
			},
			info: function(result) {
				var template = '';
				angular.forEach(result, function(item) {
					template += item.validation + '<br/>'
				})
				return template;
			}
		}
	})
	.factory('Util', function() {
		return {
			upper: function(str) {
				if(str.match(/[a-zA-Z]/g)) {
					str = str.toUpperCase();
				}
				return str;
			},
			getRecursion: function(list, scope) {
				var tempMap = {};
				var tempList = [];
				angular.forEach(list, function(item) {
					var parentId = item.parent_id
					if(parentId) {
						tempMap[parentId] ? tempMap[parentId].push(item) : tempMap[parentId] = [item];
					} else {
						tempList.push(item)
					}
				})
				scope.map = tempMap;
				scope.list = tempList;
			},
			convertBase64ToBlob: function(urlData) {

				var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte

				//处理异常,将ascii码小于0的转换为大于0
				var ab = new ArrayBuffer(bytes.length);
				var ia = new Uint8Array(ab);
				for(var i = 0; i < bytes.length; i++) {
					ia[i] = bytes.charCodeAt(i);
				}

				return new Blob([ab], {
					type: 'image/png'
				});
			}
		}
	}).factory('Resolver', function() {
		function fGetChildrenByTagName(dirtyNodes, tagName, callback) {
			angular.forEach(dirtyNodes, function(dirtyNode) {
				if(dirtyNode.tagName == tagName) {
					callback(dirtyNode)
				}
			})
		}

		function fGetTarget(formData, action) {
			var condition = action.getAttribute('condition');
			if(condition != 'true') {
				angular.forEach(formData, function(value, key) {
					this[key] = value;
				})
				console.log(this, condition, eval(condition))
				return eval(condition);
			} else {
				return true;
			}
		}

		function fGetApprove(formData, step) {
			var approves = step.getElementsByTagName('approve');
			var targetId;
			for(var i = 0; i < approves.length; i++) {
				if(fGetTarget(formData, approves[i])) {
					targetId = approves[i].getAttribute('target');
					console.log('targetId', targetId)
					return targetId;
				}
			}
			return targetId;
		}

		function fGetReject(formData, step) {
			var approves = step.getElementsByTagName('reject');
			var targetId;
			for(var i = 0; i < approves.length; i++) {
				if(fGetTarget(formData, approves[i])) {
					targetId = approves[i].getAttribute('target');
					break;
				}
			}
			return targetId;
		}

		function fGetNextStep(formData, step, flagApprove) {
			if(flagApprove) {
				return fGetApprove(formData, step)
			} else {
				return fGetReject(formData, step)
			}
		}

		function fDrawPath(obj, s_x, s_y, e_x, e_y) {
			obj.css({
				'width': Math.ceil(Math.sqrt(Math.pow((e_x - s_x), 2) + Math.pow((e_y - s_y), 2))) + 'px',
				'transform': 'rotate(' + (Math.ceil(Math.atan2(e_y - s_y, e_x - s_x) / (2 * Math.PI / 360))) + 'deg)'
			})
		}
		return {
			getRoot: function(xml) {
				var parser = new DOMParser();
				return parser.parseFromString(xml, "text/xml").childNodes[0];
			},
			getConfigTable: function(root) {
				var trs = root.getElementsByTagName('table')[0].childNodes;
				var tempTrs = [];
				fGetChildrenByTagName(trs, 'tr', function(tr) {
					var tempTds = [];
					fGetChildrenByTagName(tr.childNodes, 'td', function(td) {
						var id = td.getAttribute('id');
						var cells = td.getElementsByTagName('td')
						var tdObj = {
							id: id,
							value: td.getAttribute('value'),
							colspan: td.getAttribute('colspan') || 1,
							rowspan: td.getAttribute('rowspan') || 1
						}
						if(cells.length > 0) {
							tdObj.titles = []
							tdObj.fields = []
							angular.forEach(cells, function(cell) {
								var id = cell.getAttribute('id');
								if(id) {
									tdObj.fields.push(id)
								} else {
									if(cell.getAttribute('rowspan')) {
										tdObj.value = cell.getAttribute('value');
									} else {
										tdObj.titles.push(cell.getAttribute('value'));
									}
								}
							})
						}
						tempTds.push(tdObj)
					})
					tempTrs.push(tempTds)
				})
				return tempTrs;
			},
			getConfigInit: function(root) {
				var config = root.getElementsByTagName('workflow')[0];
				var map = {
					urgent: config.getAttribute('urgent'),
					flexible: config.getAttribute('flexible'),
					isFree: config.getAttribute('isFree'),
					endScript: config.getAttribute('endScript'),
					approveScript: config.getAttribute('approveScript'),
					rejectScript: config.getAttribute('rejectScript')
				};
				config.getAttribute('endScript') && (map.endScript = config.getAttribute('endScript'));
				config.getAttribute('dirId') && (map.dirId = config.getAttribute('dirId'));
				config.getAttribute('name') && (map.name = config.getAttribute('name'));
				config.getAttribute('nameFields') && (map.nameFields = config.getAttribute('nameFields'));
				config.getAttribute('groupBySteps') && (map.groupBySteps = config.getAttribute('groupBySteps').split(','));
				return map;
			},
			getConfigSchema: function(root) {
				var fields = root.getElementsByTagName('fields')[0].childNodes;
				var schema = {};
				angular.forEach(fields, function(field) {
					if(field.tagName == 'field') {
						var tempObj = {};
						var details = field.getElementsByTagName('field');
						if(details.length > 0) {
							tempObj.type = 'object'
							tempObj.name = field.getAttribute('name')
							tempObj.format = parseInt(field.getAttribute('format'));
							tempObj.detailSchema = []
							if(field.getAttribute('key_config')) tempObj.keyConfig = field.getAttribute('key_config');
							angular.forEach(details, function(field) {
								var subObj = {
									id: field.getAttribute('id'),
									name: field.getAttribute('name'),
									ctrl: field.getAttribute('ctrl'),
									keyConfig: field.getAttribute('key_config'),
									required: field.getAttribute('required'),
									format: parseInt(field.getAttribute('format')),
									hide: !!field.getAttribute('hide'),
								};
								tempObj.detailSchema.push(subObj);
								tempObj[field.getAttribute('id')] = subObj;
							})
						} else {
							tempObj = {
								name: field.getAttribute('name'),
								ctrl: field.getAttribute('ctrl'),
								keyConfig: field.getAttribute('key_config'),
								required: field.getAttribute('required'),
								hide: field.getAttribute('hide')
							}
						}
						schema[field.getAttribute('id')] = tempObj
					}
				})
				return schema;
			},
			getFields: function(root) {
				var fields = root.getElementsByTagName('fields')[0].childNodes;
				var arr = []
				for(var i = 0; i < fields.length; i++) {
					var item = fields[i];
					if(item.tagName == 'field') {
						var details = item.getElementsByTagName('field');
						if(details.length > 0) {
							var tempDetails = [];
							angular.forEach(details, function(item) {
								tempDetails.push({
									id: item.getAttribute('id'),
									name: item.getAttribute('name'),
									ctrl: item.getAttribute('ctrl'),
									config: item.getAttribute('key_config'),
									required: item.getAttribute('required'),
									format: parseInt(item.getAttribute('format'))
								})
							})
							arr.push({
								id: item.getAttribute('id'),
								name: item.getAttribute('name'),
								details: tempDetails,
								required: item.getAttribute('required'),
								format: parseInt(item.getAttribute('format'))
							})
						} else {
							arr.push({
								id: item.getAttribute('id'),
								name: item.getAttribute('name'),
								ctrl: item.getAttribute('ctrl'),
								config: item.getAttribute('key_config'),
								required: item.getAttribute('required'),
								format: parseInt(item.getAttribute('format'))
							})
						}
					}
				}
				return arr;
			},
			getSteps: function(root) {
				var stepArr = root.getElementsByTagName('task');
				var stepMap = {}
				angular.forEach(stepArr, function(item) {
					if(item.getAttribute('isStart')) {
						stepMap.start = item;
					}
					stepMap[item.getAttribute('id')] = item;
				})
				return stepMap;
			},
			getCurrentStep: function(step, userId) {
				var stepObj = {
					stepId: step.getAttribute('id'),
					selectable: step.getAttribute('selectable'),
					approveScript: step.getAttribute('approveScript'),
					rejectScript: step.getAttribute('rejectScript'),
					editable: step.getAttribute('editable') ? step.getAttribute('editable').split(',') : false
				};
				step.getAttribute('creatorJump') && (stepObj.flagCreatorJump = step.getAttribute('creatorJump'));
				step.getAttribute('commentRequired') && (stepObj.commentRequired = true);
				step.getAttribute('repeatJump') && (stepObj.flagRepeatJump = step.getAttribute('repeatJump'));
				step.getAttribute('assignSelectable') && (stepObj.assignSelectable = true);
				step.getAttribute('changeGroup') && (stepObj.flagRepeatJump = step.getAttribute('changeGroup'));
				if(step.getAttribute('editableDetails')) {
					stepObj.editableDetails = step.getAttribute('editableDetails').split(',');
					if(step.getAttribute('editableDetailsMap').indexOf('{') > -1) {
						stepObj.editableDetailsMap = JSON.parse(step.getAttribute('editableDetailsMap'));
					}
				}
				if(step.getAttribute('editableDetailsSp')) {
					var editableDetailsSp = JSON.parse(step.getAttribute('editableDetailsSp')),
						detailsMap = {};
					for(var i = 0; i < editableDetailsSp.length; i++) {
						if(editableDetailsSp[i].userId == userId) {
							editableDetailsSp = editableDetailsSp[i];
							break;
						}
					}
					stepObj.editableDetails = stepObj.editableDetails ?
						stepObj.editableDetails.concat(editableDetailsSp.details) : editableDetailsSp.details
					stepObj.editableDetailsMap = stepObj.editableDetailsMap ?
						angular.extend(stepObj.editableDetailsMap, editableDetailsSp) : editableDetailsSp
				}
				if(step.getAttribute('editableSp')) {
					var arr = JSON.parse(step.getAttribute('editableSp'));
					for(var i = 0; i < arr.length; i++) {
						if(arr[i].userId == userId) {
							stepObj.editable = arr[i].fields ? arr[i].fields : [];
							break;
						}
					}
				}
				return stepObj;
			},
			getNextStep: function(formData, steps, currentStep, flagApprove) {
				var nextStep;
				currentStep = currentStep || steps.start;
				var nextStepId = fGetNextStep(formData, currentStep, flagApprove);
				if(nextStepId != 'end') {
					nextStep = {
						stepId: nextStepId,
						assignee: steps[nextStepId].getAttribute('assignee'),
						candidateGroups: steps[nextStepId].getAttribute('candidateGroups'),
						handleGroups: steps[nextStepId].getAttribute('handleGroups'),
						handleRoles: steps[nextStepId].getAttribute('handleRoles'),
						all: steps[nextStepId].getAttribute('all'),
						flagCreatorJump: steps[nextStepId].getAttribute('creatorJump'),
						flagRepeatJump: steps[nextStepId].getAttribute('repeatJump'),
						flagTrace: steps[nextStepId].getAttribute('trace'),
						groupByStep: steps[nextStepId].getAttribute('groupByStep')
					};
					return nextStep;
				} else {
					return null;
				}
			},
			getNextSteps: function(step, steps) {
				var arr = [];

				function getType(step, obj) {
					if(step.getAttribute('assignee')) {
						obj.type = 0;
						obj.assignee = step.getAttribute('assignee');
					} else if(step.getAttribute('candidateGroups')) {
						if(step.getAttribute('candidateGroups').indexOf(':')) {
							obj.type = 2;
							obj.candidateGroups = step.getAttribute('candidateGroups');
						} else {
							obj.type = 1;
							obj.candidateGroups = step.getAttribute('candidateGroups');
						}
					}
				}
				angular.forEach(step.getElementsByTagName('approve'), function(item) {
					var targetStep = steps[item.getAttribute('target')];
					var tempObj = {
						name: targetStep.getAttribute('name'),
						stepId: targetStep.getAttribute('id')
					};
					getType(targetStep, tempObj);
					arr.push(tempObj);
				})
				return arr;
			},
			getFirstStep: function(steps) {
				var step = steps.start;
				var stepObj = {
					stepId: step.getAttribute('id'),
					selectable: step.getAttribute('selectable'),
					approveScript: step.getAttribute('approveScript')
				};
				step.getAttribute('repeatJump') && (stepObj.flagRepeatJump = step.getAttribute('repeatJump'));
				step.getAttribute('assignSelectable') && (stepObj.assignSelectable = true);
				return stepObj;
			},
			getActions: function(step) {
				var actions = step.getElementsByTagName('action');
				var actionArr = []
				angular.forEach(actions, function(item) {
					actionArr.push({
						name: item.getAttribute('name'),
						flagApprove: item.getAttribute('target') == 'approve' ? 1 : 0
					})
				})
				return actionArr;
			},
			renderSteps: function(root, steps, currentStepId) {
				var stepArr = root.getElementsByTagName('task');
				var render = $('#flow-render');
				var renderW = render.width();
				var renderH = render.height();
				var block = $('<div class="flow-node"><div class="wrap-circle wrap-bordered yellow-bg"></div>' +
					'<small><strong>流程开始</strong></small></div>')
				var template = '';
				var flagPassed = false;
				var nodeStyle = 'yellow-bg';
				var refX = 24;
				var refY = 14;
				angular.forEach(stepArr, function(item) {
					var x = item.getAttribute('x') * renderW;
					var y = item.getAttribute('y') * renderH;
					if(!item.getAttribute('isStart')) {
						if(item.getAttribute('id') == currentStepId) {
							nodeStyle = 'current-node';
							flagPassed = true
						}
						template = '<div class="flow-node" style="top: ' + y +
							'px; left:' + x + 'px"><div class="wrap-circle wrap-bordered ' + nodeStyle + '"></div>' +
							'<small><strong>' + item.getAttribute('name') + '</strong></small></div>'
						render.append(template);
						flagPassed && (nodeStyle = 'lazur-bg')
					} else {
						x = 10;
						y = 50;
					}
					var approves = item.getElementsByTagName('approve')
					angular.forEach(approves, function(approve) {
						var targetId = approve.getAttribute('target')
						if(targetId != 'end') {
							var targetStep = steps[targetId];
							var targetX = targetStep.getAttribute('x') * renderW;
							var targetY = targetStep.getAttribute('y') * renderH;
						} else {
							var endNode = $('#end-node')
							var targetX = endNode.position().left;
							var targetY = 50;
						}
						var path = $('<div class="flow-path bg-tiffany"style="top: ' + (y + refY) +
							'px; left:' + (x + refX) + 'px"></div>')
						fDrawPath(path, x, y, targetX, targetY)
						render.append(path);
					})
				})
			},
			hasHandled: function(step, userInfo, creatorId) {
				var assignee = step.getAttribute('assignee');
				var candidateGroups = step.getAttribute('candidateGroups');
				var flag = false;
				if(assignee) {
					//"${initiator}".substr("${initiator}".indexOf('{')+1,"${initiator}".length-3)
					if(assignee.indexOf('{') > 0) {
						var handler = assignee.substr(assignee.indexOf('{') + 1, assignee.length - 3)
						flag = (handler == 'initiator' && userInfo.id == creatorId)
					} else {
						var handlers = assignee.split(',');
						for(var i = 0; i < handlers.length; i++) {
							if(userInfo.id == handlers[i]) {
								flag = true;
								break;
							}
						}
					}
				} else if(candidateGroups) {
					var handlerRanges = candidateGroups.split(',');
					for(var j = 0; j < handlerRanges.length; j++) {
						var range = handlerRanges[j];
						var roleId;
						if((range.match(/[:]{1}/)) && (userInfo.groupId == range.split(':')[0] &&
								userInfo.roleId == range.split(':')[1])) {
							flag = true;
							break;
						} else if(flag = (userInfo.roleId == range)) {
							break;
						}
					}
				}
				return flag;
			},
			getFreeConfig: function(steps) {
				var xml = '<ObjectConfig><workflow>';
				xml += '<task id="step1" isStart="true" assignee="${initiator}">' +
					'<approve target="step2" condition="true"/>' +
					'<reject target="end" condition="true"/>' +
					'<action name="提交" target="approve"/>' +
					'<action name="取消" target="reject"/></task>';
				angular.forEach(steps, function(step, index) {
					var num = index + 2;
					xml += '<task id="step' + num + '" assignee="' + step.users + '">' +
						'<approve target="' + (index == steps.length - 1 ? 'end' : 'step' + (num + 1)) + '" condition="true"/>' +
						'<reject target="step1" condition="true"/>' +
						'<action name="通过" target="approve"/>' +
						'<action name="拒绝" target="reject"/></task>';
				})
				xml += '</workflow></ObjectConfig>'
				return xml;
			}
		}
	})
	.factory('DatePicker', function() {
		function getLastDateOfMonth(month) {
			switch(month) {
				case 4:
				case 6:
				case 9:
				case 11:
					return lastDate = 30;
					break;
				case 2:
					return lastDate = 28;
					if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
						return lastDate = 29;
					break;
				default:
					return lastDate = 31;
					break;
			}
		}
		return {
			upper: function(str) {
				if(str.match(/[a-zA-Z]/g)) {
					str = str.toUpperCase();
				}
				return str;
			},
			getDateRows: function(dateObj) {
				var tempObj = angular.copy(dateObj)
				var dateRows = [];
				tempObj.setDate(1)
				var now = {
					weekDay: tempObj.getDay(),
					month: tempObj.getMonth() + 1,
					year: tempObj.getFullYear()
				}
				var lastDateOfLastMonth = getLastDateOfMonth(now.month - 1);
				now.lastDate = getLastDateOfMonth(now.month);
				var tempArr = [],
					day = 1;
				for(var i = 0; i < now.weekDay; i++) {
					tempArr.unshift(undefined);
				}
				for(var j = now.weekDay; j < 7; j++) {
					tempObj.setDate(day++)
					tempArr.push({
						day: tempObj.getDate()
					});
				}
				dateRows.push(tempArr)
				day--;
				while(day < now.lastDate + 1) {
					tempArr = [];
					for(var l = 0; l < 7; l++) {
						if(day++ < now.lastDate) {
							if(!(now.year % 4 == 0 && now.year % 100 != 0 || now.year % 400 == 0)) {
								if(now.month == 2) {
									now.lastDate = 28;
								}
							}
							tempObj.setDate(day)
							tempArr.push({
								day: tempObj.getDate()
							})
						} else break;
					}
					dateRows.push(tempArr)
				}
				return dateRows;
			}
		}
	})
	.factory('UserInfo', function() {
		var userInfo = {};
		return {
			setUser: function(user) {
				userInfo = user;
			},
			getGroupId: function() {
				return userInfo.groupId;
			},
			getGroupName: function() {
				return userInfo.groupName;
			},
			getGroup: function() {
				return {
					id: userInfo.groupId,
					name: userInfo.groupName
				}
			}
		}
	})
	.filter('parseJ', function() {
		return function(input) {
			return JSON.parse(input)
		}
	})
	.filter('parseJackson', function() {
		return function(input) {
			if(input)
				return input == '[{}]' ? [] : eval(input.replace(/=/g, ':\'').replace(/,/g, '\',').replace(/}/g, '\'}'))
		}
	})
	//    .filter('rmb', function () {
	//        var fParseRmb = function (num) {
	//            var mark = num < 0 ? "负" : "";
	//            num = num < 0 ? -num : num;
	//            var AA = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
	//            var BB = ["", "拾", "佰", "仟", "万", "亿", "", ""];
	//            var CC = ["角", "分", ""];
	//
	//            var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
	//
	//            for (var i = a[0].length - 1; i >= 0; i--) {
	//                switch (k) {
	//                    case 0 :
	//                        re = BB[7] + re;
	//                        break;
	//                    case 4 :
	//                        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
	//                            re = BB[4] + re;
	//                        break;
	//                    case 8 :
	//                        re = BB[5] + re;
	//                        BB[7] = BB[5];
	//                        k = 0;
	//                        break;
	//                }
	//                if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
	//                if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
	//                k++;
	//            }
	//            if (num == null || num == 0) {
	//                re = "零";
	//            }
	//            if (re.trim().length > 0) {
	//                re += "元";
	//            }
	//            re = mark + re;
	//            if (a.length > 1) { //加上小数部分(如果有小数部分)
	//                re += BB[6];
	//                for (var i = 0; i < 1; i++) {
	//                    //break;
	//                    re += AA[a[1].charAt(i)] + CC[i];
	//                }
	//            } else {
	//                re += "整";
	//            }
	//
	//            return re;
	//        };
	//        return function (input) {
	//            return fParseRmb(input)
	//        }
	//    })
	.filter('rmb', function() {
		var fParseRmb = function(n) {
			//console.log(n)
			var fraction = ['角', '分'];
			var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
			var unit = [
				['元', '万', '亿'],
				['', '拾', '佰', '仟']
			];
			var head = n < 0 ? '欠' : '';
			n = Math.abs(n);
			var stringN = n.toString();
			var decimals = stringN.split('.');
			if(decimals[1]) {
				var decimalsNum = decimals[1].split('');
				console.log(decimalsNum)
			}
			var s = '';
			if(decimalsNum) {
				var length = decimalsNum.length > 2 ? 2 : decimalsNum.length;
				for(var i = 0; i < length; i++) {
					console.log(digit[decimalsNum[i]] + fraction[i])
					s += (digit[decimalsNum[i]] + fraction[i]);
					console.log(s);
				}
			}
			//for (var i = 0; i < fraction.length; i++) {
			//    s += (digit[M[i]] + fraction[i]).replace(/零./, '');
			//    //console.log(s);
			//}
			s = s || '整';
			n = Math.floor(n);

			for(var i = 0; i < unit[0].length && n > 0; i++) {
				var p = '';
				for(var j = 0; j < unit[1].length && n > 0; j++) {
					p = digit[n % 10] + unit[1][j] + p;
					n = Math.floor(n / 10);
				}
				s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
			}
			return head + s.replace(/^整$/, '零元整');
		}
		return function(input) {
			input = Number(input) || 0;
			return fParseRmb(input)
		}
	})
	.service('$remove', function($ionicPopup) {
		this.open = function(name, callback) {
			$ionicPopup.confirm({
				cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
				cancelType: 'button-medium', // String (default: 'button-default'). The type of the Cancel button.
				okText: '确认删除', // String (default: 'OK'). The text of the OK button.
				okType: 'button-medium button-assertive',
				title: '<div class="assertive"><i class="icon ion-alert-circled"></i> 警告</div>',
				template: '<div class="popup-body">' + name + '</div>'
			}).then(function(res) {
				res && callback && callback();
			});
		}
	});