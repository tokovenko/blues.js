class Component {

    constructor() {
        this.events = [];

        this.initBehaviors();
    }

    get behaviors() {
        return {};
    }

    initBehaviors() {
        Object.keys(this.behaviors).map(nameBehavior => {
            let behavior = new this.behaviors[nameBehavior].owner;
            behavior.attach(this);
        });
    }

    on(name, callback, behavior) {
        if(!this.events[name]) {
            this.events[name] = [];
        }

        this.events[name].push([callback, behavior]);
    }

    off(name) {
        if(this.events[name]) {
            this.events[name] = [];
        }
    }

    trigger(name, event) {
       if(this.events[name]) {
           this.events[name].map(([callback, behavior]) => {
               callback.call(behavior, event);
           });
       }

        //Event.trigger(this, name, event);
    }

    hasEvents(name) {
        this.events[name] || Event.hasEvents(this, name);
    }


    // attachBehavior()	Attaches a behavior to this component.
    // attachBehaviors()	Attaches a list of behaviors to the component.
    // behaviors()	Returns a list of behaviors that this component should behave as.
    // canGetProperty()	Returns a value indicating whether a property can be read.
    // canSetProperty()	Returns a value indicating whether a property can be set.
    // className()	Returns the fully qualified name of this class.
    // detachBehavior()	Detaches a behavior from the component.
    // detachBehaviors()	Detaches all behaviors from the component.
    // ensureBehaviors()	Makes sure that the behaviors declared in behaviors() are attached to this component.
    // getBehavior()	Returns the named behavior object.
    // getBehaviors()	Returns all behaviors attached to this component.

}

module.exports = Component;