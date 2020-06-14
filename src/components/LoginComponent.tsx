import * as React from "react";
import {useHistory} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";
import {css} from "emotion";
import {inputClass, lgMarginBottomClass, mainBtnClass} from "./styleHelper/mainStyles";
import {TitleComponent} from "./shared/TitleComponent";
import {useTranslation} from "react-i18next";
import {TranslateComponent} from "./shared/TranslateComponent";
import {StateContext} from "../index"
import {ErrorMessageComponent} from "./shared/ErrorMessageComponent";
import {useLogin} from "./hooks/useLogin";
import {ApiService} from "../shared/services/ApiService";
import {SET_BALANCE_SUCCESS, SET_TRANSFER_SUCCESS} from "../store/actions";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {deserializeTransferHistory} from "../shared/helpers/deserializeData";

const loginWrapperClass = css`
    padding-top: 50px;
`

const forgotPassClass = css`
    display: block;
    margin-top: 17px;
    text-align: right;
`

const loginFormClass = css`
    text-align: center;
`

const loginBtnClass = css`
    margin-top: 50px;
`

const PHONE_MIN_LENGTH = 11
const PASS_MIN_LENGTH = 6

const storage = getLocalStorage()

export const LoginComponent: React.FunctionComponent = React.memo(() => {
    const {t} = useTranslation();
    const {state, dispatch} = React.useContext(StateContext);
    const history = useHistory()

    const [isValidPassword, setIsValidPassword] = React.useState(true)
    const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(true)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')

    const passwordInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const phoneInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)

    const {error, login} = useLogin()

    const onSubmitHandler = (): void => {
        if (validateInputs()) {
            return
        }

        login(phoneNumber, password).then((user) => {
            history.push('/menu')
            const jwt = user ? user.access_token : null
            ApiService().fetchData('balance', 'GET', jwt).then(({balance}) => {debugger
                dispatch({type: SET_BALANCE_SUCCESS, payload: balance})
                storage.setItem('balance', balance)
            }).catch((error) => {
                console.log('error', error)
            })

            ApiService().fetchData('transactions', 'GET', jwt).then(data => {
                const transferHistory = deserializeTransferHistory(data)
                dispatch({type: SET_TRANSFER_SUCCESS, payload: transferHistory})
                storage.setItem('transferHistory', transferHistory)
            })
        })
    }

    React.useEffect(() => {
        phoneInputRef.current!.setCustomValidity(error)
    }, [error])

    const validateInputs = () => {
        const validPhoneNumber = phoneNumber.length === PHONE_MIN_LENGTH
        const validPassword = password.length >= PASS_MIN_LENGTH

        if (!validPhoneNumber) {
            phoneInputRef.current!.setCustomValidity('phoneNumberError')
        }

        if (!validPassword) {
            passwordInputRef.current!.setCustomValidity('passwordError')
        }

        setIsValidPhoneNumber(validPhoneNumber)
        setIsValidPassword(validPassword)

        return !validPhoneNumber || !validPassword
    }

    const phoneNumberOnChangeHandler = (event: any) => {
        if (event.target.value.length <= PHONE_MIN_LENGTH) {
            setPhoneNumber(event.target.value)
        }
    }

    const passwordOnChangeHandler = (event: any) => {
        setPassword(event.target.value)
    }

    return (
        <div className={loginWrapperClass}>
            <TitleComponent>
                <TranslateComponent messageKey='loginTo'/>
                <p><TranslateComponent messageKey='loginDesc'/></p>
            </TitleComponent>

            {state.authenticationError &&
            <Alert variant='danger'>
                {state.authenticationError}
            </Alert>
            }

            <Form className={`${loginFormClass} ${!isValidPassword && !isValidPhoneNumber ? 'was-validated' : ''}`}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control
                        onChange={phoneNumberOnChangeHandler}
                        ref={phoneInputRef}
                        className={`${inputClass} `}
                        type="text"
                        value={phoneNumber}
                        placeholder={t('phoneNumber')}
                    />

                    {!isValidPhoneNumber &&
                    <ErrorMessageComponent message={t(phoneInputRef.current!.validationMessage)}/>
                    }
                </Form.Group>

                <Form.Group className={lgMarginBottomClass} controlId="formBasicPassword">
                    <Form.Control
                        onChange={passwordOnChangeHandler}
                        ref={passwordInputRef}
                        className={`${inputClass}`}
                        type="password"
                        value={password}
                        placeholder={t('password')}
                    />

                    {!isValidPassword &&
                    <ErrorMessageComponent message={t(passwordInputRef.current!.validationMessage)}/>
                    }
                </Form.Group>

                <a href="#" className={forgotPassClass}>
                    <TranslateComponent messageKey={'forgotPass'}/>
                </a>

                <Button className={`${mainBtnClass} ${loginBtnClass}`} type="button" onClick={onSubmitHandler}>
                    <TranslateComponent messageKey='login'/>
                </Button>
            </Form>
        </div>
    );
})
