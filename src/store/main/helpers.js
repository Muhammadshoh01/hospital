import axios from 'axios'
import cookies from 'vue-cookies'

export const helpers = {
	actions: {
		async getAxios(context, payload) {
			return await axios.get(`${context.getters.mainUrl}/${payload}`, {
				headers: {
					authorization: `Bearer ${context.getters.token}`,
				},
			})
		},
		async postAxios(context, payload) {
			return await axios
				.post(`${context.getters.mainUrl}/${payload.url}`, payload.data, {
					headers: {
						authorization: `Bearer ${context.getters.token}`,
					},
				})
				.catch((e) => {
					context.commit('setNotif', {
						type: 'danger',
						text: e.response.data,
					})
					if (e.response.status == 404) {
						cookies.remove('hospital-user')
						cookies.remove('hospital-token')
						context.commit('setLayout', 'auth')
					}
				})
		},
		async deleteAxios(context, payload) {
			return await axios.delete(`${context.getters.mainUrl}/${payload}`, {
				headers: {
					authorization: `Bearer ${context.getters.token}`,
				},
			})
		},
		async putAxios(context, payload) {
			return await axios
				.put(`${context.getters.mainUrl}/${payload.url}`, payload.data, {
					headers: {
						authorization: `Bearer ${context.getters.token}`,
					},
				})
				.catch((e) => {
					context.commit('setNotif', {
						type: 'danger',
						text: e.response.data,
					})
					if (e.response.status == 404) {
						cookies.remove('hospital-user')
						cookies.remove('hospital-token')
						context.commit('setLayout', 'auth')
					}
				})
		},
	},
}
