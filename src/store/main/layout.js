export const layout = {
	state() {
		return {
			layout: 'auth',
		}
	},
	getters: {
		layout(state) {
			return state.layout
		},
	},
	mutations: {
		setLayout(state, payload) {
			state.layout = payload
		},
	},
}
