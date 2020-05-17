import * as React from "react";
import {IoIosArrowBack, RiLogoutCircleRLine} from "react-icons/all";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {mainTextColor, secondaryColor} from "../constants/colors";
import {css} from "emotion";

import {LanguageDropdownComponent} from "./LanguageDropdownComponent";


interface IHeaderComponent extends RouteComponentProps {
}

const headerClass = css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`

const logoutBtnClass = css`
    
`

const backBtnClass = css`
    flex-grow: 1;
    text-align: left;
`

const Header: React.FunctionComponent<IHeaderComponent> = React.memo((props) => {
    const canGoBack = props.location.pathname !== '/'

    const goBackHandler = () => {
        if (canGoBack) {
            props.history.goBack()
        }
    }

    return <header className={headerClass}>
        {canGoBack &&
        <button className={`${resetButtonDefaultStyles} ${backBtnClass}`} onClick={goBackHandler}>
            <IoIosArrowBack size={30} color={mainTextColor}/>
        </button>
        }

        <LanguageDropdownComponent/>

        <button className={`${resetButtonDefaultStyles} ${logoutBtnClass}`}>
            <RiLogoutCircleRLine size={27} color={mainTextColor}/>
        </button>
    </header>
})

export const HeaderComponent = withRouter(Header);
