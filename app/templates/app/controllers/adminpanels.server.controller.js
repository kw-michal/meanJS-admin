'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash'),
    db = mongoose.connection;

String.prototype.toSingleModelName = function() {
    var s = (this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }));
    s = s.substr(0, s.length - 1);
    return s;
};


function extendModelWithEmptyValues(models, definition) {
    //console.log('extend start',model,definition);
    models.forEach(function(model) {
        Object.keys(definition).forEach(function(key) {
            //console.log('typ ',typeof definition[key]);
            if (typeof definition[key] === 'object') {
                if (!model[key]) {
                    model[key] = [];
                } else
                    model[key] = extendModelWithEmptyValues(model[key], definition[key]);

            } else {
                if (!model[key]) {
                    model[key] = '';
                }
            }

        });
    });
    //console.log('current model --> ', model);
    //console.log('model : ',model);
    return models;
}

function getSchemaDefinition(schema, cirular) {
    var properties = Object.keys(mongoose.models[schema].schema.paths);
    var model = {};


    properties.forEach(function(key) {

        if (key !== 'created' && key !== '__v') {
            try {
                var type = mongoose.models[schema].schema.paths[key].instance;
                if (cirular)
                    type = '';
                else if (!type) {
                    var p = mongoose.models[schema].schema.paths[key].options.type[0];
                    if (p === schema)
                        type = getSchemaDefinition(p, true);
                    else
                        type = getSchemaDefinition(p);
                }
                model[key] = type;
            } catch (err) {
                model[key] = 'Date';
            }
        }

    });

    return model;
}

exports.list = function(req, res) {

    var names = Object.keys(mongoose.models).map(function(entry) {
        return entry;
    });

    res.jsonp(names);
    // mongoose.connection.db.collectionNames(function (err, names) {
    //  names = names.map(function(entry){
    //      return ((entry.name).split('.'))[1];
    //  });

    //       console.log(names); // [{ name: 'dbname.myCollection' }]
    //       res.jsonp(names);
    //   });


};

exports.collection = function(req, res) {

    var collection = req.params.collection;
    mongoose.models[collection].find().exec(function(err, results) {
        res.jsonp(results);
    });
};
exports.schemaDefinition = function(req, res) {
    var collection = req.params.collection;
    //console.log(mongoose.models[collection].schema.paths.rooms);
    //res.jsonp({});
    res.jsonp(getSchemaDefinition(collection));
};
exports.item2 = function(req, res) {
    var collection = req.params.collection;
    var item = req.params.item;
    mongoose.models[collection].find({
        _id: item
    }).exec(function(err, results) {
        res.jsonp(results);
    });
};

exports.item = function(req, res) {
    var collection = req.params.collection;
    var item = req.params.item;

    mongoose.models[collection].find({
        _id: item
    }).exec(function(err, results) {
        var definition = getSchemaDefinition(collection);
        var m = JSON.parse(JSON.stringify(results));
        var model = extendModelWithEmptyValues(m, definition);
        //console.log(model);
        res.jsonp(model);

    });
};
