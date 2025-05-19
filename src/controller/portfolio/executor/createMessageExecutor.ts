import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICreatePortfolio }                from '../interface/iCreatePortfolio'
import { IPortfolio }                      from '../../../model/portfolio'
import PortfolioRepository                 from '../../../repository/portfolioRepository'

class CreateMessageExecutor implements MessageExecutor {

    private portfolioRepository?: PortfolioRepository

    constructor(portfolioRepository: PortfolioRepository) {
        this.portfolioRepository = portfolioRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iCp: ICreatePortfolio = request.body
            const iP: IPortfolio = iCp
            iP.files = iCp.files != undefined ? iCp.files.map((f) => `images/${f}`) : []
            iP.user = request.user!._id

            const result: boolean = await this.portfolioRepository!.save(iP)
            if(!result) throw 'Portfolio was not saved. Please try again.'
            
            response.status(201).json({ success: true, message: 'Portfolio created successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default CreateMessageExecutor