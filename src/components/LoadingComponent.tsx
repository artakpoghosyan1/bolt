import * as React from 'react'
import {RiLoader2Line} from "react-icons/all";
import {css, keyframes} from "emotion";
import {mainColor} from "../constants/colors";

interface ILoadingComponentProps {
    isLoading: boolean
}
const loadingRotate = keyframes`
    0% {
        transform: rotate(0) 
    }
    
    100% {
        transform: rotate(360deg) 
    }
`

const loadingClass = css`
    align-items: center;
    bottom: 0;
    background-color: rgba(255,255,255,0.4);
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
    position: absolute;
`

const loadingIconClass = css`
    animation: ${loadingRotate} 1.4s infinite linear;
`

export const LoadingComponent: React.FunctionComponent<ILoadingComponentProps> = React.memo(props => {
    return props.isLoading ? <div className={loadingClass}>
        <RiLoader2Line size='80px' color={mainColor} className={loadingIconClass}/>
    </div> : null
})
