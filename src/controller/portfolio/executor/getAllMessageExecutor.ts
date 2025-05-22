import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import PortfolioRepository                 from '../../../repository/portfolioRepository'
import { IPortfolio }                      from '../../../model/portfolio'

class GetAllMessageExecutor implements MessageExecutor {

    private portfolioRepository?: PortfolioRepository

    constructor(portfolioRepository: PortfolioRepository) {
        this.portfolioRepository = portfolioRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: IPortfolio[] = await this.portfolioRepository!.getAll()
            
            response.json({ success: true, portfolios: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor