import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {css} from "emotion";
import {useHistory} from "react-router-dom";
import {inputClass, lgMarginBottomClass, mainBtnClass} from "./styleHelper/mainStyles";
import {TitleComponent} from "./shared/TitleComponent";
import {useTranslation} from "react-i18next";
import {TranslateComponent} from "./shared/TranslateComponent";

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

export const LoginComponent: React.FunctionComponent = React.memo(() => {
    const history = useHistory();
    const [validated, setValidated] = React.useState(false)
    const {t} = useTranslation();


    const onSubmitHandler = (): void => {
        setValidated(true)
        history.push('./menu')
    }

    return (
        <div className={loginWrapperClass}>
            <TitleComponent>
                <TranslateComponent messageKey='loginTo'/>
                <p><TranslateComponent messageKey='loginDesc'/></p>
            </TitleComponent>

            <Form className={loginFormClass} noValidate validated={validated}>
                <Form.Group controlId="validationCustom01">
                    <Form.Control className={inputClass}
                                  required
                                  type="text"
                                  placeholder={t('phoneNumber')}
                    />
                </Form.Group>

                <Form.Group className={lgMarginBottomClass} controlId="formBasicPassword">
                    <Form.Control className={inputClass} required type="password" placeholder={t('password')}/>
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
