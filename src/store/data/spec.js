import axios from 'axios'
import { convertDate } from '../../helpers/incFunc'

export const spec = {
	state() {
		return {
			specs: [],
			spec: {},
			countSpec: 0,
		}
	},
	getters: {
		specs(state) {
			return state.specs
		},
		spec(state) {
			return state.spec
		},
		countSpec(state) {
			return state.countSpec
		},
		activeSpecs(state) {
			return state.specs.filter((spec) => spec.status == 1)
		},
	},
	mutations: {
		setSpecs(state, payload) {
			state.specs = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newSpec(state, payload) {
			state.specs = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.specs,
			]
		},
		updateSpec(state, payload) {
			state.specs = [
				...state.specs.map((spec) => {
					if (spec._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return spec
				}),
			]
		},
		deleteSpec(state, payload) {
			state.specs = [
				...state.specs.filter((spec) => {
					if (spec._id == payload) return false
					return spec
				}),
			]
		},
	},
	actions: {
		async getAllSpecs(context) {
			let res = await context.dispatch('getAxios', 'spec')
			if (res.status == 200) {
				console.log(res.data)
				context.commit('setSpecs', res.data)
			}
		},
		async addSpec(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'spec',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newSpec', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi mutaxassisslik qo'shildi",
				})
			}
		},
		async deleteSpec(context, payload) {
			let res = await context.dispatch('deleteAxios', `spec/${payload}`)
			if (res.status == 200) {
				context.commit('deleteSpec', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Mutaxassisslik o'chirildi",
				})
			}
		},
		async getSpec(context, payload) {
			return await context.dispatch('getAxios', `spec/${payload}`)
		},
		async updateSpec(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'spec',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateSpec', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Mutaxassisslik yangilandi',
				})
			}
		},
	},
}
