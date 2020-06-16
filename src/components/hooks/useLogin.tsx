import * as React from "react";
import {useHistory} from "react-router-dom"

import {ApiService} from "../../shared/services/ApiService";
import {deserializeTransferHistory, deserializeUserData} from "../../shared/helpers/deserializeData";
import * as types from "../../store/actions";
import {StateContext} from "../../index"
import {getLocalStorage} from "../../shared/utilities/localstorage";
import {IUser} from "../../shared/models/IUser";
import {SET_BALANCE_SUCCESS} from "../../store/actions";
import {SET_TRANSFER_SUCCESS} from "../../store/actions";

const storage = getLocalStorage()

interface IUseLogin {
    error: any
    login: (username: string, password: string) => Promise<IUser | null | any>
    isLoggedIn: () => boolean
    logout: () => void
}

export function useLogin(): IUseLogin {
    const {dispatch} = React.useContext(StateContext);
    const [error, setError] = React.useState<any>(null)
    const history = useHistory()

    const getUserOtherData = (jwt: string) => {
        ApiService().fetchData('balance', 'GET', jwt).then(({balance}) => {
            dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
            storage.setItem('balance', balance)
        }).catch((error) => {
            console.log('error', error)
        })

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
        }).then((response) => {debugger
            const userData = deserializeUserData(response)
            dispatch({type: types.SET_USER_DATA_SUCCESS, payload: userData})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            storage.setItem('user', {jwt: response.access_token, data: userData})
            storage.setItem('credentials', {username, password})
            getUserOtherData(response.access_token)
            return response
        }, (error) => {
            dispatch({type: types.SET_USER_DATA_FAILURE, payload: error.message})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            setError(error.message)
            return error
        })
    }

    const isLoggedIn = () => {
        return !!storage.getItem('user')
    }

    const logout = () => {
        storage.clear()
        history.push('/')
    }

    return {error, login, isLoggedIn, logout}
}
