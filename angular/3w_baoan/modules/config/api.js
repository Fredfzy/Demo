/**
 * Created by qin on 2016/7/21.
 */
angular.module('ngAPI', [])
    .factory('$api', function ($http) {
        function API() {
            this.initList = function (callback, filter, listName) {
                var requestConfig = {
                    url: domain + '/oa/' + this.name + '/initList',
                    params: {offset: 0, limit: this.pager.size || 8}
                };
                if (filter) {
                    requestConfig.method = 'POST';
                    requestConfig.data = filter;
                }
                if (this.sqlKey) requestConfig.params.sqlKey = this.sqlKey;
                var that = this;
                that.scope[listName] = false;
                $http(requestConfig).success(function (data) {
                    that.scope[listName] = data.list;
                    that.count = data.count;
                    if (data.count > that.pager.size) {
                        that.scope.flagMore = true;
                    }
                    that.pager.filtersStr = data.filtersStr;
                    callback && callback(data);
                }).finally(function () {
                    that.scope.$broadcast('scroll.refreshComplete');
                });
            };
            this.getPage = function (callback, listName) {
                this.pager.page++;
                var requestConfig = {
                    url: domain + '/oa/' + this.name + '/getPage',
                    params: {offset: (this.pager.page) * this.pager.size, limit: this.pager.size || 8}
                };
                if (this.pager.filtersStr) {
                    requestConfig.method = 'POST';
                    requestConfig.data = {filtersStr: this.pager.filtersStr}
                    requestConfig.headers = {'Content-Type': 'text/html'}
                }
                if (this.sqlKey) requestConfig.params.sqlKey = this.sqlKey;
                var that = this;
                $http(requestConfig).success(function (data) {
                    that.scope[listName] = that.scope[listName].concat(data);
                    if (that.scope[listName].length >= that.count) {
                        that.scope.flagMore = false;
                    }
                    callback && callback(data);
                }).finally(function () {
                    that.scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }
        }

        return {
            create: function (args) {
                var api = new API();
                api.scope = args.scope;
                api.name = args.name;
                api.pager = args.pager;
                api.sqlKey = args.sqlKey;
                return api;
            }
        }
    })
    .service('$ao', function ($http) {
        this.getSp = function (params) {
            $http.get('/oa/ao/get/' + params.tableKey + '/' + params.field + '/' + params.value)
                .success(function (data) {
                    params.success && params.success(data);
                })
        }
    })
    .service('$mod', function ($http) {
        var cats, catsMap;

        function getCatsMods(callback) {
            $http.get(domain + '/oa/mod/getCatsMods')
                .success(function (data) {
                    callback && callback(data)
                })
        }

        this.getCats = function (callback) {
            getCatsMods(callback)
        }
        this.access = function (callback) {
            $http.get(domain + '/oa/access/getAccess/0')
                .success(function (data) {
                    data.mods = [];
                    angular.forEach(data.catsMap, function (mods) {
                        data.mods = data.mods.concat(mods);
                    })
                    callback && callback(data)
                })
        }
    })
    .service('$wechat', function ($http) {
        this.push = function (params) {
            console.log(params)
            $http.post(domain + '/oa/wechat/push', {
                userIdsStr: params.userIds + '',
                pushText: params.title,
                pushBody: params.content,
                type: params.type,
                id: params.id,
                fuckerName: params.fuckerName,
                name: params.name,
                icon: params.icon
            }).success(function (data) {
                params.success && params.success(data);
            })
        }
    })
    .service('$date', function ($filter) {
        this.getNowDate = function (format) {
            format = format || 'yyyy-MM-dd';
            return $filter('date')(new Date(), format);
        };
        this.getNowDateTime = function (format) {
            format = format || 'yyyy-MM-dd HH:mm:ss';
            return $filter('date')(new Date(), format);
        };
        this.getDate = function (date, format) {
            format = format || 'yyyy-MM-dd';
            return $filter('date')(date, format);
        }
    })
    .factory('$crm', function ($http, $form, $search) {
        function CRM(elementId, scope, pager, tableKey) {
            var jqDom = $('#' + elementId)
                , listName = tableKey + 's'
                , sizeName = listName + 'Size'
                , filters = {}
                , filtersLength = 0
                , tableSchema, $this = this;
            this.addFilter = function (filterName, filterParams) {
                filters[filterName] = filterParams;
                filtersLength++;
            };
            this.removeFilter = function (filterName) {
                delete filters[filterName];
                filtersLength > 0 && filtersLength--;
            };
            this.resetFilters = function () {
                filters = {};
                filtersLength = 0;
            };
            this.initList = function (callback) {
                scope.mainList = false;
                jqDom.html('<div class="manaka text-muted"><i class="fa fa-refresh fa-spin"></i> 正在加载数据</div>');
                var aurl = ''
                if (scope.crmMore) {
                    aurl = '/oa/crm/initList/' + tableKey + '?limit=' + pager.size + '&more=' + scope.crmMore;
                } else {
                    aurl = '/oa/crm/initList/' + tableKey + '?limit=' + pager.size
                }
                var config = {
                    url: aurl
                };
                if (filtersLength) {
                    config.method = 'post';
                    config.data = filters;
                }
                $http(config).success(function (data) {
                    scope.crmFiltersStr = data.filtersStr;
                    var curList = data.list;
                    var module = data.module, fieldsMap = {};
                    scope.mainList = curList;
                    scope.mainSize = data.count;
                    tableSchema = JSON.parse(module.tableSchema);
                    curList.length ? jqDom.html('') : jqDom.html('<div class="manaka text-muted"><i class="fa fa-info-circle"></i> 未查询到相关结果</div>');
                    $form.renderRepLined({
                        tableSchema: tableSchema,
                        dataList: curList,
                        elementId: elementId,
                        scope: scope
                    });
                    $form.renderSearch({
                        tableSchema: tableSchema,
                        scope: scope,
                        elementId: 'side-search',
                        flagSide: true
                    });
                    callback && callback(curList, module);
                    scope.showMap = {};
                    angular.forEach(tableSchema, function (field) {
                        scope.showMap[field.id] = true;
                        fieldsMap[field.id] = field;
                    });
                    scope.search = function (searchData) {
                        var concat = ' and ', filterList = $search.getSqlList(searchData, fieldsMap, 'c.');
                        $this.resetFilters();
                        if (filterList.length) {
                            // filterList.push('handlerId='+window.userInfo.id)
                            $this.addFilter('dynamic', filterList.join(concat));
                        }
                        if (tableKey != 'c_handle') {
                            $this.addFilter('normal', null);
                        }
                        pager.page = 1;
                        scope.mainList = false;
                        jqDom.html('<div class="manaka text-muted"><i class="fa fa-refresh fa-spin"></i> 正在加载数据</div>');
                        var burl = '';
                        if (scope.crmMore) {
                            burl = '/oa/crm/initList/' + tableKey + '?limit=' + pager.size + '&more=' + scope.crmMore;
                        } else {
                            burl = '/oa/crm/initList/' + tableKey + '?limit=' + pager.size
                        }
                        $http.post(burl, filters)
                            .success(function (data) {
                                var curList = data.list;
                                scope.mainList = curList;
                                scope.mainSize = data.count;
                                curList.length ? jqDom.html('') : jqDom.html('<div class="manaka text-muted"><i class="fa fa-info-circle"></i> 未查询到相关结果</div>');
                                $form.renderRepLined({
                                    tableSchema: tableSchema,
                                    dataList: curList,
                                    elementId: elementId,
                                    scope: scope
                                });
                            })
                    };
                })
            };
            this.getPage = function (callback, filter) {
                var payload = {}
                if (filter) {
                    payload = {
                        filtersStr: filter
                    }
                }
                scope.mainList = false;
                jqDom.html('<div class="manaka text-muted"><i class="fa fa-refresh fa-spin"></i> 正在加载数据</div>');
                var curl = '';
                if (scope.crmMore) {
                    curl = '/oa/crm/getPage?limit=' + pager.size + '&more=' + scope.crmMore + '&offset=' + (pager.page - 1) * pager.size + '&sqlKey=' + tableKey;
                } else {
                    curl = '/oa/crm/getPage?limit=' + pager.size + '&offset=' + (pager.page - 1) * pager.size + '&sqlKey=' + tableKey
                }
                $http.post(curl, payload).success(function (data) {
                    var curList = data;
                    scope.mainList = curList;
                    jqDom.html('');
                    $form.renderRepLined({
                        tableSchema: tableSchema,
                        dataList: curList,
                        elementId: elementId,
                        scope: scope
                    })
                    callback && callback(curList)
                })
            }
        }

        return {
            create: function (args) {
                return new CRM(args.elementId, args.scope, args.pager, args.tableKey, args.filters);
            }
        }
    })
    .service('$search', function ($compile) {
        this.getSqlList = function (searchData, fieldsMap, prefix) {
            var filterList = [];
            prefix = prefix || '';
            angular.forEach(searchData, function (value, key) {
                if (value && fieldsMap[key]) {
                    var ctrl = fieldsMap[key].ctrl;
                    key = prefix + key;
                    if (ctrl == 'text' || ctrl == 'textarea' || ctrl == 'decoration' || ctrl == 'info' || ctrl == 'sequence') {
                        var newValue = value.split('')
                        var finalValue = ''
                        angular.forEach(newValue, function (value1) {
                            finalValue += value1 + '%';
                        })
                        filterList.push('(' + key + ' like "%' + finalValue + '%")');
                    } else if (ctrl == 'number' || ctrl == 'currency' || ctrl == 'datediff') {
                        if (value[1] > value[0]) {
                            filterList.push('(' + key + ' between ' + value[0] + ' and ' + value[1] + ')');
                        } else if (value[1] && !value[0]) {
                            filterList.push(key + '<' + value[1]);
                        } else if (value[0] && !value[1]) {
                            filterList.push(key + '>' + value[0]);
                        }
                    } else if (ctrl == 'select' || ctrl == 'user' || ctrl == 'dictionary' || ctrl == 'report' || ctrl == 'sql') {
                        filterList.push(key + '=\'' + value + "'");
                    } else if (ctrl == 'multiselect' || ctrl == 'users') {
                        filterList.push(key + ' in (' + value + ')');
                    } else if (ctrl == 'datetime' || ctrl == 'current') {
                        if (value instanceof Array) {
                            if (+new Date(value[1]) > +new Date(value[0])) {
                                filterList.push('(' + key + " between '" + value[0] + "' and '" + value[1] + "')");
                            } else if (value[1] && !value[0]) {
                                filterList.push(key + '<\'' + value[1] + "'");
                            } else if (value[0] && !value[1]) {
                                filterList.push(key + '>\'' + value[0] + "'");
                            }
                        } else {
                            filterList.push(value);
                        }
                    }
                }
            });
            return filterList;
        };
        this.getDisplayList = function (searchData, fieldsMap, elementId, scope) {
            var filterList = [];
            angular.forEach(searchData, function (value, key) {
                if (value && fieldsMap[key]) {
                    var ctrl = fieldsMap[key].ctrl
                        , name = fieldsMap[key].name;
                    if (ctrl == 'text' || ctrl == 'textarea' || ctrl == 'decoration' || ctrl == 'info') {
                        filterList.push(name + ' 中包含 ' + value);
                    } else if (ctrl == 'number' || ctrl == 'currency' || ctrl == 'datediff') {
                        if (value[1] > value[0]) {
                            filterList.push(name + ' 在 ' + value[0] + ' 到 ' + value[1] + ' 之间');
                        } else if (value[1] && !value[0]) {
                            filterList.push(name + '小于' + value[1]);
                        } else if (value[0] && !value[1]) {
                            filterList.push(name + '大于' + value[0]);
                        }
                    } else if (ctrl == 'select' || ctrl == 'user' || ctrl == 'dictionary' || ctrl == 'report' || ctrl == 'sql') {
                        filterList.push(name + ' 是 <c-convert convert-src="' + ctrl + '" from="' + value + '"></c-convert>');
                    } else if (ctrl == 'multiselect' || ctrl == 'users') {
                        filterList.push(name + ' 在 ' + value + ' 之中 ');
                    } else if (ctrl == 'datetime' || ctrl == 'current') {
                        if (+new Date(value[1]) > +new Date(value[0])) {
                            filterList.push(name + " 在 " + value[0] + " 到 " + value[1] + " 之间");
                        } else if (value[1] && !value[0]) {
                            filterList.push(name + ' 在 ' + value[1] + " 之前 ");
                        } else if (value[0] && !value[1]) {
                            filterList.push(name + ' 在 ' + value[0] + " 之后 ");
                        }
                    }
                }
            });
            scope.flagSaveSearch = filterList.length;
            var template = '';
            angular.forEach(filterList, function (item) {
                template += '<li>' + item + '</li>';
            });
            var ele = angular.element(document.getElementById(elementId));
            ele.html(template);
            $compile(ele)(scope);
        };
        this.getSql = function (searchData, fieldsMap) {
            var filterList = this.getSqlList(searchData, fieldsMap);
            if (filterList.length > 0)
                return filterList.join(' and ');
            else
                return '';
        }
    })