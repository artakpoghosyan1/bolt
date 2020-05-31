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
    response: IUser | null
    error: any
    login: (username: string, password: string) => Promise<IUser | null>
    isLoggedIn: () => boolean
    logout: () => void
}

export function useLogin(): IUseLogin {
    const {dispatch} = React.useContext(StateContext);
    const [response, setResponse] = React.useState<IUser | null>(null)
    const [error, setError] = React.useState<any>(null)
    const history = useHistory()

    const login = (username: string, password: string): Promise<IUser | any> => {
        dispatch({type: types.TOGGLE_LOADING, payload: true})

        return ApiService().fetchData(`http://localhost:8800/user/auth`, 'POST', {
            username,
            password
        }).then((response) => {
            const userData = deserializeUserData(response)
            dispatch({type: types.SET_USER_DATA_SUCCESS, payload: userData})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            storage.setItem('user', {jwt: response.access_token, data: userData})
            storage.setItem('credentials', {username, password})
            setResponse(userData)
        }).catch(({error}) => {
            dispatch({type: types.SET_USER_DATA_FAILURE, payload: error.error.data.message})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            setError(error.error.data.message)
        })
    }

    const isLoggedIn = () => {
        return !!storage.getItem('user')
    }

    const logout = () => {
        storage.removeItem('user')
        storage.removeItem('credentials')
        history.push('/')
    }

    return {response, error, login, isLoggedIn, logout}
}
