import {IState} from "./IState";
import * as actionTypes from "./actions";
import {initialState} from "../index";
import {IUser} from "../shared/models/IUser";
import {ITransferHistory} from "../shared/models/ITransferHistory";

export interface IAction {
    type: string
    payload?: any
}

export const reducer = (state: IState, action: IAction) => {
    switch(action.type) {
        case actionTypes.SET_BALANCE_SUCCESS: {
            return {
                ...state,
                balance: action.payload
            }
        }

        case actionTypes.SET_USER_DATA_SUCCESS: {
            return {
                ...state,
                userData: action.payload
            }
        }

        case actionTypes.SET_USER_DATA_FAILURE: {
            return {
                ...state,
                authenticationError: action.payload
            }
        }

        case actionTypes.SET_BALANCE_FAILURE: {
            return {
                ...state,
                balanceError: action.payload
            }
        }

        case actionTypes.TOGGLE_IS_BALANCE_LOADING: {
            return {
                ...state,
                isBalanceLoading: action.payload
            }
        }

        case actionTypes.SET_TRANSFER_SUCCESS: {
            return {
                ...state,
                transferHistories: action.payload
            }
        }

        case actionTypes.TOGGLE_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }

        case actionTypes.RESET_STORE: {
            return {
                authenticationError: null,
                userData: null,
                balance: null,
                transferHistories: [],
                isLoading: false,
                isBalanceLoading: false,
                balanceError: null
            }
        }

        default: {
            return state
        }
    }
}
