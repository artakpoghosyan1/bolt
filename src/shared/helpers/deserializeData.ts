import {IUser} from "../models/IUser";
import {ITransferHistory} from "../models/ITransferHistory";
import moment from "moment";

export function deserializeUserData (dataJson: any): IUser {
    return {
        fullName: `${dataJson.data.first_name} ${dataJson.data.last_name}`
    }
}

export function deserializeTransferHistory (dataJson: any): ITransferHistory {
    return dataJson.map((history: any) => {
        return {
            amount: history.amount,
            date: moment(history.createdAt).format('DD/MM/YYYY')
        }
    })
}
