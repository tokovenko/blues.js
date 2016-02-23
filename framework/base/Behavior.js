class Behavior {

    constructor() {
        this.owner;
    }


    get events() {
        return {};
    }


    attach(owner) {
        this.owner = owner;
        Object.keys(this.events).map(event => {
            let callback = typeof this.events[event] == 'string' ? this[this.events[event]] : this.events[event];
            //console.log(callback);
            callback.bind(this);
            this.owner.on(event, callback, this);
        });
    }


    detach() {
        if (this.owner) {
            this.events.map(([event, callback]) => {
                this.owner.off(event, callback);
            });
            this.owner = null;
        }
    }

}


module.exports = Behavior;
