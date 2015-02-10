'use strict';

//Setting up route
angular.module('adminpanel').config(['$stateProvider',
    function($stateProvider) {
        // Adminpanels state routing
        $stateProvider.
        state('listCollections', {
            url: '/adminpanel/collections',
            templateUrl: 'modules/adminpanels/views/list-collections.client.view.html'
        }).
        state('showCollection', {
            url: '/adminpanel/collections/:collectionName',
            templateUrl: 'modules/adminpanels/views/show-collection.client.view.html'
        }).
        state('showCollectionItem', {
            url: '/adminpanel/collections/:collectionName/:itemId',
            templateUrl: 'modules/adminpanels/views/show-item.client.view.html'
        });
    }
]);
