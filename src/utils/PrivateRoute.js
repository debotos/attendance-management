import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthConsumer } from '../context/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<AuthConsumer>
		{({ isAuthenticated }) => (
			<Route
				{...rest}
				render={props =>
					isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
				}
			/>
		)}
	</AuthConsumer>
)

export default PrivateRoute