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
