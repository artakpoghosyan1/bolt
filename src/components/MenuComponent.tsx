import * as React from "react";
import {css} from "emotion";
import {StateContext} from "../index"
import {useHistory} from "react-router-dom";
import {TitleComponent} from "./shared/TitleComponent";
import {Button} from "react-bootstrap";
import {secondaryBtnClass} from "./styleHelper/mainStyles";
import {FaDollarSign, FaHistory} from 'react-icons/fa';
import {formatter} from "../shared/utilities/formatter";
import {TranslateComponent} from "./shared/TranslateComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {LoadingComponent} from "./LoadingComponent";
import {ApiService} from "../shared/services/ApiService";
import {SET_BALANCE_SUCCESS} from "../store/actions";
import {RefreshBalanceButtonComponent} from "./RefreshBalanceButtonComponent";

const menuItemClass = css`    
    & + & {
        margin-top: 15px;
    }
`

const remainingClass = css`
    font-size: 1.3rem;
    display: block;
`

const menuItemIconsClass = css`
    margin-right: 4%;
`

const currencyClass = css`
    text-transform: lowercase;
    font-size: 18px;
    position: relative;
`

const balanceLoaderClass = css`
    position: static;
`

const storage = getLocalStorage()

export const MenuComponent: React.FunctionComponent = React.memo(props => {
    const [isRefreshingBalance, setIsRefreshingBalance] = React.useState(false)
    const {state, dispatch} = React.useContext(StateContext);
    const history = useHistory()

    const redirectToTransferPage = () => {
        history.push('./transfer')
    }

    const redirectToTransferHistoryPage = () => {
        history.push('./transfer-history')
    }

    const refreshClickHandler = React.useCallback(() => {
        setIsRefreshingBalance(true)
        const user = storage.getItem('user')

        ApiService().fetchData('balance', 'GET', user ? user.jwt : null).then(({balance}) => {
            dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
            storage.setItem('balance', balance)
            setIsRefreshingBalance(false)
        }, () => setIsRefreshingBalance(false))
    }, [])

    return <React.Fragment>
        <TitleComponent secondary>
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

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={redirectToTransferPage}>
            <FaDollarSign className={menuItemIconsClass}/>
            <TranslateComponent messageKey='transferAmount'/>
        </Button>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={redirectToTransferHistoryPage}>
            <FaHistory className={menuItemIconsClass}/>
            <TranslateComponent messageKey='transferHistory'/>
        </Button>
    </React.Fragment>
})
