'use strict';

angular.module('adminpanel')
    .factory('AdminHelper', [function() {
            var service = {};

            service.encodeObject = function(ob) {
                var r = [];
                Object.keys(ob).forEach(function(key) {
                    if (typeof ob[key] === 'object')
                        r.push({
                            key: key,
                            value: service.encodeObject(ob[key])
                        });
                    else
                        r.push({
                            key: key,
                            value: ob[key]
                        });
                });
                return r;
            };

            service.decodeObject = function(ob,obType) {
                var r=obType;
                ob.forEach(function(entry) {
                    if (angular.isArray(entry.value)) {
                        console.log(entry.key);
                        if (entry.value.length>0) {
                        	console.log('key',entry.value[0].key);
                            if(entry.value[0].key.toString()==='0'){
                                r[entry.key] = service.decodeObject(entry.value, []);
                            }
                            else
                                r[entry.key] = service.decodeObject(entry.value, {});
                        } 
                        else 
                        	r[entry.key] = service.decodeObject(entry.value, {});
                        
                    } 
                    else
                        r[entry.key] = entry.value;
                });
                return r;
            };


            return service;
        }

    ]);
