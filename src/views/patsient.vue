<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Bemorlar</div>
				<div>
					<button @click="getPatsientExcel" class="excel btn">
						<img src="@/assets/img/excelIcon.svg" />
						Excel
					</button>
				</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>Ism-sharif</th>
						<th>Raqami</th>
						<th>Sana</th>
						<th>Shifokor</th>
						<th>Bo'lim</th>
						<th>Sabab</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(patsient, index) in patsients"
						:key="patsient._id"
						@click="$router.push(`/patsient/${patsient._id}`)"
					>
						<td class="first">
							<img :src="`http://95.130.227.52:3112/${patsient.avatar}`" />
							{{ patsient.name }}
						</td>
						<td>{{ patsient.phone }}</td>
						<td>{{ patsient.arriveDate }}</td>
						<td>{{ patsient.doctor }}</td>
						<td>{{ patsient.department }}</td>
						<td>{{ patsient.diagnos }}</td>
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
					</tr>
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
		...mapActions([
			'getAllPatsients',
			'deletePatsient',
			'getPatsient',
			'getPatsientExcel',
		]),
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
