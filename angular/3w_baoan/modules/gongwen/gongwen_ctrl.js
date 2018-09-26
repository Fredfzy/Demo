angular.module('oa')
	.controller('gongwen_list_ctrl', function($scope, $http, $state, $stateParams) {
		$scope.modId = $stateParams.id;
		$scope.gongwen_data;
		$scope.pager = {
			page: 0,
			size: 10
		}
		$scope.urlInit = userInfo.userType == 'ADMIN' ? '/oa/rep/initByAdmin/' + $scope.modId + '?limit=' + $scope.pager.size : '/oa/rep/init';
		if($scope.modId == 278) {
			$scope.title = '发文列表';
		} else if($scope.modId == 280) {
			$scope.title = '收文列表';
		}
		init($scope.modId);
		function init(modId) {
			$http.post(domain + $scope.urlInit, {
				modId: $scope.modId,
				groupId: $scope.userInfo.groupId,
				roleId: $scope.userInfo.roleId,
				limit: 20,
				offset: 0
			}).success(function(data) {
				$scope.gongwen_data = data;
				$scope.items = data.list;
				$scope.size = data.count;
//				$scope.flagMore = $scope.list.length < $scope.size;
				var tableSchema = JSON.parse(data.tableSchema);
				$scope.go_gongwen_detail = function(response, index) {
					$state.go('gongwen_detail', {
						response: response,
						slide_index: index,
						modId: $scope.modId,
						tableSchema: tableSchema
					})
				}
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
		$scope.doLoad = function() {
			if($scope.gongwen_data.list.length < $scope.gongwen_data.count) {
				$scope.pager.size = $scope.gongwen_data.count - $scope.gongwen_data.list.length;
				$scope.urlInit = userInfo.userType == 'ADMIN' ? '/oa/rep/initByAdmin/' + $scope.modId + '?limit=' + $scope.pager.size : '/oa/rep/init';
				$http.post(domain + $scope.urlInit, {
					modId: $scope.modId,
					groupId: $scope.userInfo.groupId,
					roleId: $scope.userInfo.roleId,
					limit: 20,
					offset: $scope.size
				}).success(function(data) {
					$scope.items = $scope.items.concat(data.list);
					$scope.size = data.count;
				}).finally(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}else{
				alert('已加载全部！');
			}
		}
		$scope.go_finish = function() {
			goFinish.goFinish();
		}
	})
	.controller('gongwen_detail_ctrl', function($scope, $http, $stateParams, $form, $ionicSlideBoxDelegate) {
		$scope.tableSchema = $stateParams.tableSchema;
		$scope.modId = $stateParams.modId;
		$scope.slide_index = $stateParams.slide_index;
		$scope.detail_items = $stateParams.response;
		if($scope.modId == 278) {
			$scope.title = '发文详情';
		} else if($scope.modId == 280) {
			$scope.title = '收文详情';
		}
		$scope.go_gongwen_list = function() {
			location.href = '#/gongwen_list/' + $scope.modId;
		}
		$form.render_gongwen({
			elementId: 'gongwen_detail',
			scope: $scope,
			tableSchema: $scope.tableSchema,
		})
		$ionicSlideBoxDelegate.update();
		$ionicSlideBoxDelegate.slide($scope.slide_index);
	})