import { createStore } from 'vuex'
import { modules } from './main/modules'

const store = createStore({
	state() {
		return {
			mainUrl: 'https://hospital.bookblogs.uz',
		}
	},
	getters: {
		mainUrl(state) {
			return state.mainUrl
		},
	},
	modules,
})

export default store
