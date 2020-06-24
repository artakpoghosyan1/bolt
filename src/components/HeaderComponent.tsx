import * as React from "react";
import {IoIosArrowBack, RiLogoutCircleRLine} from "react-icons/all";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {mainColor, mainTextColor} from "../constants/colors";
import {css} from "emotion";

import {LanguageDropdownComponent} from "./LanguageDropdownComponent";
import {StateContext} from "../index"
import {useLogin} from "./hooks/useLogin";
import {loginIntervalId} from "./App";
import {TranslateComponent} from "./shared/TranslateComponent";

interface IHeaderComponent extends RouteComponentProps {
}

const headerClass = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
`

const logoutBtnClass = css`
    color: ${mainTextColor};
`

const userNameClass = css`
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const backBtnClass = css`
    margin-right: 10px;
`

const Header: React.FunctionComponent<IHeaderComponent> = React.memo((props) => {
    const {state} = React.useContext(StateContext);
    const canGoBack = props.location.pathname !== '/login' && props.location.pathname !== '/'
    const {logout, isLoggedIn} = useLogin()

    const goBackHandler = () => {
        if (canGoBack) {
            props.history.goBack()
        }
    }

    const onLogoutClickHandler = () => {
        logout()
        clearInterval(loginIntervalId)
    }

    return <header className={headerClass}>
        {canGoBack &&
        <button className={`${resetButtonDefaultStyles} ${backBtnClass}`} onClick={goBackHandler}>
            <IoIosArrowBack size={30} color={mainColor}/>
        </button>
        }

        {isLoggedIn() &&
        <div className={userNameClass}>
            {state.userData!.fullName}
        </div>
        }
        <LanguageDropdownComponent/>

        {isLoggedIn() &&
        <button className={`${resetButtonDefaultStyles} ${logoutBtnClass}`} onClick={onLogoutClickHandler}>
            <TranslateComponent messageKey='logout'/> <RiLogoutCircleRLine size={27} color={mainTextColor}/>
        </button>
        }
    </header>
})

export const HeaderComponent = withRouter(Header);
