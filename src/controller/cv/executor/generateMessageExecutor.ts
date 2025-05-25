import { Request, Response, NextFunction } from 'express'
import fs                                  from 'fs'
var pdf                                    = require('pdf-creator-node')
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGenerateCV }                     from '../interface/iGenerateCV'
import { IUser }                           from '../../../model/user'
import { CvModel, ICv }                    from '../../../model/cv'
import CvRepository                        from '../../../repository/impl/cvRepositoryImpl'

class GenerateMessageExecutor implements MessageExecutor {

    private cvRepository?: CvRepository

    constructor(cvRepository: CvRepository) {
        this.cvRepository = cvRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> { 
        try {
            const iGcV: IGenerateCV = request.body
            let user: IUser | null = request.user!

            var documentTemplate: string = fs.readFileSync(`src/assets/cv-template/${iGcV.htmlTemplate}`, 'utf8')
            let documentName: string = `cv-${user!.firstname}-${user!.lastname}-${new Date().getTime()}.pdf`
            let documentOptions = {
                format: "A4",
                orientation: "portrait",
                border: "5mm",
            }

            var document = {
                html: documentTemplate,
                data: {
                    cssTemplate: iGcV.cssTemplate,
                    user:        iGcV.content!.user       ? iGcV.content!.user       : "NULL",
                    social:      iGcV.content!.social     ? iGcV.content!.social     : "NULL",
                    languages:   iGcV.content!.languages  ? iGcV.content!.languages  : "NULL",
                    experience:  iGcV.content!.experience ? iGcV.content!.experience : "NULL",
                    education:   iGcV.content!.education  ? iGcV.content!.education  : "NULL",
                    skills:      iGcV.content!.skills     ? iGcV.content!.skills     : "NULL",
                    portfolio:   iGcV.content!.portfolio  ? iGcV.content!.portfolio  : "NULL",
                },
                path: `src/assets/cv/${documentName}`,
                type: '',
            }

            await pdf
                .create(document, documentOptions)
                .then(async (r: any) => {
                    const iCv: ICv = new CvModel()
                    iCv.file = `cv/${documentName}`
                    iCv.isActive = false
                    iCv.user = request.user!._id
    
                    const result: boolean = await this.cvRepository!.save(iCv)
                    if(!result) throw 'CV was not generated. Please try again.'
                    
                    response.status(201).json({ success: true, message: 'CV generated successfully.' })
                })
                .catch((e: any) => { throw e })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }

    }

}

export default GenerateMessageExecutor