import React, { Component } from 'react'

import AddStudent from './AddStudent'
import StudentList from './StudentList'
import db from '../../config/db'
import { Spin } from 'antd'

export class index extends Component {
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

	state = { data: [], deleteLoading: false, dataLoading: true }

	addStudent = newStudent => {
		this.setState({ data: [...this.state.data, newStudent] })
	}

	deleteStudent = async id => {
		this.setState({ deleteLoading: true })
		const removeItemCount = await db.student.remove({ _id: id })
		console.log(removeItemCount + ' Student deleted.')
		const updates = this.state.data.filter(x => x._id !== id)
		this.setState({ data: updates }, () => this.setState({ deleteLoading: false }))
	}

	render() {
		let { data, deleteLoading, dataLoading } = this.state
		data = data
			.reverse()
			.map((x, i) => ({ ...x, key: x._id, serial: i + 1, subjects: x.subjects.join(', ') }))
		// console.log(data)
		return (
			<>
				<AddStudent addStudent={this.addStudent} reRender={this.props.reRender} />
				{dataLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Spin />
					</div>
				) : (
					<StudentList
						data={data}
						deleteStudentLoading={deleteLoading}
						deleteStudent={this.deleteStudent}
					/>
				)}
			</>
		)
	}
}

export default index
