var Event = app.include('base/Event');

class ModelEvent extends Event {

    constructor() {
        super();
        this.isValid = true;
    }

}


module.exports = ModelEvent;