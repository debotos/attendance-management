import React, { Component } from 'react'

import AddSubject from './AddSubject'
import SubjectList from './SubjectList'
import db from '../../config/db'
import { Spin } from 'antd'

export class index extends Component {
	getData = async () => {
		const subjects = await db.subject.find({})
		this.setState({ data: subjects, dataLoading: false })
		return subjects
	}

	async componentDidMount() {
		await this.getData()
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.reRender !== prevProps.reRender) {
			// console.log('Again getting all subjects list.')
			this.setState({ dataLoading: true })
			await this.getData()
		}
	}

	state = { data: [], deleteLoading: false, dataLoading: true }

	addSubject = newSubject => {
		this.setState({ data: [...this.state.data, newSubject] })
	}

	deleteSubject = async id => {
		this.setState({ deleteLoading: true })
		const removeItemCount = await db.subject.remove({ _id: id })
		console.log(removeItemCount + ' Subject deleted.')
		const updates = this.state.data.filter(x => x._id !== id)
		this.setState({ data: updates }, () => this.setState({ deleteLoading: false }))
	}

	render() {
		let { data, deleteLoading, dataLoading } = this.state
		data = data.reverse().map((x, i) => ({ ...x, key: x._id, serial: i + 1 }))
		// console.log(data)
		return (
			<>
				<AddSubject addSubject={this.addSubject} />
				{dataLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Spin />
					</div>
				) : (
					<SubjectList
						data={data}
						deleteSubjectLoading={deleteLoading}
						deleteSubject={this.deleteSubject}
					/>
				)}
			</>
		)
	}
}

export default index
