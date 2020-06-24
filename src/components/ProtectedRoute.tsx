import * as React from 'react'
import {Redirect, Route} from "react-router-dom";
import {useLogin} from "./hooks/useLogin";

interface IProtectedRouteProps {
    exact: boolean
    path: string
}

export const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = React.memo(props => {
    const {isLoggedIn} = useLogin()
    const {children, ...rest} = props

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? children : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
})
