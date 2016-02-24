var Exception = include('base/Exception');

class HttpException extends Exception{
    constructor(message, code) {
        super(message || 'some http error...', code || 500);
    }
}

module.exports = HttpException;