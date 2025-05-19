import JoiValidationMiddleware        from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware    from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthoritizationMiddleware from '../../../util/middleware/adminAuthoritizationMiddleware'
import MessageExecutorManager         from '../../../util/executor/messageExecutorManager'
import UserRepository                 from '../../../repository/userRepository'
import UserRepositoryImpl             from '../../../repository/impl/userRepositoryImpl'
import SkillRepository                from '../../../repository/skillRepository'
import SkillRepositoryImpl            from '../../../repository/impl/skillRepositoryImpl'
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
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
                    new GetAllMessageExecutor(this.skillRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
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