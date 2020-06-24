import * as React from 'react'
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {MdRefresh} from "react-icons/all";
import {mainColor} from "../constants/colors";
import {css} from "emotion";

interface IRefreshBalanceButtonComponentProps extends React.HtmlHTMLAttributes<HTMLElement>{
    isRefreshingBalance: boolean
}

const refreshBalanceClass = css`
    position: absolute;
    right: 0;
    top: 50%;
    font-size: 24px;
    margin-top: -15px;
`

export const RefreshBalanceButtonComponent: React.FunctionComponent<IRefreshBalanceButtonComponentProps> = React.memo(props => {
    const {isRefreshingBalance, ...rest} = props

    return <button className={`${resetButtonDefaultStyles} ${refreshBalanceClass}`} {...rest} disabled={isRefreshingBalance}>
        <MdRefresh color={mainColor}/>
    </button>
})
