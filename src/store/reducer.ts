import {IState} from "./IState";
import * as actionTypes from "./actions";

export interface IAction {
    type: string
    payload?: any
}

export const reducer = (state: IState, action: IAction) => {
    switch(action.type) {
        case actionTypes.SET_REMAINING: {
            return {
                ...state,
                remaining: action.payload
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

        case actionTypes.TOGGLE_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }

        default: {
            return state
        }
    }
}
