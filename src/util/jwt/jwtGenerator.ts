import jwt       from 'jsonwebtoken'
import { Types } from 'mongoose'

class JwtGenerator {

    public static generate(id: Types.ObjectId, secret: string): string {
        return jwt.sign(
            { 
                id: id
            },
            secret,
            {
                expiresIn: '1d'
            }
        )
    }

}

export default JwtGenerator