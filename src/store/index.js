import { createStore } from 'vuex'
import { modules } from './main/modules'

const store = createStore({
	state() {
		return {
			mainUrl: 'http://95.130.227.52:3112',
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
