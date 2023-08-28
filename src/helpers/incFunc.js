export const convertDate = (data) => {
	const date = new Date(data)
	return `${addZero(date.getDate())}/${addZero(
		date.getMonth() + 1
	)}/${date.getFullYear()}`
}

export const addZero = (num) => {
	return num < 10 ? `0${num}` : num
}
