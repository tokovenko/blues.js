var Generator  = require('./../../base/BaseGenerator');

class ModelGenerator extends Generator {

    getNameFileForSave() {
        return `models/${this.getUcfirst(this.name)}.js`;
    }

    generate() {
        let promise = new Promise((resolve, reject) => {
            let ucfirstName = this.getUcfirst(this.name);
            let file = `./../blues.js/framework/generators/model/model.template`;
            let loadFile = this.loadFile(file);

            loadFile.then(data => {
                this.content = data.replace(/{model}/g, ucfirstName);
                resolve(this.content);
            }).catch(error => {
                reject(error);
            });
        });

        return promise;
    }

}

module.exports = ModelGenerator;
