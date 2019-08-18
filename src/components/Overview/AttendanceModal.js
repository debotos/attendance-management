import React, { Component } from 'react'
import { Tabs, Spin, List } from 'antd'

import db from '../../config/db'
import { getDate, getAttendancePlaceholder } from '../../utils/helpers'
import AttendanceForm from './AttendanceForm'

const { TabPane } = Tabs

export class AttendanceModal extends Component {
	findAttendance = async (subject, date, reg) => {
		this.setState({ loading: true })
		const result = await db.attendance.findOne({ subject, date, reg })
		if (result) {
			this.setState({ result: result.dataSet })
		} else {
			/* Make a default UI */
			this.setState({ result: getAttendancePlaceholder() })
		}
		this.setState({ loading: false })
		return result
	}

	setAttendance = async (id, value) => {
		console.log('Updating an attendance.')
		this.setState({ updateLoading: true })
		const { data } = this.props
		if (!data) return null
		const { reg } = data
		const updates = this.state.result.map(x => {
			if (x.id === id) {
				return { ...x, attended: value }
			} else {
				return x
			}
		})
		const exist = await db.attendance.findOne({
			subject: this.state.activeSubject,
			date: getDate(),
			reg
		})
		if (exist) {
			console.log('Exist doc:', exist)
			/* So update */
			await db.attendance.update(
				{ subject: this.state.activeSubject, date: getDate(), reg: reg },
				{ $set: { dataSet: updates } }
			)
		} else {
			/* else create */
			await db.attendance.insert({
				subject: this.state.activeSubject,
				date: getDate(),
				reg: reg,
				dataSet: updates
			})
		}

		this.setState({ updateLoading: false, result: updates })
	}

	state = { activeSubject: null, result: null, loading: true, updateLoading: false }

	async componentDidMount() {
		const { data } = this.props
		if (!data) return null
		const { reg, subjects } = data
		const TabItems = subjects.split(',')
		this.setState({ activeSubject: TabItems[0], result: null }, async () => {
			await this.findAttendance(TabItems[0], getDate(), reg)
		})
	}

	render() {
		const { data } = this.props
		const { result, loading, updateLoading } = this.state
		// console.log(result)
		if (!data) return null
		const { reg, subjects } = data
		const TabItems = subjects.split(',')
		return (
			<Tabs
				defaultActiveKey={TabItems[0]}
				tabPosition={'top'}
				style={{ minHeight: 300 }}
				/* To update the tab content */
				onChange={activeKey =>
					this.setState({ activeSubject: activeKey }, async () => {
						await this.findAttendance(activeKey, getDate(), reg)
					})
				}
			>
				{TabItems.map(item => (
					<TabPane tab={`${item}`} key={item} style={{ padding: '0 20px' }}>
						{loading ? (
							<Spin />
						) : (
							<div>
								<List
									size="small"
									header={<div>Check it to mark as attended!</div>}
									bordered
									dataSource={result.map(x => (
										<AttendanceForm
											data={x}
											date={getDate()}
											setAttendance={this.setAttendance}
											updateLoading={updateLoading}
										/>
									))}
									renderItem={item => <List.Item>{item}</List.Item>}
								/>
							</div>
						)}
					</TabPane>
				))}
			</Tabs>
		)
	}
}

export default AttendanceModal
