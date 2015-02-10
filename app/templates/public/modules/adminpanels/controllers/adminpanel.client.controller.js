'use strict';

// Adminpanels controller
angular.module('adminpanel').controller('AdminpanelController', ['$scope', '$stateParams', '$location', 'Authentication', 'AdminHelper','AdminPanel',
    function($scope, $stateParams, $location, Authentication, AdminHelper, AdminPanel) {
        $scope.authentication = Authentication;


        $scope.listCollections = function() {
            AdminPanel.getCollections(function(data) {
                $scope.collections = data;
            });
        };

        $scope.showCollection = function() {
            $scope.collectionName = $stateParams.collectionName;
            AdminPanel.getCollectionItems($stateParams.collectionName, function(data) {
                $scope.collectionItems = data;
            });

        };

        $scope.showCollectionItem = function() {
            AdminPanel.getItem($stateParams.collectionName, $stateParams.itemId, function(data) {
                //$scope.items = data;
                console.log('Original data',data);
                $scope.items=AdminHelper.encodeObject(data)[0].value;
                console.log('encoded Data', $scope.items);
               // console.log($scope.items);
            });
            AdminPanel.getSchemaDefinition($stateParams.collectionName, function(data) {
                $scope.schemadefinition = AdminHelper.encodeObject(data);
            });
        };

    }
]);
