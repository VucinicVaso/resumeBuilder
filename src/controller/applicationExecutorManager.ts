import MessageExecutorManager from '../util/executor/messageExecutorManager'
import RegistrationController from './registration/controller/registrationController'
import UserController         from './user/controller/userController'
import EducationController    from './education/controller/educationController'
import ExperienceController   from './experience/controller/experienceController'
import SkillController        from './skill/controller/skillController'
import PortfolioController    from './portfolio/controller/portfolioController'
import MessageController      from './message/controller/messageController'
import CvController           from './cv/controller/cvController'

class ApplicationExecutorManager extends MessageExecutorManager {

    constructor() {
        super()
        this.register('registration', new RegistrationController())
        this.register('user', new UserController())
        this.register('education', new EducationController())
        this.register('experience', new ExperienceController())
        this.register('skill', new SkillController())
        this.register('portfolio', new PortfolioController())
        this.register('message', new MessageController())
        this.register('cv', new CvController())
    }

}

export default ApplicationExecutorManager