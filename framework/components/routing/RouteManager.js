var path = require("path");

class RouteManager {

    constructor(app, rules) {
        this._rules = rules || [];

        Object.keys(this._rules).map(rule => {
            let action = this._rules[rule];
            if (typeof action == 'function') {
                app.get(rule, action);
            } else {
                let [controllerName, actionName] = action.trim().split(':');
                let fullControllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
                let controller = require(path.resolve('./controllers/', `${fullControllerName}Controller.js`));
                let controllerInstance = new controller;
                app.get(rule, controllerInstance[`${actionName}Action`]);
            }
        });
    }

    getClassName() {
        return RouteManager.name;
    }
}

module.exports = RouteManager;
