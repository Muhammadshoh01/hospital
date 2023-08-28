<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Xonalar</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>N</th>
						<th>Xona raqami</th>
						<th>Bo'lim</th>
						<th>Sig'imi</th>
						<th>Yaratilgan vaqt</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(doctor, index) in doctors" :key="doctor._id">
						<td>{{ index + 1 }}</td>
						<td>{{ doctor.number }}</td>
						<td>{{ doctor.department }}</td>
						<td>{{ doctor.maxcount }}</td>
						<td>{{ doctor.createdTime }}</td>
						<td @click="edit(doctor._id)">edit</td>
						<td><button @click="remove(doctor._id)">X</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<button class="add" @click="$store.commit('setDoctorModalToggle', true)">
			<img src="@/assets/img/doctors.svg" alt="" />
		</button>
		<doctor-modal />
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import doctorModal from '../components/doctorModal.vue'
export default {
	components: { doctorModal },
	methods: {
		...mapActions(['getAllDoctors', 'deleteDoctor']),
		async edit(id) {
			let res = await this.getDoctor(id)
			if (res?.status == 200) {
				this.$store.commit('setDoctorModalToggle', true)
				this.$store.commit('setEditDoctorModalToggle', true)
				// this.toggle = true
				// this.editToggle = true
				this.doctor = { ...res.data }
				this.doctor.department = this.doctor.department._id
			}
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteDoctor(id)
			}
		},
	},
	computed: {
		...mapGetters(['doctors']),
	},
	mounted() {
		this.getAllDoctors()
	},
}
</script>

<style></style>
