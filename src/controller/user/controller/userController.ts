import Controller                 from '../../../util/controller/controller'
import UserMessageExecutorManager from '../executor_manager/userMessageExecutorManager'

class UserController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager! = new UserMessageExecutorManager()
    }

}

export default UserController