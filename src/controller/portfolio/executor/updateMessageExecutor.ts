import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdatePortfolio }                from '../interface/iUpdatePortfolio'
import { IPortfolio }                      from '../../../model/portfolio/portfolio'
import PortfolioRepository                 from '../../../repository/portfolio/portfolioRepository'

class UpdateMessageExecutor implements MessageExecutor {

    private portfolioRepository?: PortfolioRepository

    constructor(portfolioRepository: PortfolioRepository) {
        this.portfolioRepository = portfolioRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUp: IUpdatePortfolio = request.body
            const iP: IPortfolio = iUp
            iP.files = iUp.files != undefined ? iUp.files.map((f) => `images/${f}`) : []
            
            let result: boolean = await this.portfolioRepository!.update(iP)
            if(!result) throw `Something went wrong with updating portfolio ${iP._id}.`
            
            response.json({ success: true, message: `Portfolio ${iP._id} updated successfully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UpdateMessageExecutor