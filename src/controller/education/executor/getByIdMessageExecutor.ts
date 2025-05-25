import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetEducationById }               from '../interface/iGetEducationById'
import { IEducation }                      from '../../../model/education/education'
import EducationRepository                 from '../../../repository/education/educationRepository'

class GetByIdMessageExecutor implements MessageExecutor {

    private educationRepository?: EducationRepository

    constructor(educationRepository: EducationRepository) {
        this.educationRepository = educationRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGeBi: IGetEducationById = request.body
            let result : IEducation | null = await this.educationRepository!.getById(iGeBi._id!)
            if(result == null) throw `Education ${iGeBi._id} not found.`
            
            response.json({ success: true, education: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor