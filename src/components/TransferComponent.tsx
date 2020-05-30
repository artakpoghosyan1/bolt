import * as React from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {css} from "emotion";
import {StateContext} from "./App";
import {MIN_REMAINING} from "../constants/minRemaining";
import {
    centerClass,
    inputClass,
    lgMarginBottomClass,
    mainBtnClass,
    verticalCenteredLayoutClass
} from "./styleHelper/mainStyles";
import {TitleComponent} from "./shared/TitleComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {TranslateComponent} from "./shared/TranslateComponent";
import {useTranslation} from "react-i18next";

const rememberFieldGroupClass = css`
    margin-bottom: 30px;
`

const infoClass = css`
    margin-bottom: 40px;
`

const storage = getLocalStorage()

export const TransferComponent: React.FunctionComponent = React.memo(props => {
    const [validated, setValidated] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(!!storage.getItem('remember'))
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

    const disableTransfer = state.userData!.balance <= MIN_REMAINING

    return <div className={`${verticalCenteredLayoutClass} transfer-wrapper`}>
        <TitleComponent>
            <TranslateComponent messageKey='transfer'/>
            <p><TranslateComponent messageKey='transferFromAvailable'/></p>
        </TitleComponent>
        {disableTransfer &&
        <Alert className={infoClass} variant='info'>
            <TranslateComponent messageKey='dontHaveEnoughMoney'/>
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
        </Form>
    </div>
})
