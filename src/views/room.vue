<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Xonalar</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>N</th>
						<th>Xona raqami</th>
						<th>Bo'lim</th>
						<th>Sig'imi</th>
						<th>Yaratilgan vaqt</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(room, index) in rooms" :key="room._id">
						<td>{{ index + 1 }}</td>
						<td>{{ room.number }}</td>
						<td>{{ room.department }}</td>
						<td>{{ room.maxcount }}</td>
						<td>{{ room.createdTime }}</td>
						<td @click="edit(room._id)">edit</td>
						<td><button @click="remove(room._id)">X</button></td>
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
					{{ editToggle ? 'Xonani tahrirlash' : "Yangi xona qo'shish" }}
				</h4>
				<form @submit.prevent="editToggle ? save() : postRoom()">
					<div class="col-12 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							v-model="room.number"
							placeholder="Xona raqamini kiriting"
						/>
					</div>
					<div class="col-12 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							v-model="room.maxcount"
							placeholder="Xona sig'imini kiriting"
						/>
					</div>
					<div class="col-12 col-sm-12 mb-20">
						<select
							class="input"
							v-model="room.department"
							placeholder="Bo`lim nomini kiriting"
						>
							<option value="">Ro'yxatdan tanlang</option>
							<option
								v-for="department in departments"
								:key="department._id"
								:value="department._id"
							>
								{{ department.title }}
							</option>
						</select>
					</div>
				</form>
				<div class="modal__footer">
					<button class="btn danger" @click="clear">Bekor qilish</button>
					<button
						class="btn success btn__add"
						v-if="!editToggle"
						@click="postRoom"
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
			room: {
				department: '',
			},
		}
	},
	methods: {
		...mapActions([
			'addRoom',
			'getAllRooms',
			'deleteRoom',
			'getRoom',
			'updateRoom',
			'getAllDepartments',
		]),
		postRoom() {
			if (this.room.number && this.room.maxcount && this.room.department) {
				this.addRoom(this.room)
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
			this.room = {
				department: '',
			}
		},
		async edit(id) {
			let res = await this.getRoom(id)
			if (res?.status == 200) {
				console.log(res.data)
				this.toggle = true
				this.editToggle = true
				this.room = { ...res.data }
				// this.room.department = this.room.department._id
			}
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteRoom(id)
			}
		},
		save() {
			this.updateRoom(this.room)
			this.clear()
		},
	},
	computed: {
		...mapGetters(['rooms', 'departments']),
	},
	mounted() {
		this.getAllRooms()
		this.getAllDepartments()
	},
}
</script>

<style></style>
