import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import db from '../../config/db'
import { hasErrors } from '../../utils/helpers'
import { notifyInfo, notifySuccess } from '../../utils/notify'

export class AddSubject extends Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields()
	}

	checkExist = async ({ name, code }) => {
		const entryExist = await db.subject.findOne({ name, code })
		if (entryExist) {
			notifyInfo('Subject already exists!')
			return true
		}
		const nameExist = await db.subject.findOne({ name })
		if (nameExist) {
			notifyInfo('Subject name already exists!')
			return true
		}
		const codeExist = await db.subject.findOne({ code })
		if (codeExist) {
			notifyInfo('Subject code already exists!')
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
					const subject = await db.subject.insert(values)
					/* Optimistic UI update */
					this.props.addSubject(subject)
					this.props.form.resetFields()
					this.props.form.validateFields()
					console.log('Subject added', subject)
					notifySuccess('Successfully added new subject!')
				}
			}
		})
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		// Only show error after a field is touched.
		const nameError = isFieldTouched('name') && getFieldError('name')
		const codeError = isFieldTouched('code') && getFieldError('code')
		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<Form.Item validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
					{getFieldDecorator('name', {
						rules: [{ required: true, message: 'Please input subject name!' }]
					})(
						<Input
							prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Subject Name"
							allowClear
						/>
					)}
				</Form.Item>
				<Form.Item validateStatus={codeError ? 'error' : ''} help={codeError || ''}>
					{getFieldDecorator('code', {
						rules: [{ required: true, message: 'Please input subject code!' }]
					})(
						<Input
							prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="Subject/Course Code"
							allowClear
						/>
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

const AddSubjectForm = Form.create({ name: 'add_subject_form' })(AddSubject)

export default AddSubjectForm
