import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetPortfolioById }               from '../interface/iGetPortfolioById'
import { IPortfolio }                      from '../../../model/portfolio'
import PorftolioRepository                 from '../../../repository/portfolioRepository'

class GetByIdMessageExecutor implements MessageExecutor {

    private portfolioRepository?: PorftolioRepository

    constructor(portfolioRepository: PorftolioRepository) {
        this.portfolioRepository = portfolioRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGpBi: IGetPortfolioById = request.body
            
            let result: IPortfolio | null = await this.portfolioRepository!.getById(iGpBi._id!)
            if(result == null) throw `Portfolio ${iGpBi._id} not found.`
            
            response.json({ success: true, portfolio: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor