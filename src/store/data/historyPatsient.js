import { convertDate } from '../../helpers/incFunc'

export const historyPatsient = {
	state() {
		return {
			patsientHistorys: [],
			history: {},
			countPatsientHistory: 0,
		}
	},
	getters: {
		patsientHistorys(state) {
			return state.patsientHistorys
		},

		countPatsientHistory(state) {
			return state.countPatsientHistory
		},
		activePatsientHistory(state) {
			return state.patsientHistorys.filter((history) => history.status == 1)
		},
	},
	mutations: {
		setPatsientHistorys(state, payload) {
			state.patsientHistorys = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newPatsientHistory(state, payload) {
			state.patsientHistorys = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.patsientHistorys,
			]
		},
		updatePatsientHistory(state, payload) {
			state.patsientHistorys = [
				...state.patsientHistorys.map((history) => {
					if (history._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return history
				}),
			]
		},
		deletePatsientHistory(state, payload) {
			state.patsientHistorys = [
				...state.patsientHistorys.filter((history) => {
					if (history._id == payload) return false
					return history
				}),
			]
		},
	},
	actions: {
		async getAllPatsientHistorys(context, payload) {
			let res = await context.dispatch('getAxios', `historypatsient/${payload}`)
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setPatsientHistorys', res.data)
			}
		},
		async addPatsientHistory(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'historypatsient',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newPatsientHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Bemor tarixi qo'shildi",
				})
			}
		},
		async deletePatsientHistory(context, payload) {
			let res = await context.dispatch(
				'deleteAxios',
				`historypatsient/${payload}`
			)
			if (res.status == 200) {
				context.commit('deletePatsientHistory', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Bemor tarixi o'chirildi",
				})
			}
		},
		async getPatsientHistory(context, payload) {
			return await context.dispatch(
				'getAxios',
				`historypatsient/find/${payload}`
			)
		},
		async updatePatsientHistory(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'historypatsient',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updatePatsientHistory', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Bemor tarixi yangilandi',
				})
			}
		},
	},
}
