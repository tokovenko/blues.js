var Component = app.include('base/Component');
var ModelEvent = app.include('base/ModelEvent');

const EVENT_BEFORE_VALIDATE = 'beforeValidate';
const EVENT_AFTER_VALIDATE = 'afterValidate';

class Model extends Component {

    constructor(attributes) {
        super();
        this.attributes = attributes || [];
        this.errors = [];
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

    addError(attr, error) {
        if(!this.errors[attr]) {
            this.errors[attr] = [];
        }

        this.errors[attr].push(error);
    }

    clearErrors() {
        this.errors = [];
    }

    getErrors(attr) {
        return attr ? this.errors[attr] : this.errors;
    }

    hasErrors(attr) {
        return Object.keys(this.errors).length > 0;
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
        this.clearErrors();

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
                        if(!validator(this[attr] + '', item.params || {})) {
                            this.isValid = false;
                            this.addError(attr, this[attr].length + ' is invalide...');
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
}

module.exports = Model;
