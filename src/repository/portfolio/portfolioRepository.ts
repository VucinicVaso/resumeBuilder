import { IPortfolio } from '../../model/portfolio'

abstract class PortfolioRepository {

    abstract save(iP: IPortfolio) : Promise<boolean>

    abstract update(iP: IPortfolio) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<IPortfolio[]>

    abstract getById(id: string): Promise<IPortfolio | null>

}

export default PortfolioRepository