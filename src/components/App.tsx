import * as React from 'react';
import {css} from 'emotion'
import 'bootstrap/dist/css/bootstrap.min.css'
import {LoginComponent} from "./LoginComponent";
import {Container} from "react-bootstrap";
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {MainComponent} from "./MainComponent";
import '../fonts/fonts.css'
import {TransferComponent} from "./TransferComponent";
import {TransferHistoryComponent} from "./TransferHistoryComponent";
import {HeaderComponent} from "./HeaderComponent";
import {LoadingComponent} from "./LoadingComponent";
import {ProtectedRoute} from "./ProtectedRoute";
import {StateContext} from "../index";
import {AboutComponent} from "./AboutComponent";
import {NewsComponent} from "./NewsComponent";

const containerClass = css`
    height: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    max-width: 480px;
    position: relative;
`


const App: React.FunctionComponent = () => {
    const {state} = React.useContext(StateContext);

    return (
        <Container className={containerClass}>
            <Router basename={'/'}>
                <HeaderComponent/>

                <Switch>
                    <Route exact strict path="/login">
                        <LoginComponent/>
                    </Route>
                    <ProtectedRoute exact path="/">
                        <MainComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/transfer">
                        <TransferComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/transfer-history">
                        <TransferHistoryComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/about">
                        <AboutComponent/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/news">
                        <NewsComponent/>
                    </ProtectedRoute>
                    <Route path="*">
                        <Redirect to='/'/>
                    </Route>
                </Switch>
            </Router>

            <LoadingComponent isLoading={state.isLoading}/>
        </Container>
    );
}

export default App
