import React from 'react'
import { Form, Icon, Input, Button } from 'antd'

import './index.css'
import { notifyError, notifySuccess } from '../../utils/notify'
import { AuthContext } from '../../context/authContext'

class LoginForm extends React.Component {
	static contextType = AuthContext

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				const { username, password } = values
				if (username === 'admin' && password === 'admin123') {
					const user = { username }
					// Set AUTH_TOKEN & user to localStorage
					localStorage.setItem('user', JSON.stringify(user))
					// Update the auth context
					this.context.setUser(user)
					// notify success
					notifySuccess(`Successfully logged in as '${username}'`)
				} else {
					notifyError('No account found with the given credentials.', 'Wrong Credentials')
				}
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<div className="login-form-wrapper">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item hasFeedback>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your username!' }]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
							/>
						)}
					</Form.Item>
					<Form.Item hasFeedback>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }]
						})(
							<Input.Password
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm)

export default WrappedLoginForm
