<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Bemorlar</div>
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
					<!-- <tr
						v-for="(patsient, index) in patsients"
						:key="patsient._id"
						@click="$router.push(`/patsient/${patsient._id}`)"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ patsient.name }}</td>
						<td>{{ patsient.phone }}</td>
						<td>{{ patsient.department }}</td>
						<td>{{ patsient.spec }}</td>
						<td>{{ patsient.birthday }}</td>
						<td>{{ patsient.createdTime }}</td>
						<td>
							<button @click.stop="$router.push(`/patsient/${patsient._id}`)">
								<img src="../assets/img/eye.svg" />
							</button>
							<button @click.stop="edit(patsient._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click.stop="remove(patsient._id)">
								<img src="../assets/img/remove.svg" />
							</button>
						</td>
					</tr> -->
				</tbody>
			</table>
		</div>
		<button class="add" @click="$store.commit('setPatsientModalToggle', true)">
			<img src="@/assets/img/doctors.svg" alt="" />
		</button>
		<patsient-modal :editpatsient="patsient" />
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import patsientModal from '../components/patsientModal.vue'
export default {
	components: { patsientModal },
	data() {
		return {
			patsient: {},
		}
	},
	methods: {
		...mapActions(['getAllPatsients', 'deletePatsient', 'getPatsient']),
		async edit(id) {
			let res = await this.getPatsient(id)
			if (res?.status == 200) {
				this.$store.commit('setPatsientModalToggle', true)
				this.$store.commit('setPatsientEditModalToggle', true)
				this.patsient = { ...res.data }
			}
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deletePatsient(id)
			}
		},
	},
	computed: {
		...mapGetters(['patsients']),
	},
	mounted() {
		this.getAllPatsients()
	},
}
</script>
