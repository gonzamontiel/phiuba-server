var mongoose = require('mongoose');
var config = require('config');

const DEFAULT_LIMIT = 50;

/**
 *  @class Database Wrapper for mongoose querying, parameter sanitizing and error handling.
 */
class Database {
    constructor() {
        this.connected = false;
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/phi', { config: config.get('db') });
        mongoose.set('debug', config.get('db.debugMode'));
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        var me = this;
        this.db.once('open', function() {
            console.log("Connected to MongoDb.");
            me.connected = true;
        });
    }

    isConnected() {
        return this.connected;
    }

    get(model, callback, limit) {
        model.find({})
        .limit(limit || DEFAULT_LIMIT)
        .exec(function (err, results) {
            if (err) return handleError(err);
            callback (results);
        });
      }

    search(query, modelRef, callback, limit) {
        modelRef.find(query)
            .limit(limit || DEFAULT_LIMIT)
            .exec(function (err, results) {
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
