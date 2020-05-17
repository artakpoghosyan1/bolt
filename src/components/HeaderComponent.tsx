import * as React from "react";
import {IoIosArrowBack, RiLogoutCircleRLine, MdLanguage} from "react-icons/all";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";
import {mainTextColor} from "../constants/colors";
import {css} from "emotion";
import {DropdownButton, Dropdown} from "react-bootstrap";
import arm from '../assets/arm.png'
import ru from '../assets/rus.png'
import en from '../assets/usa.png'
import { useTranslation } from 'react-i18next';



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

const langDropdownClass = css`
    margin-right: 20px;
    width: auto;
    button {
        border: none;   
        background: none;
        
        &:after {
            border-top-color: ${mainTextColor};
        }
        
        &.dropdown-toggle,
        &:hover {
            background: none !important;
            outline: none !important;
            box-shadow: none !important;
        }
        
        &:focus {
            outline: none;
        }
    }
    
    .dropdown-menu {
        text-align: center;
        min-width: 5.8rem;
    }
    
    img {
        width: 40px;
    }
`

const Header: React.FunctionComponent<IHeaderComponent> = React.memo((props) => {
    const canGoBack = props.location.pathname !== '/'
    const { t, i18n } = useTranslation();

    const goBackHandler = () => {
        if (canGoBack) {
            props.history.goBack()
        }
    }

    const onLanguageChange = (lang: string): void => {
        i18n.changeLanguage(lang);
    }

    return <header className={headerClass}>
        {t('aaaa')}
        {canGoBack &&
        <button className={`${resetButtonDefaultStyles} ${backBtnClass}`} onClick={goBackHandler}>
            <IoIosArrowBack size={30} color={mainTextColor}/>
        </button>
        }

        {/*<button className={`${resetButtonDefaultStyles} ${langBtnClass}`} onClick={onLanguageChange}>*/}
        {/*</button>*/}
        <DropdownButton
            style={{minWidth: "100px"}}
            className={langDropdownClass}
            title={<MdLanguage size={27} color={mainTextColor}/>}
            id="dropdown-menu-align-right"
        >
            <Dropdown.Item eventKey="1" onClick={() => onLanguageChange('am')}>
                <img src={arm} alt=""/>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => onLanguageChange('ru')}>
                <img src={ru} alt=""/>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => onLanguageChange('en')}>
                <img src={en} alt=""/>
            </Dropdown.Item>
        </DropdownButton>

        <button className={`${resetButtonDefaultStyles} ${logoutBtnClass}`}>
            <RiLogoutCircleRLine size={27} color={mainTextColor}/>
        </button>
    </header>
})

export const HeaderComponent = withRouter(Header);
