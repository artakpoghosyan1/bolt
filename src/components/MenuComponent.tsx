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

const menuClass = css`
    
`

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
`

export const MenuComponent: React.FunctionComponent = React.memo(props => {
    const {state} = React.useContext(StateContext);
    const history = useHistory()

    const redirectToTransferPage = () => {
        history.push('./transfer')
    }

    const redirectToTransferHistoryPage = () => {
        history.push('./transfer-history')
    }

    return <div className={menuClass}>
        <TitleComponent secondary>
            {formatter(state.userData!.balance)}
            <span className={currencyClass}>
                <TranslateComponent messageKey='currency'/>
            </span>
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
    </div>
})
