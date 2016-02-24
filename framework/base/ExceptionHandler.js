var HttpException =  include('exceptions/HttpException');
var NotFoundHttpException =  include('exceptions/NotFoundHttpException');

class ExceptionHandler {
    static addException(exception) {
        if(exception instanceof HttpException) {
            console.log('send http response with error info...')
        } else {
            console.log(exception.message);
            console.log(exception.stack);
        }
    }
}


module.exports = ExceptionHandler;