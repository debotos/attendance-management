import React, { Component } from 'react'
import { Input, Button, Table, Icon, Modal } from 'antd'
import Highlighter from 'react-highlight-words'

import AttendanceModal from './AttendanceModal'

class Cell extends React.Component {
	renderDataView = (children, record, field) => {
		switch (field) {
			default:
				return children
		}
	}

	renderCell = () => {
		const { dataIndex, title, record, index, children, ...restProps } = this.props
		return <td {...restProps}>{this.renderDataView(children, record, dataIndex)}</td>
	}

	render() {
		return this.renderCell()
	}
}

class TableView extends Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: 'Serial',
				dataIndex: 'serial',
				width: '10%',
				sorter: (a, b) => a.serial - b.serial
			},

			{
				title: 'Student Name',
				dataIndex: 'name',
				...this.getColumnSearchProps('name')
			},
			{
				title: 'Student Reg. Number',
				dataIndex: 'reg',
				...this.getColumnSearchProps('reg')
			},
			{
				title: 'Action',
				dataIndex: 'operation',
				render: (text, record) => {
					return (
						<div>
							<span
								onClick={() => this.setState({ showModal: true, modalData: record })}
								style={{ marginLeft: 8, color: 'blue', cursor: 'pointer' }}
							>
								View Attendance
							</span>
						</div>
					)
				}
			}
		]
	}

	state = {
		searchText: '',
		showModal: false,
		modalData: null
	}

	handleSearch = (selectedKeys, confirm) => {
		confirm()
		this.setState({ searchText: selectedKeys[0] })
	}

	handleReset = clearFilters => {
		clearFilters()
		this.setState({ searchText: '' })
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select())
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	})

	render() {
		const components = { body: { cell: Cell } }
		const columns = this.columns.map(col => {
			return {
				...col,
				onCell: record => ({
					record,
					dataIndex: col.dataIndex,
					title: col.title
				})
			}
		})
		return (
			<>
				<Table
					size="small"
					components={components}
					bordered
					dataSource={this.props.data}
					columns={columns}
					rowClassName="subjects-table-row"
					title={() => (
						<p>
							Total <strong>{this.props.data.length}</strong> Students
						</p>
					)}
					pagination={{
						position: 'top',
						showSizeChanger: true,
						showQuickJumper: true,
						pageSizeOptions: ['10', '15', '20', '30']
					}}
				/>
				<Modal
					title="Attendance"
					style={{ top: 20 }}
					width="95%"
					visible={this.state.showModal}
					onOk={() => this.setState({ showModal: false, modalData: null })}
					onCancel={() => this.setState({ showModal: false, modalData: null })}
				>
					<div style={{ height: '75vh', overflowY: 'scroll' }}>
						{/* Just to re-render the component */}
						{this.state.showModal && <AttendanceModal data={this.state.modalData} />}
					</div>
				</Modal>
			</>
		)
	}
}

export default TableView
