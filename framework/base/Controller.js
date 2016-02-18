var app = require('./../app');
var Component = require('./Component');

class Controller extends Component {

    runAction(action, req, res) {
        this[`${action}Action`](req, res);
    }
}

module.exports = Controller;
