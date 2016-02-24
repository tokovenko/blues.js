global.include = function include(module) {
   return require('./' + module);
};

var path =  require('path');

var router =  include('components/routing/RouteManager');
var dbConnection =  include('components/db/Connection');
var mailer =  include('components/mailer/Mail');
var ExceptionHandler =  include('base/ExceptionHandler');

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
        this.response = null;
        this.request = null;
        try {
            this.addComponent('db', (new dbConnection(this.config.component.db)).getDb());
            this.addComponent('mail', (new mailer(this.config.mailer)));

            this.addComponent('router', new router(this.express, this.config.component.routeManager.routes || []));

            this.express.set('view engine', 'jade');
        } catch(exception) {
            ExceptionHandler.addException(exception);
        }
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
        return include(module);
    }
}

global.app = app;

module.exports = app;
