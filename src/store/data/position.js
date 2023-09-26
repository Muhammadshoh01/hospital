import { convertDate } from '../../helpers/incFunc'

export const position = {
	state() {
		return {
			positions: [],
			position: {},
			countPosition: 0,
		}
	},
	getters: {
		positions(state) {
			return state.positions
		},
		position(state) {
			return state.position
		},
		countPosition(state) {
			return state.countPosition
		},
		activePositions(state) {
			return state.positions.filter((position) => position.status == 1)
		},
	},
	mutations: {
		setPositions(state, payload) {
			state.positions = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newPosition(state, payload) {
			state.positions = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.positions,
			]
		},
		updatePosition(state, payload) {
			state.positions = [
				...state.positions.map((position) => {
					if (position._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return position
				}),
			]
		},
		deletePosition(state, payload) {
			state.positions = [
				...state.positions.filter((position) => {
					if (position._id == payload) return false
					return position
				}),
			]
		},
	},
	actions: {
		async getAllPositions(context) {
			let res = await context.dispatch('getAxios', 'position')
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setPositions', res.data)
			}
		},
		async addPosition(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'position',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newPosition', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi lavozim qo'shildi",
				})
			}
		},
		async deletePosition(context, payload) {
			let res = await context.dispatch('deleteAxios', `position/${payload}`)
			if (res.status == 200) {
				context.commit('deletePosition', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Lavozim o'chirildi",
				})
			}
		},
		async getPosition(context, payload) {
			return await context.dispatch('getAxios', `position/${payload}`)
		},
		async updatePosition(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'position',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updatePosition', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Lavozim yangilandi',
				})
			}
		},
	},
}
