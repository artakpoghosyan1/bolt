import * as React from 'react'
import {RiLoader2Line} from "react-icons/all";
import {css} from "emotion";
import {mainColor} from "../constants/colors";
import {rotateAnimation} from "./styleHelper/mainStyles";

interface ILoadingComponentProps {
    isLoading: boolean
    size?: string
    className?: string
}

const loadingClass = css`
    align-items: center;
    bottom: 0;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
    position: absolute;
`

const loadingIconClass = css`
    animation: ${rotateAnimation} 1.4s infinite linear;
`

export const LoadingComponent: React.FunctionComponent<ILoadingComponentProps> = React.memo(props => {
    return props.isLoading ? <div className={`${loadingClass} ${props.className}`}>
        <RiLoader2Line size={props.size} color={mainColor} className={loadingIconClass}/>
    </div> : null
})

LoadingComponent.defaultProps = {
    size: '80px'
}
