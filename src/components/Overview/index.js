import React, { Component } from 'react'

import StudentList from './StudentList'
import db from '../../config/db'
import { Spin } from 'antd'

export class Overview extends Component {
	getData = async () => {
		const students = await db.student.find({})
		this.setState({ data: students, dataLoading: false })
		return students
	}

	async componentDidMount() {
		await this.getData()
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.reRender !== prevProps.reRender) {
			// console.log('Again getting all students list.')
			this.setState({ dataLoading: true })
			await this.getData()
		}
	}

	state = { data: [], dataLoading: true }

	render() {
		let { data, dataLoading } = this.state
		data = data
			.reverse()
			.map((x, i) => ({ ...x, key: x._id, serial: i + 1, subjects: x.subjects.join(', ') }))
		// console.log(data)

		return (
			<>
				{dataLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Spin />
					</div>
				) : (
					<StudentList data={data} />
				)}
			</>
		)
	}
}

export default Overview
