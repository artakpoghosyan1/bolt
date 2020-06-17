import {IState} from "./IState";
import * as actionTypes from "./actions";
import {initialState} from "../index";

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
                ...initialState
            }
        }

        default: {
            return state
        }
    }
}
