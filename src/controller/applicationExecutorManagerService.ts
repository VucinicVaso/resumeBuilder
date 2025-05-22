import MessageExecutorManagerService      from '../service/executor/messageExecutorManagerService'
import RegistrationMessageExecutorManager from './registration/executor_manager/registrationMessageExecutorManager'
import UserMessageExecutorManager         from './user/executor_manager/userMessageExecutorManager'
import PortfolioMessageExecutorManager    from './portfolio/executor_manager/portfolioMessageExecutorManager'
import SkillMessageExecutorManager        from './skill/executor_manager/skillMessageExecutorManager'
import MessageMessageExecutorManager      from './message/executor_manager/messageMessageExecutorManager'
import ExperienceMessageExecutorManager   from './experience/executor_manager/experienceMessageExecutorManager'
import EducationMessageExecutorManager    from './education/executor_manager/educationMessageExecutorManager'
import CvMessageExecutorManager           from './cv/executor_manager/cvMessageExecutorManager'

class ApplicationExecutorManagerService extends MessageExecutorManagerService {

    constructor() {
        super()
        this.register('registration', new RegistrationMessageExecutorManager())
        this.register('user',         new UserMessageExecutorManager())
        this.register('education',    new EducationMessageExecutorManager())
        this.register('experience',   new ExperienceMessageExecutorManager())
        this.register('skill',        new SkillMessageExecutorManager())
        this.register('portfolio',    new PortfolioMessageExecutorManager())
        this.register('message',      new MessageMessageExecutorManager())
        this.register('cv',           new CvMessageExecutorManager())
    }

}

export default ApplicationExecutorManagerService