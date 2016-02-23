var Component = require('./Component');
var ModelEvent = require('./ModelEvent');

const EVENT_BEFORE_VALIDATE = 'beforeValidate';
const EVENT_AFTER_VALIDATE = 'afterValidate';

class Model extends Component {

    constructor(attributes) {
        super();
        this.attributes = attributes || [];
    }

    static get EVENT_BEFORE_VALIDATE() {
        return EVENT_BEFORE_VALIDATE;
    }

    static get EVENT_AFTER_VALIDATE() {
        return EVENT_AFTER_VALIDATE;
    }

    get safeAttributes() {
        return [];
    }


    set attributes(attributes) {
        this._attributes = [];
        this.safeAttributes.map(attribute => {
            this._attributes[attribute] = attributes[attribute] ? attributes[attribute] : '';
            this[attribute] = this._attributes[attribute];
        });
    }
    get attributes() {
        return this._attributes;
    }


    validate()
    {
        if (!this.beforeValidate()) {
            return false;
        }

        console.log('validation...');

        this.afterValidate();
    }

    beforeValidate() {
        let event = new ModelEvent;
        this.trigger(EVENT_BEFORE_VALIDATE, event);
        return event.isValid;
    }

    afterValidate() {
        this.trigger(EVENT_AFTER_VALIDATE);
    }

    // addError()	Adds a new error to the specified attribute.
    // addErrors()	Adds a list of errors.
    // clearErrors()	Removes errors for all attributes or a single attribute.
    // getErrors()	Returns the errors for all attribute or a single attribute.
    // getFirstError()	Returns the first error of the specified attribute.
    // hasErrors()	Returns a value indicating whether there is any validation error.
    // rules()	Returns the validation rules for attributes.
}

module.exports = Model;
