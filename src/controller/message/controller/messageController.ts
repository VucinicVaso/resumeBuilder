import Controller                    from '../../../util/controller/controller'
import MessageMessageExecutorManager from '../executor_manager/messageMessageExecutorManager'

class MessageController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager = new MessageMessageExecutorManager()
    }

}

export default MessageController