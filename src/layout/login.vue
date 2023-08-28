<template>
	<div>
		<div class="auth">
			<div class="box" v-if="toggle">
				<div class="title mb-20">Tizimga kirish</div>
				<form name="login" @submit.prevent="postLogin">
					<input
						class="input"
						type="text"
						v-model="login"
						placeholder="Login"
					/>
					<div class="mb-20"></div>
					<input
						class="input mb-20"
						type="password"
						v-model="password"
						placeholder="Maxfiy kalit"
					/>
					<a
						href="#"
						class="link mb-20 text-center"
						@click.prevent="toggle = false"
						>Ro'yxatdan o'tish</a
					>
					<button class="btn success text-center">Kirish</button>
				</form>
			</div>
			<div class="box" v-else>
				<div class="title mb-20">Ro'yxatdan o'tish</div>
				<form @submit.prevent="postReg">
					<input
						class="input mb-20"
						type="text"
						v-model="login"
						placeholder="Login"
					/>
					<input
						class="input mb-20"
						type="password"
						v-model="password"
						placeholder="Maxfiy kalit"
					/>
					<input
						class="input mb-20"
						type="password"
						v-model="checkPassword"
						placeholder="Maxfiy kalitni qayta kiriting"
					/>
					<a
						href="#"
						class="link mb-20 text-center"
						@click.prevent="toggle = true"
						>Tizimga kirish</a
					>
					<button class="btn success text-center">Registratsiya</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			login: '',
			password: '',
			checkPassword: '',
			toggle: true,
		}
	},
	methods: {
		async postLogin() {
			if (!this.login || !this.password) {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Barcha maydonlarni to`ldiring',
				})
			}
			let res = await this.$store.dispatch('login', {
				login: this.login,
				password: this.password,
			})
			if (res?.status == 200) {
				console.log(res.data)
			}
		},
		async postReg() {
			if (!this.login || !this.password) {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: 'Barcha maydonlarni to`ldiring',
				})
				return false
			}
			if (this.password !== this.checkPassword) {
				this.$store.commit('setNotif', {
					type: 'warning',
					text: "Parollar bir xil bo'lishi kerak",
				})
				return false
			}
			let res = await this.$store
				.dispatch('register', {
					login: this.login,
					password: this.password,
				})
				.catch((e) => {
					console.log(e)
				})
			if (res?.status == 201) {
				if (res.data == 'success') {
					this.$store.commit('setNotif', {
						type: 'success',
						text: 'Ro`yxatdan muvaffaqiyatli o`tdingiz',
					})
					this.toggle = true
				}
			}
			if (res?.status == 200) {
				if (res.data == 'exist') {
					this.$store.commit('setNotif', {
						type: 'warning',
						text: 'Bunday foydalanuvchi mavjud',
					})
				}
			}
		},
	},
}
</script>

<style lang="scss">
@import '@/styles/pages/auth.scss';
</style>
