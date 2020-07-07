import * as React from 'react'
import {ApiService} from "../../shared/services/ApiService";
import {SET_BALANCE_FAILURE, SET_BALANCE_SUCCESS, TOGGLE_IS_BALANCE_LOADING} from "../../store/actions";
import {StateContext} from "../../index";
import {getLocalStorage} from "../../shared/utilities/localstorage";

const storage = getLocalStorage()

export const useGetBalance = () => {
    const {dispatch} = React.useContext(StateContext);

    const getBalance = (jwt: string) => {
        dispatch({type: TOGGLE_IS_BALANCE_LOADING, payload: true})

        ApiService().fetchData('balance', 'GET', jwt).then(({balance}) => {
            dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
            dispatch({type: TOGGLE_IS_BALANCE_LOADING, payload: false})
            dispatch({type: SET_BALANCE_FAILURE, payload: null})
            storage.setItem('balance', balance)
        }).catch(({message}) => {
            dispatch({type: SET_BALANCE_FAILURE, payload: message})
            dispatch({type: TOGGLE_IS_BALANCE_LOADING, payload: false})
            dispatch({type: SET_BALANCE_SUCCESS, payload: null})
            console.log('error', message)
        })
    }

    return getBalance
}
