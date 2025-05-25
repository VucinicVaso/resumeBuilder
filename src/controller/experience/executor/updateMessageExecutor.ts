import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateExperience }               from '../interface/iUpdateExperience'
import { IExperience }                     from '../../../model/experience/experience'
import ExperienceRepository                from '../../../repository/experience/experienceRepository'

class UpdateMessageExecutor implements MessageExecutor {

    private experienceRepository?: ExperienceRepository

    constructor(experienceRepository: ExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUe: IUpdateExperience = request.body
            const iE: IExperience = iUe
            
            let result: boolean = await this.experienceRepository!.update(iE)
            if(!result) throw `Something went wrong with updating experience ${iE._id}.`
            
            response.json({ success: true, message: `Experience ${iE._id} updated successfully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UpdateMessageExecutor