<template>
	<div class="doctor">
		<div class="doctor__head">
			<div>
				<img src="../../assets/img/doc.png" />
			</div>
			<div class="doctor__data">
				<div class="doctor__name">{{ doctor.name }}</div>
				<div class="doctor__param">
					<div class="doctor__cat">
						<h4>Mutaxassisligi</h4>
						<p>{{ doctor.spec }}</p>
					</div>
					<div class="doctor__cat">
						<h4>Ishlayotgan bo’lim</h4>
						<p>{{ doctor.department }}</p>
					</div>
					<div class="doctor__cat">
						<h4>Ish staji</h4>
						<p>{{ doctor.exp }} yil</p>
					</div>
					<div class="doctor__cat">
						<h4>Ish grafigi</h4>
						<p>{{ doctor.worktime }}</p>
					</div>
					<div class="doctor__cat">
						<h4>Ishga kirgan sana</h4>
						<p>{{ doctor.startTime }}</p>
					</div>
				</div>
				<div class="doctor__edit"></div>
			</div>
		</div>
		<div class="doctor__personal">
			<div class="doctor__minititle">Shaxsiy ma’lumotlar</div>
			<div class="doctor__datas">
				<div class="doctor__cat">
					<h4>Tug’ilgan sanasi</h4>
					<p>{{ doctor.birthday }}</p>
				</div>
				<div class="doctor__cat">
					<h4>Oilaviy holat</h4>
					<p>{{ doctor.family }}</p>
				</div>
				<div class="doctor__cat">
					<h4>Telefon raqam</h4>
					<p>{{ doctor.phone }}</p>
				</div>
				<div class="doctor__cat">
					<h4>Tug’ilgan hudud</h4>
					<p>{{ doctor.region }}</p>
				</div>
				<div class="doctor__cat">
					<h4>Tug’ilgan tuman</h4>
					<p>{{ doctor.district }}</p>
				</div>

				<div class="doctor__cat">
					<h4>Ma’lumoti</h4>
					<p>{{ doctor.education }}</p>
				</div>

				<!-- <div class="doctor__cat">
					<h4>Ma’lumoti</h4>
					<p>{{ doctor.education }}</p>
				</div> -->
			</div>
		</div>
	</div>
	<div class="box">
		<div class="d-flex justify-content-between align-items-center">
			<div class="title">Mehnat faoliyati</div>

			<button class="doctor__work" @click="openModal">
				<span>+</span>
				Yangi ish faoliyat tarixi
			</button>
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Muassasa nomi</th>
					<th>Ish faoliyat muddati</th>
					<th>Lavozimi</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(history, index) in doctorHistorys" :key="history._id">
					<td>{{ history.title }}</td>
					<td>{{ history.startDate }} - {{ history.endDate }}</td>
					<td>{{ history.position }}</td>
					<td>
						<button @click.stop="edit(history._id)">
							<img src="../../assets/img/edit.svg" />
						</button>
						<button @click.stop="remove(history._id)">
							<img src="../../assets/img/remove.svg" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div :class="` modal ${doctorHistoryToggle ? 'open' : ''}`">
		<div class="modal__box">
			<h4 class="text-center mb-20">
				{{
					doctorEditHistoryToggle
						? "Shifokorni tarixi ma'lumotlaini tahrirlash"
						: 'Shifokorning yangi tarixini ro’yhatdan o’tkazish'
				}}
			</h4>
			<form
				@submit.prevent="doctorEditHistoryToggle ? save() : postDoctorHistory()"
			>
				<div>
					<div class="part mt-10 mb-10 text-center">Ish faoliyati tarixi</div>
					<section class="row step-1">
						<!-- startDate -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Ishga kirgan sana"
								onfocus='this.type="date"'
								v-model="history.startDate"
							/>
						</div>
						<!-- endDate -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Ishni tugatgan sanasi"
								onfocus='this.type="date"'
								v-model="history.endDate"
							/>
						</div>
						<!-- position -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="history.position"
								placeholder="Lavozimni tanlang"
							>
								<option value="">Lavozimni tanlang</option>
								<option
									v-for="pos in positions"
									:key="pos._id"
									:value="pos._id"
								>
									{{ pos.title }}
								</option>
							</select>
						</div>
						<!-- ishlagan manzili -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								placeholder="Ishlagan shifoxona manzili"
								type="text"
								v-model="history.title"
							/>
						</div>
					</section>
				</div>
			</form>
			<div class="modal__footer">
				<button class="btn danger" @click="clear">Bekor qilish</button>
				<button
					class="btn success btn__add"
					v-if="!doctorEditHistoryToggle"
					@click="postDoctorHistory"
				>
					Kiritish
				</button>
				<button class="btn success hide btn__edit" v-else @click="save()">
					Saqlash
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { regions, districts } from '@/db/places'
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			regions: regions,
			districts: districts,
			doctor: {},
			history: {
				position: '',
			},
			familyList: [
				{
					id: 1,
					title: 'Uylangan/Turmushga chiqqan',
				},
				{
					id: 2,
					title: 'Uylanmagan/Turmushga chiqmagan',
				},
			],
			educationList: [
				{
					id: 1,
					title: 'Maktabni bitirgan',
				},
				{
					id: 2,
					title: "O'rta Maxsus",
				},
				{
					id: 3,
					title: 'Oliy',
				},
			],

			workTimeList: [
				{
					id: 1,
					name: 'Yarim stavka',
				},
				{
					id: 2,
					name: 'Asosiy shtat',
				},
				{
					id: 3,
					name: 'O`rindosh',
				},
			],
		}
	},
	computed: {
		...mapGetters([
			'specs',
			'positions',
			'departments',
			'doctorHistorys',
			'doctorHistoryToggle',
			'doctorEditHistoryToggle',
		]),
	},
	methods: {
		...mapActions(['getDoctor']),
		...mapActions([
			'getAllSpecs',
			'getAllDepartments',
			'getAllPositions',
			'getAllDoctorHistorys',
			'addDoctorHistory',
			'updateDoctorHistory',
			'deleteDoctorHistory',
			'getDoctorHistory',
		]),
		postDoctorHistory() {
			if (
				this.history.startDate &&
				this.history.endDate &&
				this.history.title &&
				this.history.position
			) {
				this.addDoctorHistory({
					...this.history,
					doctor: this.$route.params.id,
				})
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: "Barcha maydonlarni to'ldiring",
				})
			}
		},
		async edit(id) {
			let res = await this.getDoctorHistory(id)
			if (res?.status == 200) {
				this.$store.commit('setDoctorHistoryToggle', true)
				this.$store.commit('setDoctorEditHistoryToggle', true)
				this.history = res.data
			}
		},
		save() {
			this.updateDoctorHistory({
				...this.history,
				doctor: this.$route.params.id,
			})
			this.clear()
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteDoctorHistory(id)
			}
		},
		openModal() {
			this.$store.commit('setDoctorHistoryToggle', true)
		},
		clear() {
			this.$store.commit('setDoctorHistoryToggle', false)
			this.$store.commit('setDoctorEditHistoryToggle', false)
			this.history = {
				position: '',
			}
		},
	},
	async mounted() {
		await this.getAllDoctorHistorys(this.$route.params.id)
		await this.getAllSpecs()
		await this.getAllDepartments()
		await this.getAllPositions()
		let res = await this.getDoctor(this.$route.params.id)
		if (res.status == 200) {
			this.doctor = { ...res.data }

			this.specs.forEach((spec) => {
				if (spec._id == this.doctor.spec) {
					this.doctor.spec = spec.title
				}
			})
			this.departments.forEach((dep) => {
				if (dep._id == this.doctor.department) {
					this.doctor.department = dep.title
				}
			})
			this.doctor.worktime = this.workTimeList[this.doctor.worktime - 1].name
			this.doctor.family = this.familyList[this.doctor.family - 1].title
			this.doctor.education =
				this.educationList[this.doctor.education - 1].title
			this.regions.forEach((reg) => {
				if (reg.id == this.doctor.region) {
					this.doctor.region = reg.name
				}
			})
			this.districts.forEach((dis) => {
				if (dis.id == this.doctor.district) {
					this.doctor.district = dis.name
				}
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.doctor {
	border-radius: 8px;
	background: #fff;
	box-shadow: 0px 12px 26px 0px rgba(16, 30, 115, 0.06);
	&__head {
		display: flex;
		border-bottom: 1px solid #bdbdbd;
		img {
			height: 100%;
		}
	}
	&__data {
		padding: 20px;
	}
	&__param {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 60px;
		row-gap: 25px;
		padding-top: 20px;
	}
	&__name {
		color: #25282b;
		font-size: 26px;
		font-weight: 700;
		letter-spacing: 0.2px;
	}
	&__cat {
		display: flex;
		align-items: center;
		gap: 40px;
		h4 {
			color: #606060;
			font-size: 14px;
			letter-spacing: 0.2px;
		}
		p {
			color: #000;
			font-weight: 700;
			letter-spacing: 0.2px;
		}
	}
	&__personal {
		padding: 20px;
	}
	&__datas {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 60px;
		row-gap: 25px;
		padding-top: 20px;
	}
	&__work {
		background-color: #336cfb;
		border-radius: 10px;
		color: #fff;
		display: flex;
		align-items: center;
		padding: 10px 20px;
		gap: 10px;
		font-size: 9px;
		font-weight: 500;
		line-height: 26px;
		letter-spacing: 0.2px;
		margin-right: 25px;
		span {
			font-size: 24px;
			font-weight: 700;
		}
	}
	&__minititle {
		color: #25282b;
		font-size: 20px;
		font-weight: 700;
		line-height: 26px;
		letter-spacing: 0.2px;
	}
}
.box {
	margin-top: 35px;
	border-radius: 8px;
	background: #fff;
	box-shadow: 0px 12px 26px 0px rgba(16, 30, 115, 0.06);
}
</style>
