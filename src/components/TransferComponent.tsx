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
import {getLocalStorage} from "../shared/utilities/localstorage";
import {TranslateComponent} from "./shared/TranslateComponent";
import {useTranslation} from "react-i18next";
import {BsInfoCircle, FaCheck, MdErrorOutline} from "react-icons/all";
import {mainColor} from "../constants/colors";
import {WarningModalComponent} from "./shared/WarningModalComponent";
import {BalanceComponent} from "./BalanceComponent";
import {ApiService} from "../shared/services/ApiService";
import {SET_BALANCE_SUCCESS} from "../store/actions";

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

// const amountFieldWrapperClass = css`
//     flex-grow: 1;
// `
//
// const feeWrapperClass = css`
//     padding-left: 10px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     min-width: 100px;
// `
//
// const feeAmountClass = css`
//     color: ${mainColor};
// `

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

// const feeClass = css`
//     font-size: 13px;
// `

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
    const accountIdFromStorage = storage.getItem('accountId') || ''
    const [validated, setValidated] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(!!storage.getItem('remember'))
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [accountId, setAccountId] = React.useState<string>(accountIdFromStorage)
    const [amount, setAmount] = React.useState<string>('')
    const [transferSuccess, setTransferSuccess] = React.useState<boolean>(false)
    const [transferFailure, setTransferFailure] = React.useState<string>('')
    // const [fee, setFee] = React.useState<number>(0)
    const {state, dispatch} = React.useContext(StateContext);
    const {t} = useTranslation();

    const onSubmitHandler = () => {
        setValidated(true)

        if ((+state.balance! - +amount) <= MIN_BALANCE_AMOUNT) {
            setShowModal(true)
            return
        }

        rememberAccountId()

        const jwt = storage.getItem('jwt')
        const data = {amount, idramId: accountId}

        ApiService().fetchData('balance', 'POST', jwt, data).then(({balance}) => {
            dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
            if(transferFailure) {
                setTransferFailure('')
            }
        }).catch((error) => {
            console.log('transfer error', error)
            if(error.status === 400) {
                setTransferFailure('dontHaveEnoughMoney')
            } else if (error.status === 500) {
                setTransferFailure('serverFailure')
            }
        })
    }

    const rememberAccountId = () => {
        storage.setItem('remember', isChecked)
        if (isChecked) {
            storage.setItem('accountId', accountId)
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

    const onAccountIdChange = (event: any) => {
        setAccountId(event.target.value)
    }

    const omAmountChange = ({target}: any) => {
        const value = target.value
        setAmount(value)

        // setFee(calculateFee(value))
    }

    // const calculateFee = (value: string) => +value * 1 / 100

    React.useEffect(() => {
        setTimeout(() => {
            setTransferSuccess(false)
        }, HIDE_SUCCESS_TIME * 1000)
    }, [transferSuccess])

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

        {transferSuccess &&
        <Alert className={successClass} variant='success'>
            <FaCheck color={'green'}/>
            <TranslateComponent messageKey='successTransfer'/>
        </Alert>
        }

        {transferFailure &&
        <Alert className={successClass} variant='danger'>
            <MdErrorOutline color={'red'}/>
            <TranslateComponent messageKey={transferFailure}/>
        </Alert>
        }
        <Form noValidate validated={validated}>
            <Form.Group>
                <Form.Control
                    onChange={onAccountIdChange}
                    className={inputClass}
                    disabled={true}
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
                    disabled={true}
                    label={t('remember')}
                    type='checkbox'
                    id='remember-checkbox'
                    checked={isChecked}
                />
            </Form.Group>

            <Form.Group className={`${lgMarginBottomClass} ${amountFormGroupClass}`} controlId="formBasicPassword">
                <Form.Control
                    onChange={omAmountChange}
                    value={amount}
                    disabled={true}
                    className={inputClass}
                    required
                    type="number"
                    placeholder={t('transferringAmount')}/>
                {/*<div className={amountFieldWrapperClass}>
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
                </div>*/}
            </Form.Group>

            <div className={centerClass}>
                <Button className={mainBtnClass} type="button" onClick={onSubmitHandler} disabled={true}>
                    <TranslateComponent messageKey='transfer'/>
                </Button>
            </div>

            <WarningModalComponent show={showModal} onHide={hideModalHandler}/>
        </Form>
    </div>
})
