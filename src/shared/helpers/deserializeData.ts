import {IUser} from "../models/IUser";

export function deserializeUserData (dataJson: any): IUser {
    return {
        fullName: `${dataJson.data.first_name} ${dataJson.data.last_name}`,
        balance: dataJson.balance
    }
}
