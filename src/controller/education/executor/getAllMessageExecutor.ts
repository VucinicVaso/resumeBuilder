import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import EducationRepository                 from '../../../repository/educationRepository'
import { IEducation }                      from '../../../model/education'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'

class GetAllMessageExecutor implements MessageExecutor {

    private educationRepository?: EducationRepository

    constructor(educationRepository: EducationRepository) {
        this.educationRepository = educationRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: IEducation[] = await this.educationRepository!.getAll()
            
            response.json({ success: true, educations: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor