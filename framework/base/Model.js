class Model {

    constructor(attributes) {
        this.attributes = attributes || [];
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

    // addError()	Adds a new error to the specified attribute.
    // addErrors()	Adds a list of errors.
    // afterValidate()	This method is invoked after validation ends.
    // beforeValidate()	This method is invoked before validation starts.
    // clearErrors()	Removes errors for all attributes or a single attribute.
    // getErrors()	Returns the errors for all attribute or a single attribute.
    // getFirstError()	Returns the first error of the specified attribute.
    // hasErrors()	Returns a value indicating whether there is any validation error.
    // rules()	Returns the validation rules for attributes.
    // validate()	Performs the data validation.
}

module.exports = Model;
