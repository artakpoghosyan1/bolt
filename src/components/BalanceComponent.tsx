import * as React from 'react'
import {formatter} from "../shared/utilities/formatter";
import {TranslateComponent} from "./shared/TranslateComponent";
import {RefreshBalanceButtonComponent} from "./RefreshBalanceButtonComponent";
import {LoadingComponent} from "./LoadingComponent";
import {TitleComponent} from "./shared/TitleComponent";
import {StateContext} from "../index";
import {css} from "emotion";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {useGetBalance} from "./hooks/useGetBalance";
import {ErrorAlertComponent} from "./shared/ErrorAlertComponent";

const balanceClass = css`
    position: relative;
    min-width: 33px;
    min-height: 33px;
`

const currencyClass = css`
    position: relative;
    text-transform: lowercase;
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
`

const remainingClass = css`
    font-size: 1.3rem;
    display: block;
`

const storage = getLocalStorage()

export const BalanceComponent: React.FunctionComponent = React.memo(() => {
    const {state} = React.useContext(StateContext);
    const getBalance = useGetBalance()

    const refreshClickHandler = React.useCallback(() => {
        const jwt = storage.getItem('jwt')

        getBalance(jwt)
    }, [])

    return <>
        {state.balanceError &&
            <ErrorAlertComponent>
                <TranslateComponent messageKey='balanceNotFound'/>
            </ErrorAlertComponent>
        }

        <TitleComponent secondary>
            <div className={balanceClass}>
                {!state.isBalanceLoading && !state.balanceError &&
                <>
                    {formatter(state.balance!)}

                    <span className={currencyClass}>
                        <TranslateComponent messageKey='currency'/>
                    </span>
                </>
                }

                {state.balanceError && !state.isBalanceLoading && '-'}
                <RefreshBalanceButtonComponent
                    isRefreshingBalance={state.isBalanceLoading}
                    onClick={refreshClickHandler}/>
                <LoadingComponent isLoading={state.isBalanceLoading} size='32px'/>
            </div>


            <p className={remainingClass}>
                <TranslateComponent messageKey='remaining'/>
            </p>
        </TitleComponent>
    </>
})
