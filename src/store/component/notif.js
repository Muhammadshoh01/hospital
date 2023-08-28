export const notif = {
	state() {
		return {
			notif: {},
		}
	},
	getters: {
		notif(state) {
			return state.notif
		},
	},
	mutations: {
		setNotif(state, payload) {
			state.notif = payload

			setTimeout(() => {
				state.notif = {}
			}, 2000)
		},
	},
}
