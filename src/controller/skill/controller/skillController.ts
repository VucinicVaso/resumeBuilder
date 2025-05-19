import Controller                  from '../../../util/controller/controller'
import SkillMessageExecutorManager from '../executor_manager/skillMessageExecutorManager'

class SkillController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager! = new SkillMessageExecutorManager()
    }

}

export default SkillController