<template>
	<div :class="`notif ${notif.type || ''} ${notif.type ? 'active' : ''} `">
		{{ notif.text }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters(['notif']),
	},
}
</script>

<style>
.notif {
	position: fixed;
	top: 20px;
	right: -400px;
	padding: 20px;
	width: 300px;
	background-color: white;
	transition: all 0.3s linear;
	font-size: 18px;
	border-radius: 1px solid #f7f7f7;
}
.notif.active {
	right: 20px;
}
.notif.danger {
	border-left: 4px solid #e02b2b;
}
.notif.success {
	border-left: 4px solid #35ec1d;
}
.notif.warning {
	border-left: 4px solid #c27c2b;
}
</style>
