var router =  require('./components/routing/RouteManager');
var dbConnection =  require('./components/db/Connection');

class app {
    static setExpress(express) {
        this._express = express;
        return this;
    }
    static get express() {
        return this._express;
    }

    static setConfig(config) {
        this._config = config;
        return this;
    }
    static get config() {
        return this._config;
    }

    static init() {
        this.addComponent('router', new router(this.express, this._config.component.routeManager.routes || []));
        this.addComponent('db', (new dbConnection(this._config.component.db)).getDb());

        this.express.set('view engine', 'jade');
        console.log('initialised aplication...');

        return this;
    }

    static addComponent(name, component) {
        this[name] = component;
    }

    static runLocal(port) {
        this.express.listen(port, () => {
            console.log('Example app listening on port 3000!');
        });
    }

}

module.exports = app;
