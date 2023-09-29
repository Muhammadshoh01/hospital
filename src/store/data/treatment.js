import { convertDate } from '../../helpers/incFunc'

export const treatment = {
	state() {
		return {
			treatments: [],
			treatment: {},
			countTreatment: 0,
		}
	},
	getters: {
		treatments(state) {
			return state.treatments
		},
		treatment(state) {
			return state.treatment
		},
		countTreatment(state) {
			return state.countTreatment
		},
		activeTreatments(state) {
			return state.treatments.filter((treatment) => treatment.status == 1)
		},
	},
	mutations: {
		setTreatments(state, payload) {
			state.treatments = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newTreatment(state, payload) {
			state.treatments = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.treatments,
			]
		},
		updateTreatment(state, payload) {
			state.treatments = [
				...state.treatments.map((treatment) => {
					if (treatment._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return treatment
				}),
			]
		},
		deleteTreatment(state, payload) {
			state.treatments = [
				...state.treatments.filter((treatment) => {
					if (treatment._id == payload) return false
					return treatment
				}),
			]
		},
	},
	actions: {
		async getAllTreatments(context) {
			let res = await context.dispatch('getAxios', 'treatment')
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setTreatments', res.data)
			}
		},
		async addTreatment(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'treatment',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newTreatment', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi lavozim qo'shildi",
				})
			}
		},
		async deleteTreatment(context, payload) {
			let res = await context.dispatch('deleteAxios', `treatment/${payload}`)
			if (res.status == 200) {
				context.commit('deleteTreatment', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Lavozim o'chirildi",
				})
			}
		},
		async getTreatment(context, payload) {
			return await context.dispatch('getAxios', `treatment/${payload}`)
		},
		async updateTreatment(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'treatment',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateTreatment', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Lavozim yangilandi',
				})
			}
		},
	},
}
