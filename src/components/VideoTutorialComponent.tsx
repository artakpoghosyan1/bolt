import * as React from 'react'
import {Modal} from "react-bootstrap";
import {TranslateComponent} from "./shared/TranslateComponent";
import {resetButtonDefaultStyles} from "./styleHelper/mainStyles";

interface IVideoTutorialComponentProps {
    show: boolean
    onHide: () => void
}

export const VideoTutorialComponent: React.FunctionComponent<IVideoTutorialComponentProps> = React.memo(props => {
    return <Modal show={props.show} centered>
        <Modal.Body>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/1WXkTKrIC4M" frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </Modal.Body>

        <Modal.Footer>
            <button className={`${resetButtonDefaultStyles}`} onClick={props.onHide}>
                <TranslateComponent messageKey='close'/>
            </button>
        </Modal.Footer>
    </Modal>
})
