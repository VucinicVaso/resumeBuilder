import JoiValidationMiddleware        from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware    from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthorizationMiddleware   from '../../../util/middleware/adminAuthorizationMiddleware'
import MessageExecutorManager         from '../../../service/executor/messageExecutorManager'
import UserRepository                 from '../../../repository/user/userRepository'
import UserRepositoryImpl             from '../../../repository/user/userRepositoryImpl'
import SkillRepository                from '../../../repository/skill/skillRepository'
import SkillRepositoryImpl            from '../../../repository/skill/skillRepositoryImpl'
import CreateMessageExecutor          from '../executor/createMessageExecutor'
import UpdateMessageExecutor          from '../executor/updateMessageExecutor'
import DestroyMessageExecutor         from '../executor/destroyMessageExecutor'
import GetAllMessageExecutor          from '../executor/getAllMessageExecutor'
import GetByIdMessageExecutor         from '../executor/getByIdMessageExecutor'
import { GetSkillByIdValidation }     from '../validator/getByIdValidator'
import { CreateSkillValidation }      from '../validator/createValidator'
import { UpdateSkillValidation }      from '../validator/updateValidator'
import { DestroySkillValidation }     from '../validator/destroyValidator'

class SkillMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private skillRepository?: SkillRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.skillRepository = new SkillRepositoryImpl()

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        GetSkillByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(this.skillRepository)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GetAllMessageExecutor(this.skillRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        CreateSkillValidation.validationSchema,
                        new CreateMessageExecutor(this.skillRepository)
                    )
                )
            )
        )

        this.register(
            'update',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        UpdateSkillValidation.validationSchema,
                        new UpdateMessageExecutor(this.skillRepository)
                    )
                )
            )
        )

        this.register(
            'destroy',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        DestroySkillValidation.validationSchema,
                        new DestroyMessageExecutor(this.skillRepository)
                    )
                )
            )
        )

    }

}

export default SkillMessageExecutorManager