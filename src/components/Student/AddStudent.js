import React, { Component } from 'react'
import { Form, Icon, Input, Button, Select, Spin } from 'antd'

import db from '../../config/db'
import { hasErrors } from '../../utils/helpers'
import { notifyInfo, notifySuccess } from '../../utils/notify'

const { Option } = Select

export class AddStudent extends Component {
	getSubjects = async () => {
		const subjects = await db.subject.find({})
		this.setState({ subjects, loading: false })
		return subjects
	}

	async componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
		await this.getSubjects()
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.reRender !== prevProps.reRender) {
			// console.log('Again getting all subjects list.')
			this.setState({ loading: true })
			await this.getSubjects()
		}
	}

	state = { subjects: [], loading: true }

	checkExist = async ({ name, reg }) => {
		const entryExist = await db.student.findOne({ name, reg })
		if (entryExist) {
			notifyInfo('Student already exists!')
			return true
		}

		const regExist = await db.student.findOne({ reg })
		if (regExist) {
			notifyInfo('Student reg. no already exists!')
			return true
		}
		return false
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				const exist = await this.checkExist(values)
				if (!exist) {
					const student = await db.student.insert(values)
					/* Optimistic UI update */
					this.props.addStudent(student)
					this.props.form.resetFields()
					this.props.form.validateFields()
					console.log('Student added', student)
					notifySuccess('Successfully added new student!')
				}
			}
		})
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		// Only show error after a field is touched.
		const nameError = isFieldTouched('name') && getFieldError('name')
		const regError = isFieldTouched('reg') && getFieldError('reg')
		const subjectsError = isFieldTouched('subject') && getFieldError('subject')

		const { subjects, loading } = this.state
		if (loading) return <Spin />
		const options = subjects.map((x, i) => (
			<Option key={i} value={x.name}>
				{x.name}({x.code})
			</Option>
		))

		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input subject name!' }]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Student Name"
							allowClear
						/>
					)}
				</Form.Item>
				<Form.Item validateStatus={regError ? 'error' : ''} help={regError || ''}>
					{getFieldDecorator('reg', {
						rules: [{ required: true, message: 'Please input reg. number!' }]
					})(
						<Input
							prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Reg. Number"
							allowClear
						/>
					)}
				</Form.Item>
				<Form.Item validateStatus={subjectsError ? 'error' : ''} help={subjectsError || ''}>
					{getFieldDecorator('subjects', {
						rules: [{ required: true, message: 'Please provide subjects.' }]
					})(
						<Select
							prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
							mode="multiple"
							style={{ minWidth: 300 }}
							placeholder="Subjects"
							showSearch
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							{options}
						</Select>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
						Add
					</Button>
				</Form.Item>
			</Form>
		)
	}
}

const AddStudentForm = Form.create({ name: 'add_student_form' })(AddStudent)

export default AddStudentForm
