var router =  require('./components/routing/RouteManager');
var dbConnection =  require('./components/db/Connection');
var mailer =  require('./components/mailer/Mail');
var path =  require('path');

class app {
    static setExpress(express) {
        this.express = express;
        return this;
    }

    static setConfig(config) {
        this.config = config;
        return this;
    }

    static init() {
        this.addComponent('router', new router(this.express, this.config.component.routeManager.routes || []));
        this.addComponent('db', (new dbConnection(this.config.component.db)).getDb());
        this.addComponent('mail', (new mailer(this.config.mailer)));

        this.express.set('view engine', 'jade');
        //console.log('initialised aplication...');

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

    static include(module) {
        return require('./' + module);
    }
}

global.app = app;

module.exports = app;
