var Component = app.include('base/Component');

class Controller extends Component {

    runAction(action, req, res) {
        this[`${action}Action`](req, res);
    }
}

module.exports = Controller;
