import React, { Component } from 'react'
import { Layout, Tabs } from 'antd'

import AddStudent from '../components/AddStudent'
import AddSubject from '../components/AddSubject'
import Overview from '../components/Overview'

const { Content, Footer } = Layout
const { TabPane } = Tabs
const TabItems = ['OVERVIEW', 'ADD_SUBJECT', 'ADD_STUDENT']

export class Dashboard extends Component {
	state = { reRender: Math.random() }
	renderTabContent = item => {
		/* 'reRender' To update the tab content */
		const reRender = this.state.reRender
		switch (item) {
			case 'ADD_STUDENT':
				return <AddStudent reRender={reRender} />
			case 'ADD_SUBJECT':
				return <AddSubject reRender={reRender} />
			default:
				return <Overview reRender={reRender} />
		}
	}
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content style={{ padding: '40px 50px' }}>
					<Layout style={{ background: '#fff' }}>
						<Content style={{ minHeight: 280 }}>
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
