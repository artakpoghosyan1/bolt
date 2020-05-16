import * as React from "react";
import {css} from "emotion";
import {mainColor, mainTextColor} from "../../constants/colors";

interface ITitleComponentProps {
    secondary?: boolean
}

const titleClass = css`
    margin-bottom: 45px;
    text-align: center;
    color: ${mainColor};
    border-radius: 2px;
    font-size: 21px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    p {
        font-size: 14px;
        color: ${mainTextColor};
        text-transform: lowercase;
        letter-spacing: 0.2px;
        width: 75%;
        margin: 16px auto 0;
    }
`

const titleSecondaryClass = css`
    margin-bottom: 8%;
    font-size: 1.7rem;
`

export const TitleComponent: React.FunctionComponent<ITitleComponentProps> = React.memo(props => {
    return <>
        {props.secondary ?
            <h2 className={`${titleClass} ${titleSecondaryClass}`}>{props.children}</h2> :
            <h1 className={titleClass}>{props.children}</h1>
        }
    </>
})
