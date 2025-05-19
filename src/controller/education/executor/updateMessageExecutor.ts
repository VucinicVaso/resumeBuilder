import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateEducation }                from '../interface/iUpdateEducation'
import { IEducation }                      from '../../../model/education'
import EducationRepository                 from '../../../repository/educationRepository'

class UpdateMessageExecutor implements MessageExecutor {

    private educationRepository?: EducationRepository

    constructor(educationRepository: EducationRepository) {
        this.educationRepository = educationRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUe: IUpdateEducation = request.body
            const iE: IEducation = iUe
            
            let result: boolean = await this.educationRepository!.update(iE)
            if(!result) throw `Something went wrong with updating education ${iE._id}.`
            
            response.json({ success: true, message: `Education ${iE._id} updated successfully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UpdateMessageExecutor