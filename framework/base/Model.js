var Component = app.include('base/Component');
var ModelEvent = app.include('base/ModelEvent');

const EVENT_BEFORE_VALIDATE = 'beforeValidate';
const EVENT_AFTER_VALIDATE = 'afterValidate';

class Model extends Component {

    constructor(attributes) {
        super();
        this.attributes = attributes || [];
        this.isValid = true;
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

    get validators() {
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

        this.isValid = true;

        if(this.validators) {
            let validators = {};
            this.validators.map(item => {
                if(item.attrs && item.validator) {

                    let validator;

                    if(validators[item.validator]) {
                        validator = validators[item.validator];
                    } else {
                        if(typeof item.validator == 'string') {
                            validator = require(`validator/lib/${item.validator}`);
                            validators[item.validator] = validator;
                        } else {
                            validator = validators[item.validator];
                        }
                    }

                    item.attrs.map((attr) => {
                        try {
                            if(!validator(this[attr] + '')) {
                                this.isValid = false;
                            }
                        } catch(error) {
                            this.isValid = false;
                        }
                    });

                }
            });
        }

        this.afterValidate();

        return this.isValid;
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
