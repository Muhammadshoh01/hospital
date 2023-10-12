<template>
	<div :class="` modal ${patsientModalToggle ? 'open' : ''}`">
		<div class="modal__box">
			<h4 class="text-center mb-20">
				{{
					patsientEditModalToggle
						? "Bemorni ma'lumotlarini tahrirlash"
						: 'Yangi bemorni ro’yxatdan o’tkazish'
				}}
			</h4>
			<form
				@submit.prevent="patsientEditModalToggle ? save() : postPatsient()"
				id="patsientForm"
			>
				<div v-if="step == 1">
					<div class="step">1</div>
					<div class="part mt-10 mb-10 text-center">Shaxsiy ma'lumotlar</div>
					<section class="row step-1">
						<!-- name -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.name"
								placeholder="Ism familiyasini kiriting"
							/>
						</div>
						<!-- birthday -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Tug'ilgan kun"
								onfocus="this.type='date'"
								v-model="patsient.birthday"
							/>
						</div>
						<!-- region -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								@change="getRegion"
								v-model="patsient.region"
							>
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
							<select class="input" v-model="patsient.district">
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
						<!-- address -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.address"
								placeholder="Manzilni kiriting"
							/>
						</div>
						<!-- education -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="patsient.education"
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
								v-model="patsient.married"
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
						<!-- employment -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="patsient.employment"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Bandlik holatni tanlang</option>
								<option
									v-for="emp in employmentList"
									:key="emp.id"
									:value="emp.id"
								>
									{{ emp.name }}
								</option>
							</select>
						</div>
						<!-- workplace -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.workplace"
								placeholder="Ish joyi"
							/>
						</div>
						<!-- phone -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								v-maska
								data-maska="+998 (##) ###-##-##"
								class="input"
								type="text"
								v-model="patsient.phone"
								placeholder="Telefon raqamini kiriting"
							/>
						</div>
						<!-- familyphone -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								v-maska
								data-maska="+998 (##) ###-##-##"
								class="input"
								type="text"
								v-model="patsient.familyphone"
								placeholder="Oila a’zolaridan telefon raqam"
							/>
						</div>
						<!-- gender -->
						<div class="col-6 col-sm-12 mb-20">
							<select
								class="input"
								v-model="patsient.gender"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Jinsni tanlang</option>
								<option
									v-for="gender in genderList"
									:key="gender.id"
									:value="gender.id"
								>
									{{ gender.name }}
								</option>
							</select>
						</div>
						<div class="col-6 col-sm-12 mb-20">
							<input type="file" ref="patsientImg" @change="uploadFile" />
						</div>
					</section>
				</div>
				<div v-if="step == 2">
					<div class="step">2</div>
					<div class="part mt-10 mb-10 text-center">Tibbiy ma’lumotlar</div>
					<section class="row step-2">
						<!-- blodtype -->
						<div class="col-3 col-sm-6 mb-20">
							<select
								class="input"
								v-model="patsient.bloodtype"
								placeholder="Bo`lim nomini kiriting"
							>
								<option value="">Qon guruhini tanlang</option>
								<option
									v-for="blood in bloodList"
									:key="blood.id"
									:value="blood.id"
								>
									{{ blood.name }}
								</option>
							</select>
						</div>
						<!-- factor -->
						<div class="col-3 col-sm-6 mb-20">
							<select class="input" v-model="patsient.factor">
								<option value="">Rezus faktor</option>
								<option
									v-for="factor in factorList"
									:key="factor.id"
									:value="factor.id"
								>
									{{ factor.name }}
								</option>
							</select>
						</div>
						<!-- policy -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.policy"
								placeholder="Sug'urta polisini kiriting"
							/>
						</div>
						<!-- policecompany -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.policecompany"
								placeholder="Sug'urta firmasini kiriting"
							/>
						</div>
						<!-- privilege -->
						<div class="col-6 col-sm-6 mb-20">
							<select class="input" v-model="patsient.privilege">
								<option value="">Imtiyoz kategoriyasi</option>
								<option
									v-for="pri in privilegeList"
									:key="pri.id"
									:value="pri.id"
								>
									{{ pri.name }}
								</option>
							</select>
						</div>
						<!-- privilegeDoc -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.privilegeDoc"
								placeholder="Imtiyoz hujjatini kiriting"
							/>
						</div>
						<!-- privilegeDate -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Imtiyoz olingan sana"
								onfocus="this.type='date'"
								v-model="patsient.privilegeDate"
							/>
						</div>
						<!-- invalid -->
						<div class="col-6 col-sm-6 mb-20">
							<select class="input" v-model="patsient.invalid">
								<option value="">Invalidlik</option>
								<option
									v-for="inv in invalidList"
									:key="inv.id"
									:value="inv.id"
								>
									{{ inv.name }}
								</option>
							</select>
						</div>
						<!--reactions -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.reactions"
								placeholder="Allergik reaksiyalar"
							/>
						</div>
					</section>
				</div>
				<div v-if="step == 3">
					<div class="step">3</div>
					<div class="part mt-10 mb-10 text-center">Tashrif ma’lumotlari</div>
					<section class="row step-2">
						<!-- arriveDate -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								placeholder="Tashrif sanasi"
								onfocus="this.type='date'"
								v-model="patsient.arriveDate"
							/>
						</div>
						<!-- doctor -->
						<div class="col-6 col-sm-12 mb-20">
							<select class="input" v-model="patsient.doctor">
								<option value="">Ma'sul shifokor</option>
								<option v-for="doc in doctors" :key="doc._id" :value="doc._id">
									{{ doc.name }}
								</option>
							</select>
						</div>
						<!-- department -->
						<div class="col-6 col-sm-12 mb-20">
							<select class="input" v-model="patsient.department">
								<option value="">Davolangan bo'lim</option>
								<option
									v-for="dep in departments"
									:key="dep._id"
									:value="dep._id"
								>
									{{ dep.title }}
								</option>
							</select>
						</div>
						<!--diagnos -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="text"
								v-model="patsient.diagnos"
								placeholder="Diagnos"
							/>
						</div>
						<!--weight -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="number"
								v-model="patsient.weight"
								placeholder="Vazni"
							/>
						</div>
						<!--height -->
						<div class="col-6 col-sm-12 mb-20">
							<input
								class="input"
								type="number"
								v-model="patsient.height"
								placeholder="Bo'yi"
							/>
						</div>
					</section>
				</div>
			</form>
			<div class="modal__footer">
				<button class="btn danger" @click="clear">Bekor qilish</button>
				<button
					class="btn success btn__add"
					v-if="
						(patsientEditModalToggle || patsientModalToggle) &&
						(step == 1 || step == 2)
					"
					@click="nextStep"
				>
					Keyingi qadam
				</button>
				<button
					class="btn success btn__add"
					v-else-if="!patsientEditModalToggle && step == 3"
					@click="postPatsient"
				>
					Kiritish
				</button>
				<button
					class="btn success hide btn__edit"
					v-else-if="patsientEditModalToggle && step == 3"
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
	props: ['editpatsient'],
	directives: { maska: vMaska },
	data() {
		return {
			step: 1,
			regions: regions,
			districts: districts,
			patsient: {
				region: '',
				district: '',
				education: '',
				married: '',
				employment: '',
				gender: '',
				bloodtype: '',
				factor: '',
				privilege: '',
				invalid: '',
				doctor: '',
				department: '',
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
			genderList: [
				{
					id: 1,
					name: 'erkak',
				},
				{
					id: 2,
					name: 'ayol',
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
			image: '',
		}
	},
	methods: {
		...mapActions([
			'addPatsient',
			'getPatsient',
			'updatePatsient',
			'getAllDepartments',
			'getAllSpecs',
			'getAllDoctors',
		]),
		getRegion() {
			if (this.patsient.region) {
				this.getDistricts = this.districts.filter((district) => {
					return district.region_id == this.patsient.region
				})
			}
		},
		nextStep() {
			if (this.step == 1) {
				if (
					this.patsient.name &&
					this.patsient.birthday &&
					this.patsient.region &&
					this.patsient.district &&
					this.patsient.education &&
					this.patsient.married &&
					this.patsient.phone &&
					this.patsient.employment &&
					this.patsient.workplace &&
					this.patsient.familyphone &&
					this.patsient.gender
				) {
					this.step = 2
					return false
				} else {
					this.$store.commit('setNotif', {
						type: 'warning',
						text: 'Barcha maydonlarni to`ldiring',
					})
				}
			}
			if (this.step == 2) {
				if (
					this.patsient.bloodtype &&
					this.patsient.factor &&
					this.patsient.policy &&
					this.patsient.policecompany &&
					this.patsient.privilege &&
					this.patsient.privilegeDoc &&
					this.patsient.privilegeDate &&
					this.patsient.invalid &&
					this.patsient.reactions
				) {
					this.step = 3
				} else {
					this.$store.commit('setNotif', {
						type: 'warning',
						text: 'Barcha maydonlarni to`ldiring',
					})
				}
			}
		},
		uploadFile() {
			this.image = this.$refs.patsientImg.files[0]
		},
		postPatsient() {
			if (
				this.patsient.arriveDate &&
				this.patsient.doctor &&
				this.patsient.department &&
				this.patsient.diagnos &&
				this.patsient.weight &&
				this.patsient.height
			) {
				let data = new FormData()
				for (const key in this.patsient) {
					data.append(key, this.patsient[key])
				}
				data.append('avatar', this.image)
				console.log(data)
				console.log(this.patsient)
				this.addPatsient(data)
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
			this.updatePatsient(this.patsient)
			this.patsient = {
				spec: '',
				region: '',
				district: '',
				department: '',
				family: '',
				education: '',
			}
			this.step = 1
			this.$store.commit('setPatsientModalToggle', false)
			this.$store.commit('setPatsientEditModalToggle', false)
		},
		clear() {
			if (this.step == 2) {
				this.step = 1
			} else if (this.step == 3) {
				this.step = 2
			} else {
				this.$store.commit('setPatsientModalToggle', false)
				this.$store.commit('setPatsientEditModalToggle', false)
				this.patsient = {
					spec: '',
					region: '',
					district: '',
					department: '',
					family: '',
					education: '',
				}
			}
		},
	},
	computed: {
		...mapGetters([
			'patsientModalToggle',
			'patsientEditModalToggle',
			'departments',
			'specs',
			'doctors',
		]),
	},
	mounted() {
		this.getAllDepartments()
		this.getAllSpecs()
		this.getAllDoctors()
	},
	watch: {
		patsientEditModalToggle(edit) {
			if (edit) {
				this.patsient = this.editpatsient
			}
		},
	},
}
</script>

<style></style>
