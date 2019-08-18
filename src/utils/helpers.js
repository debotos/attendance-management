import shortid from 'shortid'

export function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field])
}

export const getDate = () => {
	const today = new Date()
	// const dd = String(today.getDate()).padStart(2, '0')
	const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
	const yyyy = today.getFullYear()

	return mm + '/' + yyyy
}

export const getAttendancePlaceholder = () => {
	var today = new Date()
	var month = today.getMonth()

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate()
	}

	const daysCount = daysInMonth(month + 1, today.getFullYear())

	const placeholder = []
	for (let index = 0; index < daysCount; index++) {
		placeholder.push({ id: shortid.generate(), day: index + 1, attended: false }) // false means (not attended)
	}
	console.log('Putting placeholder!')

	return placeholder
}
