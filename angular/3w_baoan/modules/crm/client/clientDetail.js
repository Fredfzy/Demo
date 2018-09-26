angular.module('oa')
    .controller('ClientDetailCtrl', function ($scope, $state, $form, $stateParams) {
        $scope.back = function () {
            $state.go('crm');
        };
        $scope.titleName = $stateParams.name;
        $scope.proFileIds = $stateParams.formData.proFileIds;
        $form.renderView({
            viewType: 'HandleView',
            formView: $stateParams.formView,
            tableSchema: $stateParams.tableSchema,
            scope: $scope,
            elementId: 'detail-view',
            formData: $stateParams.formData,
            node: ''
        })
        $scope.go = function (item) {
            $state.go('crm_' + item, {
                data: $stateParams
            })
        }
    })