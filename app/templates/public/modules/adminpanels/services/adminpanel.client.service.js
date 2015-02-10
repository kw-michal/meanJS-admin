'use strict';

angular.module('adminpanel')
    .factory('AdminPanel', ['$http', '$rootScope', function($http, $rootScope) {
            var service = {};


            service.getCollections = function(cb) {
                $http.get('/AdminPanel').
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {
                    console.log('Error in getCollections');
                });
            };
            service.getCollectionItems = function(collection, cb) {
                $http.get('/AdminPanel/' + collection).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {
                    console.log('Error in getCollections');
                });
            };
            service.getItem = function(collection, itemId, cb) {
                var params = [collection, itemId].join('/');
                $http.get('/AdminPanel/' + params).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {
                    console.log('Error in getCollections');
                });
            };
            service.getSchemaDefinition = function(collection, cb) {
                var params = [collection].join('/');
                $http.get('/schemaDefinition/' + params).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {
                    console.log('Error in get schema definition');
                });
            };
            return service;

        }

    ]);
