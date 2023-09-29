<template>
	<div class="patsient">
		<!-- {{ patsient }} -->
		<div class="patsient__head">
			<div>
				<img :src="`http://95.130.227.52:3112/${patsient.avatar}`" />
			</div>
			<div class="patsient__data">
				<div class="patsient__name">{{ patsient.name }}</div>
				<div class="patsient__param">
					<div class="patsient__cat">
						<h4>Tashrif sanasi</h4>
						<p>{{ patsient.arriveDate }}</p>
					</div>
					<div class="patsient__cat">
						<h4>Davolangan bo’lim</h4>
						<p>{{ patsient.department }}</p>
					</div>
					<div class="patsient__cat">
						<h4>Ma'sul shifokor</h4>
						<p>{{ patsient.doctor }}</p>
					</div>
					<div class="patsient__cat">
						<h4>Sabab</h4>
						<p>{{ patsient.diagnos }}</p>
					</div>
				</div>
				<div class="patsient__edit"></div>
			</div>
		</div>
		<div class="patsient__personal">
			<div class="patsient__minititle">Shaxsiy ma’lumotlar</div>
			<div class="patsient__datas">
				<div class="patsient__cat">
					<h4>Tug’ilgan sanasi</h4>
					<p>{{ patsient.birthday }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Oilaviy holat</h4>
					<p>{{ patsient.married }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Telefon raqam</h4>
					<p>{{ patsient.phone }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Tug’ilgan hudud</h4>
					<p>{{ patsient.region }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Tug’ilgan tuman</h4>
					<p>{{ patsient.district }}</p>
				</div>

				<div class="patsient__cat">
					<h4>Ma’lumoti</h4>
					<p>{{ patsient.education }}</p>
				</div>

				<div class="patsient__cat">
					<h4>Oila a'zolaridan telefon raqam</h4>
					<p>{{ patsient.familyphone }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Bandlik holati</h4>
					<p>{{ patsient.employment }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Ish joyi</h4>
					<p>{{ patsient.workplace }}</p>
				</div>
			</div>
		</div>
		<div class="patsient__personal border">
			<div class="patsient__minititle">Tibbiy ma’lumotlar</div>
			<div class="patsient__datas">
				<div class="patsient__cat">
					<h4>Qon guruhi</h4>
					<p>{{ patsient.bloodtype }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Imtiyoz kategoriyasi</h4>
					<p>{{ patsient.privilege }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Invalidlik</h4>
					<p>{{ patsient.invalid }}</p>
				</div>
				<div class="patsient__cat">
					<h4>RH faktor</h4>
					<p>{{ patsient.factor }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Imtiyoz hujjati</h4>
					<p>{{ patsient.privilegeDoc }}</p>
				</div>

				<div class="patsient__cat">
					<h4>Vazni</h4>
					<p>{{ patsient.weight }} kg</p>
				</div>

				<div class="patsient__cat">
					<h4>Sug’urta polisi</h4>
					<p>{{ patsient.policy }}</p>
				</div>

				<div class="patsient__cat">
					<h4>Imtiyoz olingan sana</h4>
					<p>{{ patsient.privilegeDate }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Bo'yi</h4>
					<p>{{ patsient.height }} sm</p>
				</div>
				<div class="patsient__cat">
					<h4>Sug'urta firmasi</h4>
					<p>{{ patsient.policecompany }}</p>
				</div>
				<div class="patsient__cat">
					<h4>Allergik reaksiyalar</h4>
					<p>{{ patsient.reactions }}</p>
				</div>
			</div>
		</div>
	</div>
	<div class="box">
		<div class="d-flex justify-content-between align-items-center">
			<div class="title">Kasallik tarixi</div>

			<button class="patsient__work" @click="openModal">
				<span>+</span>
				Yangi ish faoliyat tarixi
			</button>
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Davolanish sanasi</th>
					<th>Kasallik turi</th>
					<th>Diagnoz</th>
					<th>Shifokor</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(history, index) in patsientHistorys" :key="history._id">
					<td>{{ history.date }}</td>
					<td>{{ history.diagnosType }}</td>
					<td>{{ history.diagnos }}</td>
					<td>{{ history.doctor }}</td>
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
	<div :class="` modal ${patsientHistoryToggle ? 'open' : ''}`">
		<div class="modal__box">
			<h4 class="text-center mb-20">
				{{
					patsientEditHistoryToggle
						? "Shifokorni ma'lumotlaini tahrirlash"
						: 'Yangi shifokorni ro’yhatdan o’tkazish'
				}}
			</h4>
			<form
				@submit.prevent="
					patsientEditHistoryToggle ? save() : postPatsientHistory()
				"
			>
				<div>
					<div class="part mt-10 mb-10 text-center">Kasallik tarixi</div>
					<section class="row step-1">
						<!-- date -->
						<div class="col-6 col-sm-12 mb-20">
							<!-- <label>Davolanish sanasi</label> -->
							<input
								class="input"
								type="text"
								placeholder="Davolanish sanasi"
								onfocus="this.type='date'"
								v-model="patsientHistory.date"
							/>
						</div>
						<!-- doctor -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="patsientHistory.doctor"
								placeholder="Lavozimni tanlang"
							>
								<option value="">Shifokor ism sharifi</option>
								<option
									v-for="doctor in doctors"
									:key="doctor._id"
									:value="doctor._id"
								>
									{{ doctor.name }}
								</option>
							</select>
						</div>
						<!-- diagnosType -->
						<div class="col-12 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Kasallik turi"
								v-model="patsientHistory.diagnosType"
							/>
						</div>
						<!-- diagnos -->
						<div class="col-12 col-sm-12 mb-20">
							<textarea
								class="input"
								placeholder="Diagnos"
								rows="10"
								v-model="patsientHistory.diagnos"
							/>
						</div>
					</section>
				</div>
			</form>
			<div class="modal__footer">
				<button class="btn danger" @click="clear">Bekor qilish</button>
				<button
					class="btn success btn__add"
					v-if="!patsientEditHistoryToggle"
					@click="postPatsientHistory"
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
			patsient: {},
			patsientHistory: {
				doctor: '',
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
			employmentList: [
				{
					id: 1,
					name: 'Ishlaydi',
				},
				{
					id: 2,
					name: 'Ishlamaydi',
				},
			],
			bloodList: [
				{
					id: 1,
					name: 'A',
				},
				{
					id: 2,
					name: 'B',
				},
				{
					id: 3,
					name: 'AB',
				},
				{
					id: 4,
					name: 'O',
				},
			],
			privilegeList: [
				{
					id: 1,
					name: 'Order sohibi',
				},
				{
					id: 2,
					name: 'Pensioner',
				},
				{
					id: 3,
					name: 'Kam taminlangan',
				},
				{
					id: 4,
					name: 'Imtiyozi yo`q',
				},
			],
			invalidList: [
				{
					id: 1,
					name: '1-guruh nogironi',
				},
				{
					id: 2,
					name: '2-guruh nogironi',
				},
				{
					id: 3,
					name: '3-guruh nogironi',
				},
				{
					id: 4,
					name: 'Invalid emas',
				},
			],
			factorList: [
				{
					id: 1,
					name: '+',
				},
				{
					id: 2,
					name: '-',
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
			'patsientHistorys',
			'doctors',
			'patsientHistoryToggle',
			'patsientEditHistoryToggle',
		]),
	},
	methods: {
		...mapActions(['getPatsient']),
		...mapActions([
			'getAllSpecs',
			'getAllDepartments',
			'getAllPositions',
			'getAllPatsientHistorys',
			'getAllDoctors',
			'addPatsientHistory',
			'updatePatsientHistory',
			'deletePatsientHistory',
			'getPatsientHistory',
		]),
		postPatsientHistory() {
			if (
				this.patsientHistory.date &&
				this.patsientHistory.diagnosType &&
				this.patsientHistory.doctor &&
				this.patsientHistory.diagnos
			) {
				this.addPatsientHistory({
					...this.patsientHistory,
					patsient: this.$route.params.id,
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
			let res = await this.getPatsientHistory(id)
			if (res?.status == 200) {
				this.$store.commit('setPatsientHistoryToggle', true)
				this.$store.commit('setPatsientEditHistoryToggle', true)
				this.patsientHistory = res.data
			}
		},
		save() {
			this.updatePatsientHistory({
				...this.patsientHistory,
				patsient: this.$route.params.id,
			})
			this.clear()
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deletePatsientHistory(id)
			}
		},
		openModal() {
			this.$store.commit('setPatsientHistoryToggle', true)
		},
		clear() {
			this.$store.commit('setPatsientHistoryToggle', false)
			this.$store.commit('setPatsientEditHistoryToggle', false)
			this.patsientHistory = {
				doctor: '',
			}
		},
	},
	async mounted() {
		await this.getAllPatsientHistorys(this.$route.params.id)
		await this.getAllSpecs()
		await this.getAllDepartments()
		await this.getAllPositions()
		await this.getAllDoctors()
		let res = await this.getPatsient(this.$route.params.id)
		if (res.status == 200) {
			this.patsient = { ...res.data }
			this.departments.forEach((dep) => {
				if (dep._id == this.patsient.department) {
					this.patsient.department = dep.title
				}
			})
			this.doctors.forEach((doctor) => {
				if (doctor._id == this.patsient.doctor) {
					this.patsient.doctor = doctor.name
				}
			})
			this.patsient.married = this.familyList[this.patsient.married - 1].title
			this.patsient.employment =
				this.employmentList[this.patsient.employment - 1].name
			this.patsient.bloodtype = this.bloodList[this.patsient.bloodtype - 1].name
			this.patsient.privilege =
				this.privilegeList[this.patsient.privilege - 1].name
			this.patsient.invalid = this.invalidList[this.patsient.invalid - 1].name
			this.patsient.factor = this.factorList[this.patsient.factor - 1].name
			this.patsient.education =
				this.educationList[this.patsient.education - 1].title
			this.regions.forEach((reg) => {
				if (reg.id == this.patsient.region) {
					this.patsient.region = reg.name
				}
			})
			this.districts.forEach((dis) => {
				if (dis.id == this.patsient.district) {
					this.patsient.district = dis.name
				}
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.patsient {
	border-radius: 8px;
	background: #fff;
	box-shadow: 0px 12px 26px 0px rgba(16, 30, 115, 0.06);
	&__head {
		display: flex;
		border-bottom: 1px solid #bdbdbd;
		img {
			height: 100%;
			width: 200px;
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
		&.border {
			border-top: 1px solid #bdbdbd;
		}
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
