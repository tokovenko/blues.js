var Generator  = require('./../../../base/BaseGenerator');

class ViewGenerator extends Generator {

    getNameFileForSave() {
        return `views/${this.getUcfirst(this.name)}.jade`;
    }

    generate() {
        let promise = new Promise((resolve, reject) => {
            let ucfirstName = this.getUcfirst(this.name);
            let file = `./../blues.js/framework/generators/view/jade/view.template`;
            let loadFile = this.loadFile(file);

            loadFile.then(data => {
                this.content = data.replace(/{view}/g, ucfirstName);
                resolve(this.content);
            }).catch(error => {
                reject(error);
            });
        });

        return promise;
    }

}

module.exports = ViewGenerator;
