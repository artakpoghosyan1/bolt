import * as React from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {css} from "emotion";
import {useHistory} from "react-router-dom";
import {inputClass, lgMarginBottomClass, mainBtnClass} from "./styleHelper/mainStyles";
import {TitleComponent} from "./shared/TitleComponent";
import {useTranslation} from "react-i18next";
import {TranslateComponent} from "./shared/TranslateComponent";
import {ApiService} from "../shared/services/ApiService";
import {StateContext} from "./App";
import {ErrorMessageComponent} from "./shared/ErrorMessageComponent";
import {deserializeUserData} from "../shared/helpers/deserializeData";
import * as types from "../store/actions";
import {getLocalStorage} from "../shared/utilities/localstorage";

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
    const history = useHistory();
    const {t} = useTranslation();
    const {state, dispatch} = React.useContext(StateContext);

    const [isValidPassword, setIsValidPassword] = React.useState(true)
    const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(true)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')

    const passwordInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)
    const phoneInputRef: React.RefObject<HTMLInputElement> = React.useRef(null)

    const onSubmitHandler = (): void => {
        if (validateInputs()) {
            return
        }

        dispatch({type: types.TOGGLE_LOADING, payload: true})
        ApiService().fetchData(`http://localhost:8800/user/auth`, 'POST', {
            username: phoneNumber,
            password: password
        }).then((response) => {
            const userData = deserializeUserData(response)
            dispatch({type: types.SET_USER_DATA_SUCCESS, payload: userData})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            storage.setItem('user', {jwt: response.access_token, data: userData})
            history.push('/menu')
        }).catch(({error}) => {
            dispatch({type: types.SET_USER_DATA_FAILURE, payload: error.error.data.message})
            dispatch({type: types.TOGGLE_LOADING, payload: false})
            phoneInputRef.current!.setCustomValidity(error.error.data.message)
        })
    }

    React.useEffect(() => {
        console.log(state)
    }, [state])

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
