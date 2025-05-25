import JoiValidationMiddleware from '../../../util/middleware/joiValidationMiddleware'
import MessageExecutorManager  from '../../../service/executor/messageExecutorManager'
import RegisterMessageExecutor from '../executor/registerMessageExecutor'
import LoginMessageExecutor    from '../executor/loginMessageExecutor'
import UserRepository          from '../../../repository/user/userRepository'
import UserRepositoryImpl      from '../../../repository/user/userRepositoryImpl'
import { RegisterValidation }  from '../validator/registrationValidation'
import { LoginValidation }     from '../validator/loginValidation'

class RegistrationMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()

        this.register(
            'register',
            new JoiValidationMiddleware(
                RegisterValidation.validationSchema,
                new RegisterMessageExecutor(this.userRepository)
            )
        )

        this.register(
            'login', 
            new JoiValidationMiddleware(
                LoginValidation.validationSchema,
                new LoginMessageExecutor(this.userRepository)
            )
        )
    }

}

export default RegistrationMessageExecutorManager