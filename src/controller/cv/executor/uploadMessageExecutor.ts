import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICv }                             from '../../../model/cv/cv'
import CvRepository                        from '../../../repository/cv/cvRepositoryImpl'

class UploadMessageExecutor implements MessageExecutor {

    private cvRepository?: CvRepository

    constructor(cvRepository: CvRepository) {
        this.cvRepository = cvRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const icv: ICv = request.body
            icv.isActive = false
            icv.user = request.user!._id

            const result: boolean = await this.cvRepository!.save(icv)
            if(!result) throw 'CV was not uploaded. Please try again.'
            
            response.status(201).json({ success: true, message: 'CV uploaded successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UploadMessageExecutor