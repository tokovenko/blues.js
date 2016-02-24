var HttpException =  include('exceptions/HttpException');
var NotFoundHttpException =  include('exceptions/NotFoundHttpException');

class ExceptionHandler {
    static addException(exception) {
        let info = '';
        if(exception instanceof HttpException) {
            info = 'send http response with error info...';
        } else {
            info = exception.message + "\n" + exception.stack;
        }
        app.response ? app.response.send(info) : console.log(info);
    }
}


module.exports = ExceptionHandler;