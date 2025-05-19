import Controller               from '../../../util/controller/controller'
import CvMessageExecutorManager from '../executor_manager/cvMessageExecutorManager'

class CvController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager = new CvMessageExecutorManager()
    }

}

export default CvController