<template>
	<div :class="` modal ${doctorModalToggle ? 'open' : ''}`">
		<div class="modal__box">
			<h4 class="text-center mb-20">
				{{
					doctorEditModalToggle
						? 'Bo`limni tahrirlash'
						: "Yangi bo'lim qo'shish"
				}}
			</h4>
			<form @submit.prevent="doctorEditModalToggle ? save() : postDoctor()">
				<!-- name -->
				<div class="col-12 col-sm-12 mb-20">
					<input
						class="input"
						type="text"
						v-model="doctor.name"
						placeholder="Ism familiyasini kiriting"
					/>
				</div>
				<!-- phone -->
				<div class="col-12 col-sm-12 mb-20">
					<input
						class="input"
						type="text"
						v-model="doctor.phone"
						placeholder="Telefon raqamini kiriting"
					/>
				</div>
				<!-- spec -->
				<div class="col-12 col-sm-12 mb-20">
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
				<div class="col-12 col-sm-12 mb-20">
					<select
						class="input"
						v-model="doctor.department"
						placeholder="Bo`lim nomini kiriting"
					>
						<option value="">Bo'limni ro'yxatdan tanlang</option>
						<option v-for="dep in departments" :key="dep._id" :value="dep._id">
							{{ dep.title }}
						</option>
					</select>
				</div>
				<!-- birtday -->
				<div class="col-12 col-sm-12 mb-20">
					<input class="input" type="date" v-model="doctor.birthday" />
				</div>
				<!-- region -->
				<div class="col-12 col-sm-12 mb-20">
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
				<div class="col-12 col-sm-12 mb-20">
					<select class="input" v-model="doctor.district">
						<option value="">Shahar/Tumanni ro'yxatdan tanlang</option>
						<option
							v-for="district in getDistricts"
							:key="district._id"
							:value="district._id"
						>
							{{ district.name }}
						</option>
					</select>
				</div>
			</form>
			<div class="modal__footer">
				<button class="btn danger" @click="clear">Bekor qilish</button>
				<button
					class="btn success btn__add"
					v-if="!doctorEditModalToggle"
					@click="postDoctor"
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
import { mapActions, mapGetters } from 'vuex'
import { regions, districts } from '@/db/places'
export default {
	props: ['editdoctor'],
	data() {
		return {
			regions: regions,
			districts: districts,
			doctor: {
				spec: '',
				region: '',
				district: '',
				department: '',
			},
			getDistricts: [],
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
		getRegion() {
			if (this.doctor.region) {
				this.getDistricts = this.districts.filter((district) => {
					return district.region_id == this.doctor.region
				})
			}
		},
		postDoctor() {
			if (this.doctor.name && this.doctor.phone && this.doctor.department) {
				this.addDoctor(this.doctor)
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Bo`lim nomini kiriting',
				})
			}
		},
		save() {
			this.updateDoctor(this.doctor)
			this.clear()
		},
		clear() {
			this.$store.commit('setDoctorModalToggle', false)
			this.$store.commit('setDoctorEditModalToggle', false)
			this.doctor = {
				spec: '',
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
			console.log(this.editdoctor)
			if (edit) {
				this.doctor = this.editdoctor
			}
		},
	},
}
</script>

<style></style>
