import { convertDate } from '../../helpers/incFunc'

export const room = {
	state() {
		return {
			rooms: [],
			room: {},
			countRoom: 0,
		}
	},
	getters: {
		rooms(state) {
			return state.rooms
		},
		room(state) {
			return state.room
		},
		countRoom(state) {
			return state.countRoom
		},
		activeRooms(state) {
			return state.rooms.filter((room) => room.status == 1)
		},
	},
	mutations: {
		setRooms(state, payload) {
			state.rooms = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newRoom(state, payload) {
			state.rooms = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.rooms,
			]
		},
		updateRoom(state, payload) {
			state.rooms = [
				...state.rooms.map((room) => {
					if (room._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return room
				}),
			]
		},
		deleteRoom(state, payload) {
			state.rooms = [
				...state.rooms.filter((room) => {
					if (room._id == payload) return false
					return room
				}),
			]
		},
	},
	actions: {
		async getAllRooms(context) {
			let res = await context.dispatch('getAxios', 'room')
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setRooms', res.data)
			}
		},
		async addRoom(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'room',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newRoom', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi xona qo'shildi",
				})
			}
		},
		async deleteRoom(context, payload) {
			let res = await context.dispatch('deleteAxios', `room/${payload}`)
			if (res.status == 200) {
				context.commit('deleteRoom', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Xona o'chirildi",
				})
			}
		},
		async getRoom(context, payload) {
			return await context.dispatch('getAxios', `room/${payload}`)
		},
		async updateRoom(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'room',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateRoom', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Xona yangilandi',
				})
			}
		},
	},
}
