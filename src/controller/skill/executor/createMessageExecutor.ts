import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICreateSkill }                    from '../interface/iCreateSkill'
import { ISkill }                          from '../../../model/skill'
import SkillRepository                     from '../../../repository/skillRepository'

class CreateMessageExecutor implements MessageExecutor {

    private skillRepository?: SkillRepository

    constructor(skillRepository: SkillRepository) {
        this.skillRepository = skillRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iCs: ICreateSkill = request.body
            const iS: ISkill = iCs
            iS.user = request.user!._id
            
            const result: boolean = await this.skillRepository!.save(iS)
            if(!result) throw 'Skill was not saved. Please try again.'
            
            response.status(201).json({ success: true, message: 'Skill created successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default CreateMessageExecutor