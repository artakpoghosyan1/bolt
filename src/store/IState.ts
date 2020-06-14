import {ITransferHistory} from "../shared/models/ITransferHistory";
import {IUser} from "../shared/models/IUser";

export interface IState {
    authenticationError: string | null
    userData: IUser | null
    balance: string | null
    transferHistories: ITransferHistory[]
    isLoading: boolean
}
