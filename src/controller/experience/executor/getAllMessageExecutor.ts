import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import ExperienceRepository                from '../../../repository/experienceRepository'
import { IExperience }                     from '../../../model/experience'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'

class GetAllMessageExecutor implements MessageExecutor {

    private experienceRepository?: ExperienceRepository

    constructor(experienceRepository: ExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: IExperience[] = await this.experienceRepository!.getAll()
            
            response.json({ success: true, experiences: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor