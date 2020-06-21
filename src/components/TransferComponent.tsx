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
import {BsInfoCircle, FaCheck} from "react-icons/all";
import {mainColor} from "../constants/colors";
import {WarningModalComponent} from "./shared/WarningModalComponent";
import {BalanceComponent} from "./BalanceComponent";

const rememberFieldGroupClass = css`
    margin-bottom: 30px;
`

const infoClass = css`
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
`

const amountFormGroupClass = css`
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
`

const amountFieldWrapperClass = css`
    flex-grow: 1;
`

const feeWrapperClass = css`
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 100px;
`

const feeAmountClass = css`
    color: ${mainColor};
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

const feeClass = css`
    font-size: 13px;
    text-align: right;
`

const hideSuccess =  keyframes`
    from {
        opacity: 1;
    }
    
    to {
        opacity: 0;
    }
`

const HIDE_SUCCESS_TIME = 6

const successClass = css`
    animation: ${hideSuccess} 2s ${HIDE_SUCCESS_TIME}s;
    svg {
        margin-right: 15px;
    }
`

const storage = getLocalStorage()
const MIN_BALANCE_AMOUNT = 1000

export const TransferComponent: React.FunctionComponent = React.memo(props => {
    const [validated, setValidated] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(!!storage.getItem('remember'))
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [accountId, setAccountId] = React.useState<string>('')
    const [amount, setAmount] = React.useState<string>('')
    const [showSuccess, setShowSuccess] = React.useState<boolean>(false)
    const [fee, setFee] = React.useState<number>(0)
    const {state} = React.useContext(StateContext);
    const {t} = useTranslation();

    const onSubmitHandler = () => {
        setValidated(true)

        if ((+state.balance! - +amount) <= MIN_BALANCE_AMOUNT) {
            setShowModal(true)
            return
        }


        // storage.setItem('remember', isChecked)
        // if (isChecked) {
        //     // storage.setItem('accountId', accountId.current!.value)
        // } else {
        //     storage.removeItem('accountId')
        // }
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

    const onAccountIdChange = (event: any) => {
        setAccountId(event.target.value)
    }

    const omAmountChange = ({target}: any) => {
        const value = target.value
        setAmount(value)

        setFee(calculateFee(value))
    }

    const calculateFee = (value: string) => +value * 1 / 100

    React.useEffect(() => {
        setTimeout(() => {
            setShowSuccess(false)
        }, HIDE_SUCCESS_TIME * 1000)
    }, [showSuccess])

    const disableTransfer = state.balance ? parseFloat(state.balance!) <= MIN_REMAINING : true

    return <div className={`${verticalCenteredLayoutClass} transfer-wrapper`}>
        <BalanceComponent/>

        {disableTransfer &&
        <Alert className={infoClass} variant='info'>
            <TranslateComponent messageKey='dontHaveEnoughMoney'/>

            <button className={`${resetButtonDefaultStyles} ${infoIconClass}`} onClick={showModalHandler}>
                <BsInfoCircle color={mainColor}/>
            </button>
        </Alert>
        }

        {showSuccess &&
        <Alert className={successClass} variant='success'>
            <FaCheck color={'green'}/>
            <TranslateComponent messageKey='successTransfer'/>
        </Alert>
        }
        <Form noValidate validated={validated}>
            <Form.Group>
                <Form.Control
                    onChange={onAccountIdChange}
                    className={inputClass}
                    value={accountId}
                    required
                    type="text"
                    placeholder={t('idramAccount')}
                    // defaultValue={storage.getItem('accountId') ? storage.getItem('accountId') : null}
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

            <Form.Group className={`${lgMarginBottomClass} ${amountFormGroupClass}`} controlId="formBasicPassword">
                <div className={amountFieldWrapperClass}>
                    <Form.Control
                        onChange={omAmountChange}
                        value={amount}
                        className={inputClass}
                        required
                        type="number"
                        placeholder={t('transferringAmount')}/>
                </div>
                <div className={feeWrapperClass}>
                    <div className={feeClass}>
                        <TranslateComponent messageKey='fee'/> 1%
                        <div className={feeAmountClass}>
                            {fee} <TranslateComponent messageKey='currency'/>
                        </div>
                    </div>
                </div>
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
