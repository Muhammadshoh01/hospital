<template>
	<aside class="aside">
		<router-link class="logo" to="/"
			><img src="@/assets/img/long.png" alt="dr"
		/></router-link>
		<div class="title">MEDICINE</div>

		<nav class="nav">
			<router-link v-for="(link, index) in links" :key="index" :to="link.link">
				<img :src="getImg(link.icon)" />
				{{ link.title }}
			</router-link>
			<button @click="exit">Chiqish</button>
		</nav>
	</aside>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{
					link: '/',
					title: 'Bosh sahifa',
					icon: 'home',
				},
				{
					link: '/department',
					title: "Bo'limlar",
					icon: 'department',
				},
				{
					link: '/spec',
					title: 'Mutaxassissliklar',
					icon: 'department',
				},
				{
					link: '/room',
					title: 'Xonalar',
					icon: 'palata',
				},
				{
					link: '/doctor',
					title: 'Shifokorlar',
					icon: 'doctors',
				},
				// {
				// 	link: '/',
				// 	title: 'Palatalar',
				// 	icon: 'palata',
				// },
				// {
				// 	link: '/',
				// 	title: 'Doctorlar',
				// 	icon: 'doctors',
				// },
				// {
				// 	link: '/',
				// 	title: 'Bemorlar',
				// 	icon: 'bemor side',
				// },
			],
		}
	},
	methods: {
		getImg(link) {
			return new URL(`/src/assets/img/${link}.svg`, import.meta.url)
		},
		exit() {
			if (confirm("Qaroringiz qat'iymi?")) {
				this.$store.dispatch('logout')
			}
		},
	},
}
</script>

<style lang="scss">
@import '@/styles/blocks/aside';
</style>
