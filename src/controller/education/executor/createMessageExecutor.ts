import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICreateEducation }                from '../interface/iCreateEducation'
import { IEducation }                      from '../../../model/education'
import EducationRepository                 from '../../../repository/educationRepository'

class CreateMessageExecutor implements MessageExecutor {

    private educationRepository?: EducationRepository

    constructor(educationRepository: EducationRepository) {
        this.educationRepository = educationRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iCe: ICreateEducation = request.body 
            const iE: IEducation = iCe
            iE.user =  request.user!._id
            
            const result: boolean = await this.educationRepository!.save(iE)
            if(!result) throw 'Education was not saved. Please try again.'
            
            response.status(201).json({ success: true, message: 'Education created successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default CreateMessageExecutor