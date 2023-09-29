import { convertDate } from '../../helpers/incFunc'

export const doctor = {
	state() {
		return {
			doctors: [],
			doctor: {},
			countDoctor: 0,
			doctorModalToggle: false,
			doctorEditModalToggle: false,
			doctorHistoryToggle: false,
			doctorEditHistoryToggle: false,
		}
	},
	getters: {
		doctors(state) {
			return state.doctors
		},
		doctor(state) {
			return state.doctor
		},
		countDoctor(state) {
			return state.countDoctor
		},
		activeDoctors(state) {
			return state.doctors.filter((doctor) => doctor.status == 1)
		},
		doctorModalToggle(state) {
			return state.doctorModalToggle
		},
		doctorEditModalToggle(state) {
			return state.doctorEditModalToggle
		},
		doctorHistoryToggle(state) {
			return state.doctorHistoryToggle
		},
		doctorEditHistoryToggle(state) {
			return state.doctorEditHistoryToggle
		},
	},
	mutations: {
		setDoctors(state, payload) {
			state.doctors = [
				...payload.map((item) => {
					item.createdTime = convertDate(item.createdTime)
					return item
				}),
			]
		},
		newDoctor(state, payload) {
			state.doctors = [
				{ ...payload, createdTime: convertDate(payload.createdTime) },
				...state.doctors,
			]
		},
		updateDoctor(state, payload) {
			state.doctors = [
				...state.doctors.map((doctor) => {
					if (doctor._id == payload._id)
						return { ...payload, createdTime: convertDate(payload.createdTime) }
					return doctor
				}),
			]
		},
		deleteDoctor(state, payload) {
			state.doctors = [
				...state.doctors.filter((doctor) => {
					if (doctor._id == payload) return false
					return doctor
				}),
			]
		},
		setDoctorModalToggle(state, payload) {
			state.doctorModalToggle = payload
		},
		setDoctorEditModalToggle(state, payload) {
			state.doctorEditModalToggle = payload
		},
		setDoctorHistoryToggle(state, payload) {
			state.doctorHistoryToggle = payload
		},
		setDoctorEditHistoryToggle(state, payload) {
			state.doctorEditHistoryToggle = payload
		},
	},
	actions: {
		async getAllStats(context) {
			return await context.dispatch('getAxios', 'statistic')
		},
		async getAllDoctors(context) {
			let res = await context.dispatch('getAxios', 'doctor')
			if (res.status == 200) {
				context.commit('setDoctors', res.data)
			}
		},
		async addDoctor(context, payload) {
			let res = await context.dispatch('postAxios', {
				url: 'doctor',
				data: payload,
			})
			if (res.status == 201) {
				context.commit('newDoctor', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: "Yangi shifokor qo'shildi",
				})
			}
		},
		async deleteDoctor(context, payload) {
			let res = await context.dispatch('deleteAxios', `doctor/${payload}`)
			if (res.status == 200) {
				context.commit('deleteDoctor', payload)
				context.commit('setNotif', {
					type: 'warning',
					text: "Shifokor o'chirildi",
				})
			}
		},
		async getDoctor(context, payload) {
			return await context.dispatch('getAxios', `doctor/${payload}`)
		},
		async updateDoctor(context, payload) {
			let res = await context.dispatch('putAxios', {
				url: 'doctor',
				data: payload,
			})
			if (res.status == 200) {
				context.commit('updateDoctor', res.data)
				context.commit('setNotif', {
					type: 'success',
					text: 'Shifokor yangilandi',
				})
			}
		},
		async getDoctorExcel(context) {
			let res = await context.dispatch('getAxios', 'doctor/excel')
			if (res.status == 200) {
				context.dispatch('downloadFile', res.data)
			}
		},
	},
}
