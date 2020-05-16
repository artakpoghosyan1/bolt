import * as React from 'react';
import {css} from 'emotion'
import 'bootstrap/dist/css/bootstrap.min.css'
import {LoginComponent} from "./LoginComponent";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {IState} from "../store/IState";
import {IAction, reducer} from "../store/reducer";
import {MenuComponent} from "./MenuComponent";
import '../fonts/fonts.css'
import {TransferComponent} from "./TransferComponent";
import {TransferHistoryComponent} from "./TransferHistoryComponent";
import {HeaderComponent} from "./HeaderComponent";
import { withNamespaces } from 'react-i18next';

const containerClass = css`
    height: 100vh;
    padding-top: 15px;
    padding-bottom: 15px;
    max-width: 480px;
`

const initialState: IState = {
    remaining: 55550,
    transferHistories: [{amount: 5600, date: '02/03/2020'}, {amount: 600, date: '02/03/2020'}, {
        amount: 16200,
        date: '02/03/2020'
    }]
}

export const StateContext = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> | any }>(
    {state: initialState, dispatch: null}
)

const App: React.FunctionComponent = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <StateContext.Provider value={{state, dispatch: dispatch!}}>
            <Container className={containerClass}>
                <Router basename={'bolt'}>
                    <HeaderComponent/>

                    <Switch>
                        <Route exact strict path="/">
                            <LoginComponent/>
                        </Route>
                        <Route exact path="/menu">
                            <MenuComponent/>
                        </Route>
                        <Route exact path="/transfer">
                            <TransferComponent/>
                        </Route>
                        <Route exact path="/transfer-history">
                            <TransferHistoryComponent/>
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </StateContext.Provider>
    );
}

export default withNamespaces()(App);
