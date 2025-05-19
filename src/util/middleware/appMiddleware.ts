import { Request, Response, NextFunction } from 'express'

class AppMiddleware {

    /** route not found middleware */
    static routeNotFound(request: Request, response: Response, next: NextFunction) : Response {
        return AppMiddleware.errorHandler(new Error(`Route not found - ${request.originalUrl}`), request, response, next)    
    }

    /** error handling middleware */
    static errorHandler(err: any, request: Request, response: Response, next: NextFunction) : Response {
        const statusCode = response.statusCode === 200 ? 500 : response.statusCode
        return response.status(statusCode)
            .json({
                success: false,
                message: err.message,
                stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            })
    }

}

export default AppMiddleware
