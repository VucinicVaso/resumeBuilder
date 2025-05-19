import Controller                       from '../../../util/controller/controller'
import ExperienceMessageExecutorManager from '../executor_manager/experienceMessageExecutorManager'

class ExperienceController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager = new ExperienceMessageExecutorManager()
    }

}

export default ExperienceController