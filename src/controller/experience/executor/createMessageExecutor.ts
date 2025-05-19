import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICreateExperience }               from '../interface/iCreateExperience'
import { IExperience }                     from '../../../model/experience'
import ExperienceRepository                from '../../../repository/experienceRepository'

class CreateMessageExecutor implements MessageExecutor {

    private experienceRepository?: ExperienceRepository

    constructor(experienceRepository: ExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iCe: ICreateExperience = request.body
            const iE: IExperience = iCe
            iE.user = request.user!._id
            
            const result: boolean = await this.experienceRepository!.save(iE)
            if(!result) throw 'Experience was not saved. Please try again.'
            
            response.status(201).json({ success: true, message: 'Experience created successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default CreateMessageExecutor