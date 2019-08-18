import React, { Component } from 'react'
import { Switch, Icon } from 'antd'

export class AttendanceForm extends Component {
	state = { checked: this.props.data.attended, loading: false }

	handleChange = checked => {
		this.setState({ checked, loading: true })
		this.props.setAttendance(this.props.data.id, checked)
		this.timer = setTimeout(() => this.setState({ loading: false }), 1500)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		const { checked } = this.state
		const { data, date, updateLoading } = this.props
		const { day } = data
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				<h4>{`${day}/${date}`}</h4>
				<div>
					<Switch
						key={day + Math.random()}
						checkedChildren={<Icon type="check" />}
						unCheckedChildren={<Icon type="close" />}
						checked={checked}
						loading={updateLoading}
						disabled={updateLoading}
						onChange={this.handleChange}
					/>
				</div>
			</div>
		)
	}
}

export default AttendanceForm
