import { IUser } from "../../model/user/user"

declare global {
    namespace Express {
        interface Request {
            user?: IUser | undefined
        }
    }
}
