var nodemailer = require('nodemailer');

class Mail {
    constructor(config) {
        this._transport = nodemailer.createTransport(config);
    }

    send(mail) {
        let promise = new Promise((resolve, reject) => {
            this._transport.sendMail(mail, function(error, info){
                error ? reject(error) : resolve(info);
            });
        });
        return promise;
    }
}

module.exports  = Mail;