import { IUser } from "../../model/user"

declare global {
    namespace Express {
        interface Request {
            user?: IUser | undefined
        }
    }
}
