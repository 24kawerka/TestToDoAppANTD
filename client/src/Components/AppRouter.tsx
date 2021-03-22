import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { LOGIN_ROUTE } from '../Constants/routeConstants'

const AppRouter = () => {
    return (
        <Switch>
            {authRoutes.map((route) =>
                <Route key={route.path} path={route.path} component={route.Component} exact />
            )}
            {publicRoutes.map((route) =>
                <Route key={route.path} path={route.path} component={route.Component} exact />
            )}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    )
}
export { AppRouter }