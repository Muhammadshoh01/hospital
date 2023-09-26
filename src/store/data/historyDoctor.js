import { convertDate } from '../../helpers/incFunc'

export const historyDoctor = {
	state() {
		return {
			historys: [],
			history: {},
			countHistory: 0,
		}
	},
	getters: {
		historys(state) {
			return state.historys
		},
		history(state) {
			return state.history
		},
		countHistory(state) {
			return state.countHistory
		},
		activeHistorys(state) {
			return state.historys.filter((history) => history.status == 1)
		},
	},
	mutations: {
		setHistorys(state, payload) {
			state.historys = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newHistory(state, payload) {
			state.historys = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.historys,
			]
		},
		updateHistory(state, payload) {
			state.historys = [
				...state.historys.map((history) => {
					if (history._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return history
				}),
			]
		},
		deleteHistory(state, payload) {
			state.historys = [
				...state.historys.filter((history) => {
					if (history._id == payload) return false
					return history
				}),
			]
		},
	},
	actions: {
		async getAllDoctorHistorys(context, payload) {
			let res = await context.dispatch('getAxios', `history/${payload}`)
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setHistorys', res.data)
			}
		},
		async addDoctorHistory(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'history',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Shifokor tarixi qo'shildi",
				})
			}
		},
		async deleteDoctorHistory(context, payload) {
			let res = await context.dispatch('deleteAxios', `history/${payload}`)
			if (res.status == 200) {
				context.commit('deleteHistory', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Shifokor tarixi o'chirildi",
				})
			}
		},
		async getDoctorHistory(context, payload) {
			return await context.dispatch('getAxios', `history/find/${payload}`)
		},
		async updateDoctorHistory(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'history',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Shifokor tarixi yangilandi',
				})
			}
		},
	},
}
