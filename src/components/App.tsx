import * as React from 'react';
import {css} from 'emotion'
import 'bootstrap/dist/css/bootstrap.min.css'
import {LoginComponent} from "./LoginComponent";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {MenuComponent} from "./MenuComponent";
import '../fonts/fonts.css'
import {TransferComponent} from "./TransferComponent";
import {TransferHistoryComponent} from "./TransferHistoryComponent";
import {HeaderComponent} from "./HeaderComponent";
import {LoadingComponent} from "./LoadingComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {ProtectedRoute} from "./ProtectedRoute";
import {useLogin} from "./hooks/useLogin";
import {StateContext} from "../index";

const containerClass = css`
    height: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    max-width: 480px;
    position: relative;
`

const storage = getLocalStorage()
export let loginIntervalId: any

const App: React.FunctionComponent = () => {
    const {login} = useLogin()
    const {state} = React.useContext(StateContext);

    React.useEffect(() => {
        if (state.userData) {
            loginIntervalId = setInterval(() => {
                const credentials = storage.getItem('credentials')

                login(credentials.username, credentials.password).then(({access_token}) => {
                    storage.setItem('user', {jwt: access_token, data: state.userData})
                }, (error) => {
                    console.log('auth error', error)
                })
            }, 13000)

        }
        return () => clearInterval(loginIntervalId)
    }, [state.userData])

    return (
        <Container className={containerClass}>
            <Router basename={'bolt'}>
                <HeaderComponent/>

                <Switch>
                    <Route exact strict path="/">
                        <LoginComponent/>
                    </Route>
                    <ProtectedRoute exact path="/menu">
                        <MenuComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/transfer">
                        <TransferComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/transfer-history">
                        <TransferHistoryComponent/>
                    </ProtectedRoute>
                </Switch>
            </Router>

            <LoadingComponent isLoading={state.isLoading}/>
        </Container>
    );
}

export default App
