import Controller                      from '../../../util/controller/controller'
import PortfolioMessageExecutorManager from '../executor_manager/portfolioMessageExecutorManager'

class PorfolioController extends Controller {

    constructor() {
        super()
        this.messageExecutorManager = new PortfolioMessageExecutorManager()
    }

}

export default PorfolioController