import { IMessage } from '../../model/message/message'

abstract class MessageRepository {

    abstract save(iM: IMessage) : Promise<boolean>

    abstract update(iM: IMessage) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<IMessage[]>

    abstract getById(id: string): Promise<IMessage | null>

}

export default MessageRepository