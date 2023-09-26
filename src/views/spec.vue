<template>
	<section>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Mutaxassissliklar</div>
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
					<tr v-for="(spec, index) in specs" :key="spec._id">
						<td>{{ index + 1 }}</td>
						<td>{{ spec.title }}</td>
						<td>{{ spec.createdTime }}</td>
						<td align="right">
							<button @click.stop="edit(spec._id)">
								<img src="../assets/img/edit.svg" />
							</button>
							<button @click.stop="remove(spec._id)">
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
							v-model="spec.title"
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
			spec: {},
		}
	},
	methods: {
		...mapActions([
			'addSpec',
			'getAllSpecs',
			'deleteSpec',
			'getSpec',
			'updateSpec',
		]),
		add() {
			if (this.spec.title) {
				this.addSpec(this.spec)
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
			this.spec = {}
			this.editToggle = false
		},
		async edit(id) {
			let res = await this.getSpec(id)
			if (res?.status == 200) {
				this.toggle = true
				this.editToggle = true
				this.spec = { ...res.data }
			}
		},
		save() {
			this.updateSpec(this.spec)
			this.clear()
		},
		remove(id) {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.deleteSpec(id)
			}
		},
	},
	computed: {
		...mapGetters(['specs']),
	},
	mounted() {
		this.getAllSpecs()
	},
}
</script>

<style></style>
