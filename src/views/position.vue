<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Lavozimlar</div>
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
					<tr v-for="(position, index) in positions" :key="position._id">
						<td>{{ index + 1 }}</td>
						<td>{{ position.title }}</td>
						<td>{{ position.createdTime }}</td>
						<td align="right">
							<button @click="edit(position._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click="remove(position._id)">
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
					{{
						editToggle
							? 'Mutaxassisslini tahrirlash'
							: "Yangi mutaxassisslik qo'shish"
					}}
				</h4>
				<form id="depart" @submit.prevent="editToggle ? save() : add()">
					<div class="col-12 col-sm-12 mb-20">
						<input
							class="input"
							type="text"
							name="title"
							v-model="position.title"
							placeholder="Mutaxassisslik nomini kiriting"
							@keypress.enter="editToggle ? save() : add()"
						/>
					</div>
				</form>
				<div class="modal__footer">
					<button class="btn danger" @click="toggle = false">
						Bekor qilish
					</button>
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
			position: {},
		}
	},
	methods: {
		...mapActions([
			'addPosition',
			'getAllPositions',
			'deletePosition',
			'getPosition',
			'updatePosition',
		]),
		add() {
			if (this.position.title) {
				this.addPosition(this.position)
				this.clear()
			} else {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Mutaxassisslik nomini kiriting',
				})
			}
		},
		clear() {
			this.toggle = false
			this.position = {}
			this.editToggle = false
		},
		async edit(id) {
			let res = await this.getPosition(id)
			if (res?.status == 200) {
				this.toggle = true
				this.editToggle = true
				this.position = { ...res.data }
			}
		},
		save() {
			this.updatePosition(this.position)
			this.clear()
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteposition(id)
			}
		},
	},
	computed: {
		...mapGetters(['positions']),
	},
	mounted() {
		this.getAllPositions()
	},
}
</script>

<style></style>
