<template>
	<div :class="` modal ${doctorModalToggle ? 'open' : ''}`">
		<div class="modal__box">
			<h4 class="text-center mb-20">
				{{
					doctorEditModalToggle
						? "Shifokorni ma'lumotlarini tahrirlash"
						: 'Yangi shifokorni ro’yhatdan o’tkazish'
				}}
			</h4>
			<form @submit.prevent="doctorEditModalToggle ? save() : postDoctor()">
				<div v-if="step == 1">
					<div class="step">1</div>
					<div class="part mt-10 mb-10 text-center">Shaxsiy ma'lumotlar</div>
					<section class="row step-1">
						<!-- name -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="doctor.name"
								placeholder="Ism familiyasini kiriting"
							/>
						</div>
						<!-- phone -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								v-maska
								data-maska="+998 (##) ###-##-##"
								class="input"
								type="text"
								v-model="doctor.phone"
								placeholder="Telefon raqamini kiriting"
							/>
						</div>
						<!-- education -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="doctor.education"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Ta'limni ro'yxatdan tanlang</option>
								<option
									v-for="edu in educationList"
									:key="edu.id"
									:value="edu.id"
								>
									{{ edu.title }}
								</option>
							</select>
						</div>
						<!-- family -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="doctor.family"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Oilaviy holatni tanlang</option>
								<option
									v-for="family in familyList"
									:key="family.id"
									:value="family.id"
								>
									{{ family.title }}
								</option>
							</select>
						</div>
						<!-- birtday -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Tug`ilgan kun"
								onfocus="(this.type='date')"
								onblur="(this.type='text')"
								v-model="doctor.birthday"
							/>
						</div>
						<!-- region -->
						<div class="col-6 col-sm-12 mb-20">
							<select class="input" @change="getRegion" v-model="doctor.region">
								<option value="">Viloyatni ro'yxatdan tanlang</option>
								<option
									v-for="region in regions"
									:key="region.id"
									:value="region.id"
								>
									{{ region.name }}
								</option>
							</select>
						</div>
						<!-- district -->
						<div class="col-6 col-sm-12 mb-20">
							<select class="input" v-model="doctor.district">
								<option value="">Shahar/Tumanni ro'yxatdan tanlang</option>
								<option
									v-for="district in getDistricts"
									:key="district.id"
									:value="district.id"
								>
									{{ district.name }}
								</option>
							</select>
						</div>
						<!-- file -->
						<div class="col-6 col-sm-12 mb-20">
							<input type="file" ref="doctorImg" @change="uploadFile" />
						</div>
					</section>
				</div>
				<div v-if="step == 2">
					<div class="step">2</div>
					<div class="part mt-10 mb-10 text-center">
						Mutaxassisslik ma'lumotlari
					</div>
					<section class="row step-2">
						<!-- spec -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="doctor.spec"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Mutaxassisslikni ro'yxatdan tanlang</option>
								<option v-for="spec in specs" :key="spec._id" :value="spec._id">
									{{ spec.title }}
								</option>
							</select>
						</div>
						<!-- department -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="doctor.department"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Bo'limni ro'yxatdan tanlang</option>
								<option
									v-for="dep in departments"
									:key="dep._id"
									:value="dep._id"
								>
									{{ dep.title }}
								</option>
							</select>
						</div>
						<!-- experience -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="number"
								v-model="doctor.exp"
								placeholder="Ish tajribasini kiriting"
							/>
						</div>
						<!-- worktime -->
						<div class="col-6 col-sm-12 mb-20">
							<select class="input" v-model="doctor.worktime">
								<option value="">Ish grafigini tanlang</option>
								<option
									v-for="work in workTimeList"
									:key="work.id"
									:value="work.id"
								>
									{{ work.name }}
								</option>
							</select>
						</div>
						<!-- startTime -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Ishga kirgan vaqt"
								onfocus="(this.type='date')"
								v-model="doctor.startTime"
							/>
						</div>
					</section>
				</div>
			</form>
			<div class="modal__footer">
				<button class="btn danger" @click="clear">Bekor qilish</button>
				<button
					class="btn success btn__add"
					v-if="(doctorEditModalToggle || doctorModalToggle) && step == 1"
					@click="nextStep"
				>
					Keyingi qadam
				</button>
				<button
					class="btn success btn__add"
					v-else-if="!doctorEditModalToggle && step == 2"
					@click="postDoctor"
				>
					Kiritish
				</button>
				<button
					class="btn success hide btn__edit"
					v-else-if="doctorEditModalToggle && step == 2"
					@click="save()"
				>
					Saqlash
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { regions, districts } from '@/db/places'
import { vMaska } from 'maska'

export default {
	props: ['editdoctor'],
	directives: { maska: vMaska },
	data() {
		return {
			step: 1,
			regions: regions,
			districts: districts,
			doctor: {
				spec: '',
				region: '',
				district: '',
				department: '',
				education: '',
				family: '',
				worktime: '',
			},
			getDistricts: [],
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
			image: '',
		}
	},
	methods: {
		...mapActions([
			'addDoctor',
			'getDoctor',
			'updateDoctor',
			'getAllDepartments',
			'getAllSpecs',
		]),
		uploadFile() {
			this.image = this.$refs.doctorImg.files[0]
		},
		getRegion() {
			if (this.doctor.region) {
				this.getDistricts = this.districts.filter((district) => {
					return district.region_id == this.doctor.region
				})
			}
		},
		nextStep() {
			if (
				this.doctor.name &&
				this.doctor.phone &&
				this.doctor.education &&
				this.doctor.family &&
				this.doctor.birthday &&
				this.doctor.district &&
				this.doctor.region
			) {
				this.step = 2
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Barcha maydonlarni to`ldiring',
				})
			}
		},
		postDoctor() {
			if (
				this.doctor.education &&
				this.doctor.family &&
				this.doctor.worktime &&
				this.doctor.exp
			) {
				let data = new FormData()
				for (const key in this.doctor) {
					data.append(key, this.doctor[key])
				}
				data.append('file', this.image)
				console.log(data)
				console.log(this.doctor)
				this.addDoctor(data)
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: "Barcha maydonlarni to'ldiring",
				})
			}
			this.step = 1
			this.clear()
		},
		save() {
			this.updateDoctor(this.doctor)
			this.doctor = {
				spec: '',
				region: '',
				district: '',
				department: '',
				education: '',
				family: '',
				worktime: '',
			}
			this.step = 1
			this.$store.commit('setDoctorModalToggle', false)
			this.$store.commit('setDoctorEditModalToggle', false)
		},
		clear() {
			if (this.step == 2) {
				this.step = 1
			} else {
				this.$store.commit('setDoctorModalToggle', false)
				this.$store.commit('setDoctorEditModalToggle', false)
				this.doctor = {
					spec: '',
					region: '',
					district: '',
					department: '',
					education: '',
					family: '',
					worktime: '',
				}
			}
		},
	},
	computed: {
		...mapGetters([
			'doctorModalToggle',
			'doctorEditModalToggle',
			'departments',
			'specs',
		]),
	},
	mounted() {
		this.getAllDepartments()
		this.getAllSpecs()
	},
	watch: {
		doctorEditModalToggle(edit) {
			if (edit) {
				this.doctor = this.editdoctor
			}
		},
	},
}
</script>

<style></style>
