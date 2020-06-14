import * as React from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {css, keyframes} from "emotion";
import {StateContext} from "../index"
import {MIN_REMAINING} from "../constants/minRemaining";
import {
    centerClass,
    inputClass,
    lgMarginBottomClass,
    mainBtnClass, resetButtonDefaultStyles,
    verticalCenteredLayoutClass
} from "./styleHelper/mainStyles";
import {TitleComponent} from "./shared/TitleComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {TranslateComponent} from "./shared/TranslateComponent";
import {useTranslation} from "react-i18next";
import {BsInfoCircle} from "react-icons/all";
import {mainColor} from "../constants/colors";
import {WarningModalComponent} from "./shared/WarningModalComponent";

const rememberFieldGroupClass = css`
    margin-bottom: 30px;
`

const infoClass = css`
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
`

const scaleAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    
    50% {
        transform: scale(1.08);
    }
    
    100% {
        transform: scale(1);
    }
`

const infoIconClass = css`
    animation: ${scaleAnimation} .7s infinite linear;
`

const storage = getLocalStorage()

export const TransferComponent: React.FunctionComponent = React.memo(props => {
    const [validated, setValidated] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(!!storage.getItem('remember'))
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const {state} = React.useContext(StateContext);
    const accountId: React.RefObject<HTMLInputElement> = React.useRef(null)
    const {t} = useTranslation();

    const onSubmitHandler = () => {
        setValidated(true)

        storage.setItem('remember', isChecked)

        if (isChecked) {
            storage.setItem('accountId', accountId.current!.value)
        } else {
            storage.removeItem('accountId')
        }
    }

    const checkOnchangeHandler = (event: any) => {
        setIsChecked(event.target.checked)
    }

    const showModalHandler = () => {
        setShowModal(true)
    }

    const hideModalHandler = () => {
        setShowModal(false)
    }

    const disableTransfer = state.balance ? parseFloat(state.balance!) <= MIN_REMAINING : true

    return <div className={`${verticalCenteredLayoutClass} transfer-wrapper`}>
        <TitleComponent>
            <TranslateComponent messageKey='transfer'/>
            <p><TranslateComponent messageKey='transferFromAvailable'/></p>
        </TitleComponent>
        {disableTransfer &&
        <Alert className={infoClass} variant='info'>
            <TranslateComponent messageKey='dontHaveEnoughMoney'/>

            <button className={`${resetButtonDefaultStyles} ${infoIconClass}`} onClick={showModalHandler}>
                <BsInfoCircle color={mainColor}/>
            </button>
        </Alert>
        }
        <Form noValidate validated={validated}>
            <Form.Group>
                <Form.Control
                    ref={accountId}
                    className={inputClass}
                    required
                    type="text"
                    placeholder={t('idramAccount')}
                    defaultValue={storage.getItem('accountId') ? storage.getItem('accountId') : null}
                />
            </Form.Group>
            <Form.Group className={rememberFieldGroupClass}>
                <Form.Check
                    onChange={checkOnchangeHandler}
                    custom
                    label={t('remember')}
                    type='checkbox'
                    id='remember-checkbox'
                    checked={isChecked}
                />
            </Form.Group>

            <Form.Group className={lgMarginBottomClass} controlId="formBasicPassword">
                <Form.Control
                    className={inputClass}
                    required type="number" placeholder={t('transferringAmount')}/>
            </Form.Group>

            <div className={centerClass}>
                <Button className={mainBtnClass} type="button" onClick={onSubmitHandler} disabled={disableTransfer}>
                    <TranslateComponent messageKey='transfer'/>
                </Button>
            </div>

            <WarningModalComponent show={showModal} onHide={hideModalHandler}/>
        </Form>
    </div>
})
