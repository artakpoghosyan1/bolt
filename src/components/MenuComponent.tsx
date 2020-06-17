import * as React from "react";
import {css} from "emotion";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {secondaryBtnClass} from "./styleHelper/mainStyles";
import {FaDollarSign, FaHistory} from 'react-icons/fa';
import {TranslateComponent} from "./shared/TranslateComponent";
import {MdSlowMotionVideo, MdWork} from "react-icons/all";
import {VideoTutorialComponent} from "./VideoTutorialComponent";
import {BalanceComponent} from "./BalanceComponent";

const menuItemClass = css`    
    & + & {
        margin-top: 15px;
    }
`

const menuItemIconsClass = css`
    margin-right: 4%;
`

export const MenuComponent: React.FunctionComponent = React.memo(props => {
    const [openVideo, setOpenVideo] = React.useState(false)
    const history = useHistory()

    const redirectToPage = (page: string) => {
        history.push(`./${page}`)
    }

    const openVideoHandler = () => {
        setOpenVideo(true)
    }

    const closeVideoHandler = () => {
        setOpenVideo(false)
    }

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
        <VideoTutorialComponent show={openVideo} onHide={closeVideoHandler}/>
    </React.Fragment>
})
