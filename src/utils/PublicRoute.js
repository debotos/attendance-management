import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthConsumer } from '../context/authContext'

export const PublicRoute = ({ component: Component, ...restVars }) => (
	<AuthConsumer>
		{({ isAuthenticated }) => (
			<Route
				{...restVars}
				component={props =>
					isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
				}
			/>
		)}
	</AuthConsumer>
)

export default PublicRoute
