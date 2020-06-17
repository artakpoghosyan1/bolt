import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {css} from "emotion";
import {mainTextColor, secondaryColor} from "../constants/colors";
import {useTranslation} from "react-i18next";
import am from "../assets/am.png";
import ru from "../assets/ru.png";
import en from "../assets/en.png";
import {getLocalStorage} from "../shared/utilities/localstorage";

const langDropdownClass = css`
    margin-right: 10px;
    width: auto;
    min-width: unset !important;
    
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
        
        img {
            width: 24px;
        }
    }
    
    .dropdown-menu {
        text-align: center;
        min-width: 5.8rem;
        padding: 0;
    }
    
    .dropdown-item.active {
        background-color: ${secondaryColor};
    }
    
    img {
        width: 35px;
    }
`

const storage = getLocalStorage()

export const LanguageDropdownComponent: React.FunctionComponent = React.memo(() => {
    const {i18n} = useTranslation();
    const flags: { [key: string]: any } = {
        am, ru, en
    }
    const langFromStorage = storage.getItem('lang')
    const [currentFlag, setCurrentFlag] = React.useState(langFromStorage ? flags[langFromStorage] : am)

    const onLanguageChange = (lang: string): void => {
        i18n.changeLanguage(lang)
        setCurrentFlag(flags[lang])
        storage.setItem('lang', lang)
    }

    React.useEffect(() => {
        setTimeout(() => {
            i18n.changeLanguage(langFromStorage ? langFromStorage : 'am');
        })
    }, [])

    return <DropdownButton
        style={{minWidth: "90px"}}
        className={langDropdownClass}
        title={<img src={currentFlag} alt=""/>}
        id="dropdown-menu-align-right"
    >
        {Object.keys(flags).map((flag: string, index: number) => (
            <Dropdown.Item
                key={flags[flag]}
                eventKey={`${index}`}
                onClick={() => onLanguageChange(flag)}
                active={flags[flag] === currentFlag}
            >

                <img src={flags[flag]} alt={flag}/>
            </Dropdown.Item>
        ))}
    </DropdownButton>
})
