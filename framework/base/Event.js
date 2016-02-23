class Event {

    constructor() {
        this.data = null;
        this.name = null;
        this.owner = null;
    }

    static on(owner, name, callback) {
        if(!this._events) {
            this._events = [];
        }

        if(!this._events[owner]) {
            this._events[owner] = [];
        }

        if(!this._events[owner][name]) {
            this._events[owner][name] = [];
        }

        this._events[owner][name].push(callback);
    }


    static off(owner, name) {
        if(!this._events || !this._events[owner] || !this._events[owner][name]) {
            return;
        }

        this._events[owner][name] = [];
    }

    static trigger(owner, name, event) {
        if(!this._events || !this._events[owner] || !this._events[owner][name]) {
            return;
        }

        this._events[owner][name].map(callback => {
            callback(event);
        });
    }
}


module.exports = Event;