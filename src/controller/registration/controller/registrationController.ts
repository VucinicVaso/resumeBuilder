import Controller                         from '../../../util/controller/controller'
import RegistrationMessageExecutorManager from '../executor_manager/registrationMessageExecutorManager'

class RegistrationController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager! = new RegistrationMessageExecutorManager()
    }

}

export default RegistrationController