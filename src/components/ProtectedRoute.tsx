import * as React from 'react'
import {Redirect, Route} from "react-router-dom";
import {getLocalStorage} from "../shared/utilities/localstorage";

interface IProtectedRouteProps {
    exact: boolean
    path: string
}

const storage = getLocalStorage()

export const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = React.memo(props => {
    const isLoggedIn = storage.getItem('user')
    const {children, ...rest} = props

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? children : (
                    <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                )
            }
        />
    )
})
