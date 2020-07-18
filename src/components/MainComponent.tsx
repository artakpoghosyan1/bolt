import * as React from "react";
import {css} from "emotion";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {secondaryBtnClass} from "./styleHelper/mainStyles";
import {FaDollarSign, FaHistory} from 'react-icons/fa';
import {TranslateComponent} from "./shared/TranslateComponent";
import {GiNewspaper, MdSlowMotionVideo, MdWork} from "react-icons/all";
import {VideoTutorialComponent} from "./VideoTutorialComponent";
import {BalanceComponent} from "./BalanceComponent";
import {ApiService} from "../shared/services/ApiService";
import {useLogin} from "./hooks/useLogin";
import {getLocalStorage} from "../shared/utilities/localstorage";

const menuItemClass = css`    
    & + & {
        margin-top: 15px;
    }
`

const menuItemIconsClass = css`
    margin-right: 4%;
`

const storage = getLocalStorage()
let loginIntervalId: any = null

export const MainComponent: React.FunctionComponent = React.memo(props => {
    const [openVideo, setOpenVideo] = React.useState(false)
    const history = useHistory()
    const {isLoggedIn, logout} = useLogin()

    const redirectToPage = (page: string) => {
        history.push(`./${page}`)
    }

    const openVideoHandler = () => {
        setOpenVideo(true)
    }

    const closeVideoHandler = () => {
        setOpenVideo(false)
    }

    React.useEffect(() => {
        if (isLoggedIn()) {
            loginIntervalId = setInterval(() => {
                const credentials = storage.getItem('credentials')

                ApiService().fetchData(`user/auth`, 'POST', null, {
                    username: credentials.username,
                    password: credentials.password
                }).then((response) => {
                    storage.setItem('jwt', response.access_token)
                    logout(() => {
                        clearInterval(loginIntervalId)
                    })
                })
            }, (13 * 60) * 1000)
        }
        return () => clearInterval(loginIntervalId)
    }, [isLoggedIn])

    return <React.Fragment>
        <BalanceComponent/>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={() => redirectToPage('transfer')}>
            <FaDollarSign className={menuItemIconsClass}/>
            <TranslateComponent messageKey='transferAmount'/>
        </Button>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={() => redirectToPage('transfer-history')}>
            <FaHistory className={menuItemIconsClass}/>
            <TranslateComponent messageKey='transferHistory'/>
        </Button>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={openVideoHandler}>
            <MdSlowMotionVideo className={menuItemIconsClass}/>
            <TranslateComponent messageKey='viewVideo'/>
        </Button>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={() => redirectToPage('about')}>
            <MdWork className={menuItemIconsClass}/>
            <TranslateComponent messageKey='about'/>
        </Button>

        <Button className={`${menuItemClass} ${secondaryBtnClass}`} onClick={() => redirectToPage('news')}>
            <GiNewspaper className={menuItemIconsClass}/>
            <TranslateComponent messageKey='news'/>
        </Button>
        <VideoTutorialComponent show={openVideo} onHide={closeVideoHandler}/>
    </React.Fragment>
})
