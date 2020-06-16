import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './i18next'
import {IState} from "./store/IState";
import {IAction, reducer} from "./store/reducer";
import {getLocalStorage} from "./shared/utilities/localstorage";

const storage = getLocalStorage()
const userData = storage.getItem('user')
const balance = storage.getItem('balance')
const transferHistory = storage.getItem('transferHistory')

const initialState: IState = {
    transferHistories: transferHistory ? transferHistory : [],
    authenticationError: null,
    userData: userData ? userData.data : null,
    isLoading: false,
    balance: '3000'
}

export const StateContext = React.createContext<{ state: IState, dispatch: React.Dispatch<IAction> | any }>(
    {state: initialState, dispatch: null}
)

const Main: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return <StateContext.Provider value={{state, dispatch: dispatch!}}>
        <App/>
    </StateContext.Provider>
}

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<span>Loading...</span>}>
            <Main/>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
