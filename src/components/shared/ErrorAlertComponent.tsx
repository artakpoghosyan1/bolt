import * as React from 'react'
import {RiErrorWarningLine} from "react-icons/all";
import {Alert} from "react-bootstrap";
import {css} from "emotion";

interface IErrorAlertComponentProps {
}

const errorIconClass = css`
    margin-right: 9px;
`

export const ErrorAlertComponent: React.FunctionComponent<IErrorAlertComponentProps> = props => {
    return <Alert variant='danger'>
        <RiErrorWarningLine className={errorIconClass}/>
        {props.children}
    </Alert>
}
