import { convertDate } from '../../helpers/incFunc'

export const department = {
	state() {
		return {
			departments: [],
			department: {},
			countDepartment: 0,
		}
	},
	getters: {
		departments(state) {
			return state.departments
		},
		department(state) {
			return state.department
		},
		countDepartment(state) {
			return state.countDepartment
		},
		activeDepartments(state) {
			return state.departments.filter((department) => department.status == 1)
		},
	},
	mutations: {
		setDepartments(state, payload) {
			state.departments = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newDepartment(state, payload) {
			state.departments = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.departments,
			]
		},
		updateDepartment(state, payload) {
			state.departments = [
				...state.departments.map((department) => {
					if (department._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return department
				}),
			]
		},
		deleteDepartment(state, payload) {
			state.departments = [
				...state.departments.filter((department) => {
					if (department._id == payload) return false
					return department
				}),
			]
		},
	},
	actions: {
		async getAllDepartments(context) {
			let res = await context.dispatch('getAxios', 'department')
			if (res.status == 200) {
				context.commit('setDepartments', res.data)
			}
		},
		async addDepartment(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'department',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newDepartment', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi bo'lim qo'shildi",
				})
			}
		},
		async deleteDepartment(context, payload) {
			let res = await context.dispatch('deleteAxios', `department/${payload}`)
			if (res.status == 200) {
				context.commit('deleteDepartment', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Bo'lim o'chirildi",
				})
			}
		},
		async getDepartment(context, payload) {
			return await context.dispatch('getAxios', `department/${payload}`)
		},
		async updateDepartment(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'department',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateDepartment', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Bo'lim yangilandi",
				})
			}
		},
	},
}
