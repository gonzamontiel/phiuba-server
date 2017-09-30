var mongoose = require('mongoose');
var config = require('config');

const DEFAULT_LIMIT = 50;

function handleError(error) {
    console.error(error);
}

var __instance = null;
/**
 *  @class Database Wrapper for mongoose querying, parameter sanitizing and error handling.
 */
class Database {
    static start() {
        if (!__instance) {
            __instance = new Database();
        }
        return __instance;
    }

    constructor() {
        this.connected = false;
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/phi', { useMongoClient: true,config: config.get('db') });
        mongoose.set('debug', config.get('db.debugMode'));
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        var me = this;
        this.db.once('open', function() {
            console.log("Connected to MongoDb.");
            me.connected = true;
        });
    }

    connection() {
        return this.db;
    }

    isConnected() {
        return this.connected;
    }

    getDistinct(modelRef, field, callback) {
        modelRef.distinct(field, function(err, results) {
            if (err) return handleError(err);
            callback (results);
        });
    }

    get(modelRef, callback, limit) {
        let dbquery = modelRef.find({});
        if (limit !== 0) {
            query.limit(limit || DEFAULT_LIMIT);
        }
        dbquery.exec(function (err, results) {
            if (err) return handleError(err);
            callback (results);
        });
      }

    search(query, modelRef, callback, limit) {
        let dbquery = modelRef.find(query);
        if (limit !== 0) {
            query.limit(limit || DEFAULT_LIMIT);
        }
        dbquery.exec(function (err, results) {
            if (err) return handleError(err);
            callback (results);
        });
    }

    updateOne(modelRef, query, updateSet) {
        this.update(modelRef, query, updateSet, false);
    }

    updateMany(modelRef, query, updateSet) {
        this.update(modelRef, query, updateSet, true);
    }

    update(modelRef, query, updateSet, setMany) {
        modelRef.collection.update(
            query,
            updateSet,
            {
                upsert: true,
                multi: setMany
            }
        );
      }

    insert(model) {
        model.save(function (err) {
            if (err) return console.log(err);
        });
    }
}

module.exports = Database;

// var testdb = new Database();
// testdb.search({'name': /.*Fisica.*/}, Course, function(results) {
//         console.log(results);
// });
