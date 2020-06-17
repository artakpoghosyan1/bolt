import * as React from 'react'
import {AiFillEye, AiFillEyeInvisible} from "react-icons/all";
import {mainTextColor} from "../constants/colors";
import {css} from "emotion";

interface IEyeIconComponentProps {
    onClick: () => void
    showPassword: boolean
}

const eyeIconClass = css`
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -11px;
`

export const EyeIconComponent: React.FunctionComponent<IEyeIconComponentProps> = React.memo(props => {
    return props.showPassword ?
        <AiFillEyeInvisible onClick={props.onClick} size={22} color={mainTextColor} className={eyeIconClass}/> :
        <AiFillEye onClick={props.onClick} size={22} color={mainTextColor} className={eyeIconClass}/>
})
