import * as React from 'react'
import {TranslateComponent} from "./shared/TranslateComponent";
import {TitleComponent} from "./shared/TitleComponent";
import {css} from "emotion";
import {mainColor} from "../constants/colors";
import ListGroup from "react-bootstrap/ListGroup";
import {FaMapMarkerAlt, TiPhone} from "react-icons/all";

const aboutContainerClass = css`
    height: calc(100% - 57px);
    display: flex;
    flex-direction: column;
`

const phoneNumberClass = css`
    margin-left: 5px;
    
    &, &:hover {
        color: ${mainColor};
        text-decoration: none;
    }
`

const phoneListClass = css`
    margin: 25px 0;
    
    & > div {
        background: none;
        padding-left: 0;
        padding-right: 0;
    }
`

const addressClass = css`
    white-space: pre-wrap;
    
    p:last-child {
        margin: 0;
    }
`

const mapClass = css`
    flex-grow: 1;
`

const maoIconClass = css`
    margin-right: 5px;
`

export const AboutComponent: React.FunctionComponent = React.memo(props => {
    return <div className={aboutContainerClass}>
        <TitleComponent>
            <TranslateComponent messageKey='about'/>
        </TitleComponent>

        <div className={addressClass}>
            <p>
                <TranslateComponent messageKey='addressTitle'/>
            </p>
            <p>
                <FaMapMarkerAlt className={maoIconClass}/>
                <TranslateComponent messageKey='address'/>
            </p>
        </div>

        <ListGroup variant="flush" className={phoneListClass}>
            <ListGroup.Item>
                <TiPhone/>
                <a href='tel:095-16-66-33' className={phoneNumberClass}>095-16-66-33</a> / Viber, WhatsApp /
            </ListGroup.Item>
            <ListGroup.Item>
                <TiPhone/>
                <a href='tel:094-69-03-06' className={phoneNumberClass}>094-69-03-06</a> / Viber, WhatsApp /
            </ListGroup.Item>
            <ListGroup.Item>
                <TiPhone/>
                <a href='tel:099-69-64-64' className={phoneNumberClass}>099-69-64-64</a> / Viber, WhatsApp /
            </ListGroup.Item>
        </ListGroup>

        <div className={mapClass}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1524.7326134643654!2d44.48629455817586!3d40.154194394849135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA5JzE1LjEiTiA0NMKwMjknMTQuNiJF!5e0!3m2!1sen!2sus!4v1592421593602!5m2!1sen!2sus"
                width="100%" height="100%" frameBorder="0"  allowFullScreen aria-hidden="false"/>
        </div>
    </div>
})
