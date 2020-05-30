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
import {LoadingComponent} from "./LoadingComponent";
import {getLocalStorage} from "../shared/utilities/localstorage";
import {ProtectedRoute} from "./ProtectedRoute";

const containerClass = css`
    height: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    max-width: 480px;
    position: relative;
`

const store = getLocalStorage()
const userData = store.getItem('user')

const initialState: IState = {
    transferHistories: [
        {amount: 5600, date: '02/03/2020'},
        {amount: 600, date: '02/03/2020'},
        {amount: 16200, date: '02/03/2020'}
    ],
    authenticationError: null,
    userData: userData ? userData.data : null,
    isLoading: false
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
                        <ProtectedRoute exact path="/menu" >
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
        </StateContext.Provider>
    );
}

export default App
