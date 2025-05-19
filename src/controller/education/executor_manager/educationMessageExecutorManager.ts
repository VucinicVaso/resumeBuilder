import JoiValidationMiddleware        from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware    from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthoritizationMiddleware from '../../../util/middleware/adminAuthoritizationMiddleware'
import MessageExecutorManager         from '../../../util/executor/messageExecutorManager'
import CreateMessageExecutor          from '../executor/createMessageExecutor'
import UpdateMessageExecutor          from '../executor/updateMessageExecutor'
import DestroyMessageExecutor         from '../executor/destroyMessageExecutor'
import GetAllMessageExecutor          from '../executor/getAllMessageExecutor'
import GetByIdMessageExecutor         from '../executor/getByIdMessageExecutor'
import UserRepository                 from '../../../repository/userRepository'
import UserRepositoryImpl             from '../../../repository/impl/userRepositoryImpl'
import EducationRepository            from '../../../repository/educationRepository'
import EducationRepositoryImpl        from '../../../repository/impl/educationRepositoryImpl'
import { GetEducationByIdValidation } from '../validator/getByIdValidator'
import { CreateEducationValidation }  from '../validator/createValidator'
import { UpdateEducationValidation }  from '../validator/updateValidator'
import { DestroyEducationValidation } from '../validator/destroyValidator'

class EducationMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private educationRepository?: EducationRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.educationRepository = new EducationRepositoryImpl()

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new JoiValidationMiddleware(
                        GetEducationByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(this.educationRepository)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new GetAllMessageExecutor(this.educationRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new JoiValidationMiddleware(
                        CreateEducationValidation.validationSchema,
                        new CreateMessageExecutor(this.educationRepository)
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
                        UpdateEducationValidation.validationSchema,
                        new UpdateMessageExecutor(this.educationRepository)
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
                        DestroyEducationValidation.validationSchema,
                        new DestroyMessageExecutor(this.educationRepository)
                    )
                )
            )
        )

    }

}

export default EducationMessageExecutorManager