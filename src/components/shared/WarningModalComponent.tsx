import * as React from 'react'
import { Modal } from 'react-bootstrap'
import {resetButtonDefaultStyles} from "../styleHelper/mainStyles";
import {mainColor, mainTextDarkColor} from "../../constants/colors";
import {css} from "emotion";
import {TranslateComponent} from "./TranslateComponent";

interface IWarningModalComponentProps {
    show: boolean
    onHide: () => void
}

const modalClass = css`
    color: ${mainTextDarkColor};
`

const closeBtnClass = css`
    color: ${mainColor};
`

export const WarningModalComponent: React.FunctionComponent<IWarningModalComponentProps> = React.memo(props => {
    return <Modal show={props.show} className={modalClass}>
        <Modal.Body>
            <p>
                <TranslateComponent messageKey='transferErrorMessage'/>
            </p>
        </Modal.Body>

        <Modal.Footer>
            <button className={`${resetButtonDefaultStyles} ${closeBtnClass}`} onClick={props.onHide}>
                <TranslateComponent messageKey='close'/>
            </button>
        </Modal.Footer>
    </Modal>
})
