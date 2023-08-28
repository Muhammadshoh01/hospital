import cookies from 'vue-cookies'
export const auth = {
	state() {
		return {
			user: '',
			token: '',
		}
	},
	getters: {
		user(state) {
			return state.user
		},
		token(state) {
			return state.token
		},
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		},
		setToken(state, payload) {
			state.token = payload
		},
	},
	actions: {
		async login(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'auth/login',
				data: payload,
			})
			if (res.status == 200) {
				let { user, token } = res.data
				context.commit('setNotif', {
					type: 'success',
					text: 'Xush kelibsiz',
				})
				context.commit('setUser', user)
				context.commit('setToken', token)

				cookies.set('hospital-token', token)
				cookies.set('hospital-user', user)

				context.commit('setLayout', 'default')
			}
		},
		async register(context, payload) {
			return await context.dispatch('postAxios', {
				url: 'auth/reg',
				data: payload,
			})
		},
		async checkUser(context) {
			if (cookies.isKey('hospital-user') && cookies.isKey('hospital-token')) {
				let user = cookies.get('hospital-user')
				let token = cookies.get('hospital-token')
				context.commit('setToken', token)
				context.commit('setUser', user)

				let res = await context.dispatch('postAxios', {
					url: 'auth/checkUser',
					data: {
						id: user.id,
					},
				})
				if (res.status == 200) {
					cookies.set('hospital-user', res.data)
					context.commit('setUser', res.data)
					context.commit('setLayout', 'default')
				}
			} else {
				cookies.remove('hospital-user')
				cookies.remove('hospital-token')
				context.commit('setLayout', 'auth')
			}
		},
		logout(context) {
			cookies.remove('hospital-user')
			cookies.remove('hospital-token')
			context.commit('setLayout', 'auth')
			context.commit('setNotif', {
				type: 'warning',
				text: 'Tizimdan chiqdingiz',
			})
		},
	},
}
