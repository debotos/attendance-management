import React from 'react'

/* user will hold { username } properties */
export const AuthContext = React.createContext({
	isAuthenticated: false,
	user: null,
	setUser: () => {}
})

const AuthProvider = AuthContext.Provider
const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
