import { Router, Application, Request, Response, NextFunction } from 'express'
import MulterFileSystem                                         from '../util/multerFileSystem/multerFileSystem'
import ApplicationExecutorManagerService                        from '../controller/applicationExecutorManagerService'

class AppRouter {

    public router?: Router
    private messageExecutorManagerService: ApplicationExecutorManagerService
    private multerFileSystem?: MulterFileSystem

    constructor(app: Application) {
        this.router = Router()
        this.multerFileSystem = new MulterFileSystem('src/assets')
        this.messageExecutorManagerService = new ApplicationExecutorManagerService()
        this.init(app)
    }

    private init(app: Application) : void {
        /**
         * @route /api
         * @desc one entry point route, type of route POST
         * @access public
         */
        app.route('/api')
            .post(
                (req: Request, res: Response, next: NextFunction) => {
                    let destination : string | undefined = 'destination' in req.body ? req.body.destination.split('/')[0] : ''                
                    this.messageExecutorManagerService!.call(destination!, req, res, next)
                },
            )

        /**
         * @route /api
         * @desc one entry point route for uploading files, type of route POST
         * @access public
         */
        app.route('/api/filesystem')
            .post(
                this.multerFileSystem!.upload!.array('files'),
                (req: Request, res: Response, next: NextFunction) => {
                    var requestFiles = JSON.parse(JSON.stringify(req.files))
                    let files: Array<String> = []
                    requestFiles.forEach((file: { filename: String }) => files.push(file.filename))
                    if(req.files!.length == 1) { req.body.file = files![0] }
                    if(req.files!.length != 1) { req.body.files = files! }

                    let destination : string | undefined = 'destination' in req.body ? req.body.destination.split('/')[0] : ''
                    this.messageExecutorManagerService!.call(destination!, req, res, next)
                },
            )
    }

}

export default AppRouter