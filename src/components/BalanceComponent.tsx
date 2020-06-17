import * as React from 'react'
import {formatter} from "../shared/utilities/formatter";
import {TranslateComponent} from "./shared/TranslateComponent";
import {RefreshBalanceButtonComponent} from "./RefreshBalanceButtonComponent";
import {LoadingComponent} from "./LoadingComponent";
import {TitleComponent} from "./shared/TitleComponent";
import {StateContext} from "../index";
import {ApiService} from "../shared/services/ApiService";
import {SET_BALANCE_SUCCESS} from "../store/actions";
import {css} from "emotion";
import {getLocalStorage} from "../shared/utilities/localstorage";

const currencyClass = css`
    text-transform: lowercase;
    font-size: 18px;
    position: relative;
`

const balanceLoaderClass = css`
    position: static;
`

const remainingClass = css`
    font-size: 1.3rem;
    display: block;
`

const storage = getLocalStorage()

export const BalanceComponent: React.FunctionComponent = React.memo(() => {
    const [isRefreshingBalance, setIsRefreshingBalance] = React.useState(false)
    const {state, dispatch} = React.useContext(StateContext);

    const refreshClickHandler = React.useCallback(() => {
        setIsRefreshingBalance(true)
        const jwt = storage.getItem('jwt')

        ApiService().fetchData('balance', 'GET', jwt ? jwt : null).then(({balance}) => {
            dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
            storage.setItem('balance', balance)
            setIsRefreshingBalance(false)
        }, () => setIsRefreshingBalance(false))
    }, [])

    return <TitleComponent secondary>
        {state.balance ?
            <>
                {formatter(state.balance!)}

                <span className={currencyClass}>
                        <TranslateComponent messageKey='currency'/>

                        <RefreshBalanceButtonComponent isRefreshingBalance={isRefreshingBalance} onClick={refreshClickHandler}/>
                    </span>
            </> :

            <LoadingComponent className={balanceLoaderClass} isLoading={true} size='32px'/>
        }

        <p className={remainingClass}>
            <TranslateComponent messageKey='remaining'/>
        </p>
    </TitleComponent>
})
