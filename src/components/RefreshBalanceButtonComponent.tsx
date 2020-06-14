import * as React from 'react'
import {resetButtonDefaultStyles, rotateAnimation} from "./styleHelper/mainStyles";
import {MdRefresh} from "react-icons/all";
import {mainColor} from "../constants/colors";
import {css} from "emotion";

interface IRefreshBalanceButtonComponentProps extends React.HtmlHTMLAttributes<HTMLElement>{
    isRefreshingBalance: boolean
}

const refreshBalanceClass = css`
    position: absolute;
    left: 100%;
    top: -6px;
    font-size: 24px;
    margin-left: 30px;
`

const rotateIconClass = css`
    animation: ${rotateAnimation} 1s infinite linear;
`

export const RefreshBalanceButtonComponent: React.FunctionComponent<IRefreshBalanceButtonComponentProps> = React.memo(props => {
    const {isRefreshingBalance, ...rest} = props

    return <button className={`${resetButtonDefaultStyles} ${refreshBalanceClass}`} {...rest}>
        <MdRefresh color={mainColor} className={isRefreshingBalance ? rotateIconClass : ''}/>
    </button>
})
