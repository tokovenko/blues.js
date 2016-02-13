var Generator  = require('./../../../base/Gener');

class ControllerGenerator extends Generator {

    getNameFileForSave() {
        return `controllers/${this.getUcfirst(this.name)}Controller.js`;
    }

    generate() {
        let promise = new Promise((resolve, reject) => {
            let ucfirstName = this.getUcfirst(this.name);

            let file = `./../blues.js/framework/generator/generators/controller/controller.template`;
            let loadController = this.loadFile(file);
            let actionFile = `./../blues.js/framework/generator/generators/controller/action.template`;
            let loadAction = this.loadFile(actionFile)

            Promise.all([loadController, loadAction]).then(data => {

                let [controllerData, actionData] = data;
                this.content = controllerData.replace(/{controller}/g, ucfirstName);

                let attrs = (this.attributes || 'index:create:update').split(':');
                let actions = '';
                attrs.map(attribute => {
                    let action = actionData.replace(/{action}/g, attribute);
                    action = action.replace(/{controller}/g, this.name);

                    actions += action;
                });

                this.content = this.content.replace(/{actions}/, actions);
                resolve(this.content);
            }).catch(errors => {
                console.log('error load files', errors)
            });
        });

        return promise;
    }

}

module.exports = ControllerGenerator;
