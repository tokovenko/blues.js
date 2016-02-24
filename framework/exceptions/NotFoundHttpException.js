var HttpException = include('exceptions/HttpException');

class NotFoundHttpException extends HttpException{
    constructor(message) {
        super(message || 'Page not found', 404);
    }
}

module.exports = NotFoundHttpException;