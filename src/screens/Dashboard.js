import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'

import Student from '../components/Student'
import Subject from '../components/Subject'
import Overview from '../components/Overview'

const { Content, Header, Footer } = Layout
const { TabPane } = Tabs
const TabItems = ['OVERVIEW', 'SUBJECT', 'STUDENT']

export class Dashboard extends Component {
	state = { reRender: Math.random() }
	renderTabContent = item => {
		/* 'reRender' To update the tab content */
		const reRender = this.state.reRender
		switch (item) {
			case 'STUDENT':
				return <Student reRender={reRender} />
			case 'SUBJECT':
				return <Subject reRender={reRender} />
			default:
				return <Overview reRender={reRender} />
		}
	}
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Header>
					<h1 style={{ textAlign: 'center', color: '#fff' }}>Attendance Management System</h1>
				</Header>
				<Content style={{ padding: '20px 50px' }}>
					<Layout style={{ background: '#fff', minHeight: '80vh' }}>
						<Content style={{ minHeight: 280, padding: '0 0 20px 0' }}>
							<Tabs
								defaultActiveKey="OVERVIEW"
								tabPosition={'top'}
								style={{ minHeight: 300 }}
								/* To update the tab content */
								onChange={() => this.setState({ reRender: Math.random() })}
							>
								{TabItems.map(item => (
									<TabPane
										tab={`${item.split('_').join(' ')}`}
										key={item}
										style={{ padding: '0 20px' }}
									>
										{this.renderTabContent(item)}
									</TabPane>
								))}
							</Tabs>
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					©{new Date().getFullYear()} Created by the student of BITC
				</Footer>
			</Layout>
		)
	}
}

export default Dashboard
