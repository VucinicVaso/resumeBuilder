import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroyPortfolio }               from '../interface/iDestroyPortfolio'
import PortfolioRepository                 from '../../../repository/portfolio/portfolioRepository'

class DestroyMessageExecutor implements MessageExecutor {

    private portfolioRepository?: PortfolioRepository

    constructor(portfolioRepository: PortfolioRepository) {
        this.portfolioRepository = portfolioRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDp: IDestroyPortfolio = request.body
            const result: boolean = await this.portfolioRepository!.delete(iDp._id!)
            if(!result) throw `Something went wrong with deleting portfolio ${iDp._id}.`
            
            response.json({ success: true, message: `Portfolio ${iDp._id} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor