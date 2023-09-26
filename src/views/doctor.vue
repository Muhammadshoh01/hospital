<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Shifokorlar</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>№</th>
						<th>Ism-sharif</th>
						<th>Raqami</th>
						<th>Bo'lim</th>
						<th>Mutaxassisslik</th>
						<th>Tug'ilgan yili</th>
						<th>Sana</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(doctor, index) in doctors"
						:key="doctor._id"
						@click="$router.push(`/doctor/${doctor._id}`)"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ doctor.name }}</td>
						<td>{{ doctor.phone }}</td>
						<td>{{ doctor.department }}</td>
						<td>{{ doctor.spec }}</td>
						<td>{{ doctor.birthday }}</td>
						<td>{{ doctor.createdTime }}</td>
						<td>
							<button @click.stop="$router.push(`/doctor/${doctor._id}`)">
								<img src="../assets/img/eye.svg" />
							</button>
							<button @click.stop="edit(doctor._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click.stop="remove(doctor._id)">
								<img src="../assets/img/remove.svg" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button class="add" @click="$store.commit('setDoctorModalToggle', true)">
			<img src="@/assets/img/doctors.svg" alt="" />
		</button>
		<doctor-modal :editdoctor="doctor" />
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import doctorModal from '../components/doctorModal.vue'
export default {
	components: { doctorModal },
	data() {
		return {
			doctor: {},
		}
	},
	methods: {
		...mapActions(['getAllDoctors', 'deleteDoctor', 'getDoctor']),
		async edit(id) {
			let res = await this.getDoctor(id)
			if (res?.status == 200) {
				this.$store.commit('setDoctorModalToggle', true)
				this.$store.commit('setDoctorEditModalToggle', true)
				this.doctor = { ...res.data }
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
