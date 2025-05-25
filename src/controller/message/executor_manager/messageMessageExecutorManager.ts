import JoiValidationMiddleware         from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware     from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthorizationMiddleware    from '../../../util/middleware/adminAuthorizationMiddleware'
import MessageExecutorManager          from '../../../service/executor/messageExecutorManager'
import UserRepository                  from '../../../repository/user/userRepository'
import UserRepositoryImpl              from '../../../repository/user/userRepositoryImpl'
import MessageRepository               from '../../../repository/message/messageRepository'
import MessageRepositoryImpl           from '../../../repository/message/messageRepositoryImpl'
import CreateMessageExecutor           from '../executor/createMessageExecutor'
import UpdateMessageExecutor           from '../executor/updateMessageExecutor'
import DestroyMessageExecutor          from '../executor/destroyMessageExecutor'
import GetAllMessageExecutor           from '../executor/getAllMessageExecutor'
import GetByIdMessageExecutor          from '../executor/getByIdMessageExecutor'
import { GetMessageByIdValidation }    from '../validator/getByIdValidator'
import { CreateMessageValidation }     from '../validator/createValidator'
import { UpdateMessageByIdValidation } from '../validator/updateValidator'
import { DestroyMessageValidation }    from '../validator/destroyValidator'

class MessageMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private messageRepository?: MessageRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.messageRepository = new MessageRepositoryImpl()

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        GetMessageByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(this.messageRepository)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GetAllMessageExecutor(this.messageRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        CreateMessageValidation.validationSchema,
                        new CreateMessageExecutor(this.messageRepository)
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
                        UpdateMessageByIdValidation.validationSchema,
                        new UpdateMessageExecutor(this.messageRepository)
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
                        DestroyMessageValidation.validationSchema,
                        new DestroyMessageExecutor(this.messageRepository)
                    )
                )
            )
        )

    }

}

export default MessageMessageExecutorManager