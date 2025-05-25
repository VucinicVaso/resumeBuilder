import { Application, Request, Response, NextFunction } from 'express'
import AppRouter                                        from '../appRouter'
import MulterFileSystem                                 from '../../util/multerFileSystem/multerFileSystem'
import RegistrationMessageExecutorManager from '../../controller/registration/executor_manager/registrationMessageExecutorManager'
import UserMessageExecutorManager         from '../../controller/user/executor_manager/userMessageExecutorManager'
import PortfolioMessageExecutorManager    from '../../controller/portfolio/executor_manager/portfolioMessageExecutorManager'
import SkillMessageExecutorManager        from '../../controller/skill/executor_manager/skillMessageExecutorManager'
import MessageMessageExecutorManager      from '../../controller/message/executor_manager/messageMessageExecutorManager'
import ExperienceMessageExecutorManager   from '../../controller/experience/executor_manager/experienceMessageExecutorManager'
import EducationMessageExecutorManager    from '../../controller/education/executor_manager/educationMessageExecutorManager'
import CvMessageExecutorManager           from '../../controller/cv/executor_manager/cvMessageExecutorManager'

class AppRouterImpl extends AppRouter {

    private multerFileSystem?: MulterFileSystem

    constructor(app: Application) {
        super()

        this.setRouter()
        
        this.multerFileSystem = new MulterFileSystem('src/assets')

        this.registerRouteManager('registration', new RegistrationMessageExecutorManager())
        this.registerRouteManager('user',         new UserMessageExecutorManager())
        this.registerRouteManager('education',    new EducationMessageExecutorManager())
        this.registerRouteManager('experience',   new ExperienceMessageExecutorManager())
        this.registerRouteManager('skill',        new SkillMessageExecutorManager())
        this.registerRouteManager('portfolio',    new PortfolioMessageExecutorManager())
        this.registerRouteManager('message',      new MessageMessageExecutorManager())
        this.registerRouteManager('cv',           new CvMessageExecutorManager())

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
                    this.callRouteManager(destination!, req, res, next)
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
                    this.callRouteManager(destination!, req, res, next)
                },
            )
    }

}

export default AppRouterImpl