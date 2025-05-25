import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroyExperience }              from '../interface/iDestroyExperience'
import ExperienceRepository                from '../../../repository/experienceRepository'

class DestroyMessageExecutor implements MessageExecutor {

    private experienceRepository?: ExperienceRepository

    constructor(experienceRepository: ExperienceRepository) {
        this.experienceRepository = experienceRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDe: IDestroyExperience = request.body
            const result: boolean = await this.experienceRepository!.delete(iDe._id!)
            if(!result) throw `Something went wrong with deleting experience ${iDe._id}.`
            
            response.json({ success: true, message: `Experience ${iDe._id} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor