import { convertDate } from '../../helpers/incFunc'

export const historyDoctor = {
	state() {
		return {
			doctorHistorys: [],
			history: {},
			countDoctorHistory: 0,
		}
	},
	getters: {
		doctorHistorys(state) {
			return state.doctorHistorys
		},
		countDoctorHistory(state) {
			return state.countDoctorHistory
		},
		activeDoctorHistory(state) {
			return state.doctorHistorys.filter((history) => history.status == 1)
		},
	},
	mutations: {
		setDoctorHistorys(state, payload) {
			state.doctorHistorys = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newDoctorHistory(state, payload) {
			state.doctorHistorys = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.doctorHistorys,
			]
		},
		updateDoctorHistory(state, payload) {
			state.doctorHistorys = [
				...state.doctorHistorys.map((history) => {
					if (history._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return history
				}),
			]
		},
		deleteDoctorHistory(state, payload) {
			state.doctorHistorys = [
				...state.doctorHistorys.filter((history) => {
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
				context.commit('setDoctorHistorys', res.data)
			}
		},
		async addDoctorHistory(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'history',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newDoctorHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Shifokor tarixi qo'shildi",
				})
			}
		},
		async deleteDoctorHistory(context, payload) {
			let res = await context.dispatch('deleteAxios', `history/${payload}`)
			if (res.status == 200) {
				context.commit('deleteDoctorHistory', payload)
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
				context.commit('updateDoctorHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Shifokor tarixi yangilandi',
				})
			}
		},
	},
}
