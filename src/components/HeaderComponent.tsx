import * as React from "react";
import {IoIosArrowBack, RiLogoutCircleRLine} from "react-icons/all";
import {withRouter, useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {mainTextColor} from "../constants/colors";
import {css} from "emotion";

import {LanguageDropdownComponent} from "./LanguageDropdownComponent";
import {useTranslation} from "react-i18next";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {StateContext} from "./App";


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
`

const backBtnClass = css`
    margin-right: 20px;
`

const storage = getLocalStorage()

const Header: React.FunctionComponent<IHeaderComponent> = React.memo((props) => {
    const {state} = React.useContext(StateContext);
    const canGoBack = props.location.pathname !== '/' && props.location.pathname !== '/menu'
    const history = useHistory()
    const {t} = useTranslation()

    const goBackHandler = () => {
        if (canGoBack) {
            props.history.goBack()
        }
    }

    const logoutHandler = () => {
        storage.removeItem('user')
        history.push('/')
    }

    return <header className={headerClass}>
        {canGoBack &&
        <button className={`${resetButtonDefaultStyles} ${backBtnClass}`} onClick={goBackHandler}>
            <IoIosArrowBack size={30} color={mainTextColor}/>
        </button>
        }

        <div className={userNameClass}>
            {state.userData!.fullName}
        </div>

        <LanguageDropdownComponent/>

        <button className={`${resetButtonDefaultStyles} ${logoutBtnClass}`} onClick={logoutHandler}>
             {t('logout')} <RiLogoutCircleRLine size={27} color={mainTextColor}/>
        </button>
    </header>
})

export const HeaderComponent = withRouter(Header);
