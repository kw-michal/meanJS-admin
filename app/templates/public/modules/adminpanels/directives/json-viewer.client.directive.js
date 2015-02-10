'use strict';

angular.module('adminpanel')
    .directive('jsonViewer', function(AdminPanel, $stateParams, AdminHelper) {
        return {
            restrict: 'EAC',
            scope: {
                'items': '=',
                'schemadefinition': '=',
                'edit': '='
            },
            templateUrl: 'modules/adminpanels/directives/partials/ap-json-viewer.html',

            link: function($scope, element, attrs) {

                $scope.save = function(items) {
                    var result = AdminHelper.decodeObject($scope.items, {});

                    console.log('ORIGINAL ', $scope.items);
                    console.log('RESULT ', result);
                    //console.log(JSON.stringify(result).length, JSON.stringify($scope.items).length);
                };
                $scope.remove = function(prevItem, index) {
                    prevItem.value.splice(index, 1);
                };

                $scope.add = function(e, item) {
                    var scope = angular.element(e.target).scope();
                    var newObj = [];

                    scope.schemadefinition.forEach(function(ob) {
                        if (angular.isArray(ob.value)) {
                            newObj.push({
                                key: ob.key,
                                value: []
                            });
                        } else {
                            newObj.push({
                                key: ob.key,
                                value: ''
                            });
                        }
                    });

                    item.value.unshift({
                        key: item.value.length,
                        value: newObj
                    });

                };

                $scope.toggleChidren = function(e) {
                    var c = e.target.parentNode.children;
                    for (var i = 2; i < c.length; i++) {
                        c[i].style.display = (c[i].style.display !== 'none' ? 'none' : '');
                    }
                };
                $scope.getDefinition = function(scope, key) {
                    if (scope.$parent) {
                        var newDef;
                        scope.schemadefinition.forEach(function(entry) {
                            if (entry.key === key) {
                                newDef = entry.value;
                            }
                        });

                        scope.schemadefinition = newDef;
                    }
                };

                $scope.isArray = function(value) {

                    return angular.isArray(value);
                };
            }
        };
    });
