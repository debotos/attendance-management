import React, { Component } from 'react'
import { Router, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import PublicRoute from './utils/PublicRoute'
import PrivateRoute from './utils/PrivateRoute'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'

export const history = createHistory()

class AppRoutes extends Component {
	render() {
		return (
			<Router history={history}>
				<Switch>
					{/* Non-Authenticate Route (Public) */}
					<PublicRoute exact path="/" component={Login} />
					{/* Authenticate Route (Private) */}
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					{/* Add Other Routes below */}
					{/* If none of this match */}
					<Redirect to="/" />
				</Switch>
			</Router>
		)
	}
}

export default AppRoutes