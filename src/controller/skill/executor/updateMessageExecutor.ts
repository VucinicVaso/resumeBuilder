import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateSkill }                    from '../interface/iUpdateSkill'
import { ISkill }                          from '../../../model/skill'
import SkillRepository                     from '../../../repository/skillRepository'

class UpdateMessageExecutor implements MessageExecutor {

    private skillRepository?: SkillRepository

    constructor(skillRepository: SkillRepository) {
        this.skillRepository = skillRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUs: IUpdateSkill = request.body
            const iS: ISkill = iUs
            
            let result: boolean = await this.skillRepository!.update(iS)
            if(!result) throw `Something went wrong with updating skill ${iS._id}.`
            
            response.json({ success: true, message: `Skill ${iS._id} updated successfully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UpdateMessageExecutor