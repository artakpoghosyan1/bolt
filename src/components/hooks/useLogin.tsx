import * as React from "react";
import {useHistory} from "react-router-dom"

import {ApiService} from "../../shared/services/ApiService";
import {deserializeTransferHistory, deserializeUserData} from "../../shared/helpers/deserializeData";
import * as types from "../../store/actions";
import {StateContext} from "../../index"
import {getLocalStorage} from "../../shared/utilities/localstorage";
import {IUser} from "../../shared/models/IUser";
import {SET_TRANSFER_SUCCESS} from "../../store/actions";
import {useGetBalance} from "./useGetBalance";

const storage = getLocalStorage()

interface IUseLogin {
    error: any
    login: (username: string, password: string) => Promise<IUser | null | any>
    isLoggedIn: () => boolean
    logout: () => void
}

export function useLogin(): IUseLogin {
    const {state, dispatch} = React.useContext(StateContext)
    const [error, setError] = React.useState<any>(null)
    const history = useHistory()
    const getBalance = useGetBalance()

    const getTransactions = (jwt: string) => {
        ApiService().fetchData('transactions', 'GET', jwt).then(data => {
            const transferHistory = deserializeTransferHistory(data)
            dispatch({type: SET_TRANSFER_SUCCESS, payload: transferHistory})
            storage.setItem('transferHistory', transferHistory)
        })
    }

    const login = (username: string, password: string): Promise<IUser | any> => {
        dispatch({type: types.TOGGLE_LOADING, payload: true})

        return ApiService().fetchData(`user/auth`, 'POST', null, {
            username,
            password
        }).then((response) => {
            const userData = deserializeUserData(response)
            if(state.authenticationError) {
                dispatch({type: types.SET_USER_DATA_FAILURE, payload: null})
            }
            dispatch({type: types.SET_USER_DATA_SUCCESS, payload: userData})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            storage.setItem('user', userData)
            storage.setItem('jwt', response.access_token)
            storage.setItem('credentials', {username, password})
            getTransactions(response.access_token)
            getBalance(response.access_token)
            return response
        }, (error) => {
            dispatch({type: types.SET_USER_DATA_FAILURE, payload: error.message})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            setError(error.message)
            return error
        })
    }

    const isLoggedIn = () => {
        return !!storage.getItem('jwt')
    }

    const logout = () => {
        storage.clear().then(() => {
            dispatch({type: types.RESET_STORE})
            history.push('/')
        })
    }

    return {error, login, isLoggedIn, logout}
}
