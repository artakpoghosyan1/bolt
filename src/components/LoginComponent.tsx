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
import {RiErrorWarningLine} from "react-icons/all";
import {EyeIconComponent} from "./EyeIconComponent";
import {ErrorAlertComponent} from "./shared/ErrorAlertComponent";

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

const passwordClass = css`
    position: relative;
`

const PHONE_MIN_LENGTH = 6
const PASS_MIN_LENGTH = 6

export const LoginComponent: React.FunctionComponent = React.memo(() => {
    const {t} = useTranslation();
    const {state} = React.useContext(StateContext);
    const history = useHistory()

    const [isValidPassword, setIsValidPassword] = React.useState(true)
    const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(true)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const passwordInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const phoneInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)

    const {error, login} = useLogin()

    const onSubmitHandler = (): void => {
        if (validateInputs()) {
            return
        }

        login(phoneInputRef.current!.value, passwordInputRef.current!.value).then(() => {
            history.push('/')
        })
    }

    const handleEnterKeyPress = (event: any) => {
        if(event.key === 'Enter') {
            onSubmitHandler()
        }
    }

    React.useEffect(() => {
        phoneInputRef.current!.setCustomValidity(error)
    }, [error])

    React.useEffect(() => {
        document.addEventListener('keypress', handleEnterKeyPress)

        return () => {
            document.removeEventListener('keypress', handleEnterKeyPress)
        }
    }, [])

    const validateInputs = () => {
        const validPhoneNumber = phoneInputRef.current!.value.length >= PHONE_MIN_LENGTH
        const validPassword = phoneInputRef.current!.value.length >= PASS_MIN_LENGTH

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
        // if (event.target.value.length >= PHONE_MIN_LENGTH) {
            setPhoneNumber(event.target.value)
        // }
    }

    const passwordOnChangeHandler = (event: any) => {
        setPassword(event.target.value)
    }

    const togglePassword = () => setShowPassword(showPassword => !showPassword)

    return (
        <div className={loginWrapperClass}>
            <TitleComponent>
                <TranslateComponent messageKey='loginTo'/>
                <p><TranslateComponent messageKey='loginDesc'/></p>
            </TitleComponent>

            {state.authenticationError &&
            <ErrorAlertComponent>
                {state.authenticationError}
            </ErrorAlertComponent>
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

                <Form.Group className={`${lgMarginBottomClass} ${passwordClass}`} controlId="formBasicPassword">
                    <Form.Control
                        onChange={passwordOnChangeHandler}
                        ref={passwordInputRef}
                        className={`${inputClass}`}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder={t('password')}
                    />

                    <EyeIconComponent onClick={togglePassword} showPassword={showPassword}/>

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
