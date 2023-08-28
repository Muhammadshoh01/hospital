<template>
	<!-- <h1>default layout</h1> -->
	<div>
		<div class="main">
			<Aside />
			<div class="wrapper">
				<Header />
				<div class="content">
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Aside from '@/components/aside.vue'
import Header from '@/components/header.vue'
export default {
	emits: ['successLogin'],
	components: {
		Aside,
		Header,
	},
}
</script>

<style></style>
