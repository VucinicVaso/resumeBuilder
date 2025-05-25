import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetExperienceById }              from '../interface/IGetExperienceById'
import { IExperience }                     from '../../../model/experience/experience'
import ExperienceRepository                from '../../../repository/experience/experienceRepository'

class GetByIdMessageExecutor implements MessageExecutor {

    private experienceRepository?: ExperienceRepository

    constructor(experienceRepository: ExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGeBi: IGetExperienceById = request.body
            let result : IExperience | null = await this.experienceRepository!.getById(iGeBi._id!)
            if(!result) throw `Experience ${iGeBi._id} not found.`

            response.json({ success: true, experience: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor