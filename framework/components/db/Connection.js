var knex = require('knex');

class Connection {
    constructor(config) {
        this._db = knex({
            client: config.client,
            connection: {
                host: config.connection.host,
                user: config.connection.user,
                password: config.connection.password,
                database: config.connection.database
            }
        });
    }

    getDb() {
        return this._db;
    }
}

module.exports = Connection;

