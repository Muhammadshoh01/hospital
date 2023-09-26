<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Bo'limlar</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>N</th>
						<th>Nomi</th>
						<th>Yaratilgan vaqt</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(department, index) in departments" :key="department._id">
						<td>{{ index + 1 }}</td>
						<td>{{ department.title }}</td>
						<td>{{ department.createdTime }}</td>
						<td align="right">
							<button @click="edit(department._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click="remove(department._id)">
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
					{{ editToggle ? 'Bo`limni tahrirlash' : "Yangi bo'lim qo'shish" }}
				</h4>
				<form id="depart" @submit.prevent="editToggle ? save() : postDepart()">
					<div class="col-12 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							v-model="department.title"
							placeholder="Bo'lim nomini kiriting"
							@keypress.enter="editToggle ? save() : postDepart()"
						/>
					</div>
				</form>
				<div class="modal__footer">
					<button class="btn danger" @click="clear">Bekor qilish</button>
					<button
						class="btn success btn__add"
						v-if="!editToggle"
						@click="postDepart"
					>
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
			department: {},
		}
	},
	methods: {
		...mapActions([
			'addDepartment',
			'getAllDepartments',
			'deleteDepartment',
			'getDepartment',
			'updateDepartment',
		]),
		postDepart() {
			if (this.department.title) {
				this.addDepartment(this.department)
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Bo`lim nomini kiriting',
				})
			}
		},
		clear() {
			this.toggle = false
			this.editToggle = false
			this.department.title = ''
		},
		async edit(id) {
			let res = await this.getDepartment(id)
			if (res?.status == 200) {
				this.toggle = true
				this.editToggle = true
				this.department = { ...res.data }
			}
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteDepartment(id)
			}
		},
		save() {
			this.updateDepartment(this.department)
			this.clear()
		},
	},
	computed: {
		...mapGetters(['departments']),
	},
	mounted() {
		this.getAllDepartments()
	},
}
</script>

<style></style>
