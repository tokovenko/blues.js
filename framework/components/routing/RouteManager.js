var path = require("path");
var ExceptionHandler =  include('base/ExceptionHandler');

class RouteManager {

    constructor(express, rules) {
        this._rules = rules || [];

        Object.keys(this._rules).map(rule => {
            let action = this._rules[rule];

            express.get(rule, function(req, res) {
                try {
                    app.response = res;
                    app.request = req;

                    if (typeof action == 'function') {
                        action(req, res);
                    } else {
                        let [controllerName, actionName] = action.trim().split(':');
                        let fullControllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
                        let controller = require(path.resolve('./controllers/', `${fullControllerName}Controller.js`));
                        let controllerInstance = new controller;
                        controllerInstance.runAction(actionName, req, res);
                    }

                } catch(exception) {
                    ExceptionHandler.addException(exception);
                }
            });
        });
    }

    getClassName() {
        return RouteManager.name;
    }
}

module.exports = RouteManager;
