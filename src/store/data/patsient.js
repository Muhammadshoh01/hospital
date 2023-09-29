import { convertDate } from '../../helpers/incFunc'

export const patsient = {
	state() {
		return {
			patsients: [],
			patsient: {},
			countPatsient: 0,
			patsientModalToggle: false,
			patsientEditModalToggle: false,
			patsientHistoryToggle: false,
			patsientEditHistoryToggle: false,
		}
	},
	getters: {
		patsients(state) {
			return state.patsients
		},
		patsient(state) {
			return state.patsient
		},
		countPatsient(state) {
			return state.countPatsient
		},
		activePatsients(state) {
			return state.patsients.filter((patsient) => patsient.status == 1)
		},
		patsientModalToggle(state) {
			return state.patsientModalToggle
		},
		patsientEditModalToggle(state) {
			return state.patsientEditModalToggle
		},
		patsientHistoryToggle(state) {
			return state.patsientHistoryToggle
		},
		patsientEditHistoryToggle(state) {
			return state.patsientEditHistoryToggle
		},
	},
	mutations: {
		setPatsients(state, payload) {
			state.patsients = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newPatsient(state, payload) {
			state.patsients = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.patsients,
			]
		},
		updatePatsient(state, payload) {
			state.patsients = [
				...state.patsients.map((patsient) => {
					if (patsient._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return patsient
				}),
			]
		},
		deletePatsient(state, payload) {
			state.patsients = [
				...state.patsients.filter((patsient) => {
					if (patsient._id == payload) return false
					return patsient
				}),
			]
		},
		setPatsientModalToggle(state, payload) {
			state.patsientModalToggle = payload
		},
		setPatsientEditModalToggle(state, payload) {
			state.patsientEditModalToggle = payload
		},
		setPatsientHistoryToggle(state, payload) {
			state.patsientHistoryToggle = payload
		},
		setPatsientEditHistoryToggle(state, payload) {
			state.patsientEditHistoryToggle = payload
		},
	},
	actions: {
		async getAllPatsients(context) {
			let res = await context.dispatch('getAxios', 'patsient')
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setPatsients', res.data)
			}
		},
		async addPatsient(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'patsient',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newPatsient', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi bemor qo'shildi",
				})
			}
		},
		async deletePatsient(context, payload) {
			let res = await context.dispatch('deleteAxios', `patsient/${payload}`)
			if (res.status == 200) {
				context.commit('deletePatsient', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Bemor o'chirildi",
				})
			}
		},
		async getPatsient(context, payload) {
			return await context.dispatch('getAxios', `patsient/${payload}`)
		},
		async updatePatsient(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'patsient',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updatePatsient', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Bemor yangilandi',
				})
			}
		},
		async getPatsientExcel(context) {
			let res = await context.dispatch('getAxios', 'patsient/excel')
			if (res.status == 200) {
				context.dispatch('downloadFile', res.data)
			}
		},
	},
}
