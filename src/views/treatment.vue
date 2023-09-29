<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Muolajalar</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>Bemor</th>
						<th>Shifokor</th>
						<th>Davolanish vaqi</th>
						<th>Xona</th>
						<th>Narx</th>
						<th>Xulosa</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="treatment in treatments" :key="treatment._id">
						<td>{{ treatment.patsient }}</td>
						<td>{{ treatment.doctor }}</td>
						<td>{{ treatment.date }}</td>
						<td>{{ treatment.room }}</td>
						<td>{{ treatment.price.toLocaleString() }} so'm</td>
						<td>{{ treatment.comment }}</td>
						<td align="right">
							<button @click="edit(treatment._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click="remove(treatment._id)">
								<img src="../assets/img/remove.svg" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<button class="add" @click="toggle = true">
			<img src="@/assets/img/doctors.svg" alt="" />
		</button>
		<div :class="` modal ${toggle ? 'open' : ''}`">
			<div class="modal__box">
				<h4 class="text-center mb-20">
					{{ editToggle ? 'Muolajani tahrirlash' : "Yangi muolaja qo'shish" }}
				</h4>
				<form
					class="row"
					id="depart"
					@submit.prevent="editToggle ? save() : add()"
				>
					<!-- patsient -->
					<div class="col-6 col-sm-12 mb-20">
						<select class="input" v-model="treatment.patsient">
							<option value="">Bemorni tanlang</option>
							<option
								v-for="patsient in patsients"
								:key="patsient._id"
								:value="patsient._id"
							>
								{{ patsient.name }}
							</option>
						</select>
					</div>
					<!-- doctor -->
					<div class="col-6 col-sm-12 mb-20">
						<select class="input" v-model="treatment.doctor">
							<option value="">Shifokorni tanlang</option>
							<option
								v-for="doctor in doctors"
								:key="doctor._id"
								:value="doctor._id"
							>
								{{ doctor.name }}
							</option>
						</select>
					</div>
					<!-- room -->
					<div class="col-6 col-sm-12 mb-20">
						<select class="input" v-model="treatment.room">
							<option value="">Xonani raqamini tanlang</option>
							<option v-for="room in rooms" :key="room._id" :value="room._id">
								{{ room.number }}
							</option>
						</select>
					</div>
					<!-- date -->
					<div class="col-6 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							placeholder="Muolaja sanasi"
							onfocus="(this.type='date')"
							onblur="(this.type='text')"
							v-model="treatment.date"
						/>
					</div>
					<!-- price -->
					<div class="col-6 col-sm-12 mb-20">
						<input
							class="input"
							type="number"
							placeholder="Muolaja narxi"
							v-model="treatment.price"
						/>
					</div>
					<!-- comment -->
					<div class="col-6 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							name="title"
							v-model="treatment.comment"
							placeholder="Muolaja xulosasi"
						/>
					</div>
				</form>
				<div class="modal__footer">
					<button class="btn danger" @click="clear">Bekor qilish</button>
					<button class="btn success btn__add" v-if="!editToggle" @click="add">
						Kiritish
					</button>
					<button class="btn success hide btn__edit" v-else @click="save()">
						Saqlash
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			toggle: false,
			editToggle: false,
			treatment: {
				patsient: '',
				doctor: '',
				room: '',
			},
		}
	},
	methods: {
		...mapActions([
			'addTreatment',
			'getAllTreatments',
			'deleteTreatment',
			'getTreatment',
			'updateTreatment',
			'getAllPatsients',
			'getAllRooms',
			'getAllDoctors',
		]),
		add() {
			if (
				this.treatment.patsient &&
				this.treatment.doctor &&
				this.treatment.room &&
				this.treatment.date &&
				this.treatment.price &&
				this.treatment.comment
			) {
				this.addTreatment(this.treatment)
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Barcha maydonlarni to`ldiring',
				})
			}
		},
		clear() {
			this.toggle = false
			this.treatment = {
				patsient: '',
				doctor: '',
				room: '',
			}
			this.editToggle = false
		},
		async edit(id) {
			let res = await this.getTreatment(id)
			if (res?.status == 200) {
				this.toggle = true
				this.editToggle = true
				this.treatment = { ...res.data }
			}
		},
		save() {
			this.updateTreatment(this.treatment)
			this.clear()
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteTreatment(id)
			}
		},
	},
	computed: {
		...mapGetters(['treatments', 'patsients', 'rooms', 'doctors']),
	},
	mounted() {
		this.getAllTreatments()
		this.getAllPatsients()
		this.getAllRooms()
		this.getAllDoctors()
	},
}
</script>

<style></style>
