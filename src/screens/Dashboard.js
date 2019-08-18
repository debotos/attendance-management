import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'

import AddStudent from '../components/AddStudent'
import AddSubject from '../components/AddSubject'
import Overview from '../components/Overview'

const { Content, Footer } = Layout
const { TabPane } = Tabs
const TabItems = ['OVERVIEW', 'ADD_SUBJECT', 'ADD_STUDENT']

export class Dashboard extends Component {
	renderTabContent = item => {
		switch (item) {
			case 'ADD_STUDENT':
				return <AddStudent />
			case 'ADD_SUBJECT':
				return <AddSubject />
			default:
				return <Overview />
		}
	}
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content style={{ padding: '40px 50px' }}>
					<Layout style={{ background: '#fff' }}>
						<Content style={{ minHeight: 280 }}>
							<Tabs defaultActiveKey="OVERVIEW" tabPosition={'top'} style={{ minHeight: 300 }}>
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
