<template>
	<div class="head">
		<div class="stats">
			<div class="stat">
				<img src="../assets/img/hodimlar.svg" />
				<div>
					<h1>Hodimlar</h1>
					<p>{{ statistics.countDoctors }}</p>
				</div>
			</div>
			<div class="stat">
				<img src="../assets/img/bemor.svg" />
				<div>
					<h1>Bemorlar</h1>
					<p>{{ statistics.countPatsient }}</p>
				</div>
			</div>
			<div class="stat">
				<img src="../assets/img/room.svg" />
				<div>
					<h1>Xonalar</h1>
					<p>{{ statistics.countRoom }}</p>
				</div>
			</div>
			<div class="stat">
				<img src="../assets/img/cash.svg" />
				<div>
					<h1>Byudjet</h1>
					<p>{{ statistics.summa?.toLocaleString() }} so'm</p>
				</div>
			</div>
		</div>
		<div class="box mb-60">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Bemorlar</div>
			</div>
			<table class="table home">
				<thead>
					<tr>
						<th>Ism-sharif</th>
						<th>Raqami</th>
						<th>Sana</th>
						<th>Shifokor</th>
						<th>Sabab</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(patsient, index) in statistics.patsients"
						:key="patsient._id"
					>
						<td class="first">
							<img :src="`http://95.130.227.52:3112/${patsient.avatar}`" />
							{{ patsient.name }}
						</td>
						<td>{{ patsient.phone }}</td>
						<td>{{ patsient.arriveDate }}</td>
						<td>{{ patsient.doctor }}</td>
						<td>{{ patsient.diagnos }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="box">
			<div class="d-flex justify-content-between align-items-center">
				<div class="title">Shifokorlar</div>
			</div>
			<table class="table home">
				<thead>
					<tr>
						<th>Ism-sharif</th>
						<th>Raqami</th>
						<th>Bo'lim</th>
						<th>Mutaxassisslik</th>
						<th>Ish grafigi</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(doctor, index) in statistics.doctors" :key="doctor._id">
						<td class="first">
							<img :src="`http://95.130.227.52:3112/${doctor.file[0]}`" />
							{{ doctor.name }}
						</td>
						<td>{{ doctor.phone }}</td>
						<td>{{ doctor.department }}</td>
						<td>{{ doctor.spec }}</td>
						<td>{{ doctor.worktime }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { convertDate } from '../helpers/incFunc'
export default {
	data() {
		return {
			statistics: {},
			workTimeList: [
				{
					id: 1,
					name: 'Yarim stavka',
				},
				{
					id: 2,
					name: 'Asosiy shtat',
				},
				{
					id: 3,
					name: 'O`rindosh',
				},
			],
		}
	},

	methods: {
		...mapActions(['getAllStats']),
	},
	async mounted() {
		let res = await this.getAllStats()
		if (res.status == 200) {
			this.statistics = { ...res.data }
			this.statistics.patsients.map((patsient) => {
				patsient.arriveDate = convertDate(patsient.arriveDate)
				return patsient
			})
			this.statistics.doctors.map((doctor) => {
				doctor.worktime = this.workTimeList[doctor.worktime - 1].name
				return doctor
			})
		}
	},
}
</script>

<style scoped lang="scss">
// table {
// 	td {
// 		&:last-child {
// 			text-align: left !important;
// 		}
// 	}
// }
.head {
	.stats {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40px;
		.stat {
			display: flex;
			align-items: center;
			gap: 25px;
			background-color: #fff;
			padding: 20px;
			border-radius: 8px;
			max-width: 240px;
			width: 100%;
			// height: 88px;
			div {
				h1 {
					color: #25282b;
					font-size: 14px;
					font-weight: 700;
					line-height: 20px;
					letter-spacing: 0.1px;
				}
				p {
					color: #336cfb;
					font-size: 18px;
					line-height: 24px;
					letter-spacing: 0.1px;
				}
			}
		}
	}
}
</style>
