import * as React from "react";
import {useHistory} from "react-router-dom"

import {ApiService} from "../../shared/services/ApiService";
import {deserializeUserData} from "../../shared/helpers/deserializeData";
import * as types from "../../store/actions";
import {StateContext} from "../../index"
import {getLocalStorage} from "../../shared/utilities/localstorage";
import {IUser} from "../../shared/models/IUser";

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

    const login = (username: string, password: string): Promise<IUser | any> => {
        dispatch({type: types.TOGGLE_LOADING, payload: true})

        return ApiService().fetchData(`user/auth`, 'POST', null, {
            username,
            password
        }).then((response) => {
            const userData = deserializeUserData(response)
            dispatch({type: types.SET_USER_DATA_SUCCESS, payload: userData})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            storage.setItem('user', {jwt: response.access_token, data: userData})
            storage.setItem('credentials', {username, password})
            return response
        }, (error) => {
            const {error: data} = error
            dispatch({type: types.SET_USER_DATA_FAILURE, payload: data.message})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            setError(data.message)
            return error
        }).catch((error) => {
            console.log('unhandled error', error)
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
