var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/webscrapping';
var db = pgp(connectionString);

// add query functions

module.exports = db;