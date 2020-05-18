import React from "react";
import {css} from "emotion";

interface IErrorMessageComponentProps {
    message: string
}

const errorClass = css`
    font-size: 12px;
    color: red;
    margin-top: 5px;
`

export const ErrorMessageComponent: React.FunctionComponent<IErrorMessageComponentProps> = React.memo((props) => {
    return <p className={errorClass}>{props.message}</p>
})
