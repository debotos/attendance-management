import React, { Component } from 'react'

import { AuthProvider } from './context/authContext'
import isEmpty from './utils/isEmpty'
import AppRoutes from './AppRoutes'

class App extends Component {
	componentDidMount() {
		/* at very first, Check for 'user' already logged in or not  */
		if (localStorage.user) {
			/* user exist */
			// So, Set the user info to UserContext
			const user = JSON.parse(localStorage.getItem('user'))
			this.setState({ user, isAuthenticated: !isEmpty(user) })
		}
	}

	constructor(props) {
		super(props)
		/* Don't change this state. It's purely for auth management */
		this.state = {
			isAuthenticated: false,
			user: null,
			setUser: user => this.setState({ user, isAuthenticated: !isEmpty(user) })
		}
	}

	render() {
		return (
			<AuthProvider value={this.state}>
				<AppRoutes />
			</AuthProvider>
		)
	}
}

export default App
