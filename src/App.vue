<template>
	<div>
		<component :is="layout"></component>
		<notif />
	</div>
</template>

<script>
import authLayout from '@/layout/login.vue'
import defaultLayout from '@/layout/default.vue'
import notif from './components/notif.vue'
export default {
	components: {
		auth: authLayout,
		default: defaultLayout,
		notif,
	},
	computed: {
		layout() {
			return this.$store.getters.layout
		},
	},
	mounted() {
		this.$store.dispatch('checkUser')
	},
}
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>
