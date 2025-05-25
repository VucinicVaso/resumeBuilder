import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroyEducation }               from '../interface/iDestroyEducation'
import EducationRepository                 from '../../../repository/education/educationRepository'

class DestroyMessageExecutor implements MessageExecutor {

    private educationRepository?: EducationRepository

    constructor(educationRepository: EducationRepository) {
        this.educationRepository = educationRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDeBi: IDestroyEducation = request.body
            const result: boolean = await this.educationRepository!.delete(iDeBi._id!)
            if(!result) throw `Something went wrong with deleting education ${iDeBi._id}.`
            
            response.json({ success: true, message: `Education ${iDeBi._id} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor