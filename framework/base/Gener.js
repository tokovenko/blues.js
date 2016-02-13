var fileSystem = require('fs');

class Generator {

    constructor(type, name, attrs) {
        this.type = type.toLowerCase();
        this.name = name.toLowerCase();
        this.attributes = attrs ? attrs.toLowerCase() : false;
        this.content = '';
    }

    generate() {}

    loadFile(file) {
        let promise = new Promise((resolve, reject) => {
            fileSystem.readFile(file, 'utf8', (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
        return promise;
    }

    getUcfirst(str) {
        let f = str.charAt(0).toUpperCase();
        return f + str.substr(1, str.length-1).toLowerCase();
    }

    toString() {
        return this.content;
    }

    save() {
        let promise = new Promise((resolve, reject) => {
            fileSystem.writeFile(this.getNameFileForSave(), this.content, function(err) {
                if (err) throw err;
                console.log('controller created!');
            });
        });
    }
}

module.exports = Generator;
