import { notification } from 'antd'

export const notifyError = (msg, title) => {
	notification.error({
		message: title ? title : 'ACTION FAILED',
		description: msg
	})
}

export const notifySuccess = msg => {
	notification.success({
		message: `ACTION SUCCESSFUL`,
		description: msg
	})
}

export const notifyInfo = msg => {
	notification.info({
		message: `Please Check!`,
		description: msg,
		duration: 10
	})
}
