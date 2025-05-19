import Controller                      from '../../../util/controller/controller'
import EducationMessageExecutorManager from '../executor_manager/educationMessageExecutorManager'

class EducationController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager = new EducationMessageExecutorManager()
    }

}

export default EducationController