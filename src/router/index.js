import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/department',
			name: 'department',
			component: () => import('../views/department.vue'),
		},
		{
			path: '/spec',
			name: 'spec',
			component: () => import('../views/spec.vue'),
		},
		{
			path: '/room',
			name: 'room',
			component: () => import('../views/room.vue'),
		},
		{
			path: '/doctor',
			name: 'doctor',
			component: () => import('../views/doctor.vue'),
		},
		{
			path: '/position',
			name: 'position',
			component: () => import('../views/position.vue'),
		},
		{
			path: '/doctor/:id',
			name: 'doctor/id',
			component: () => import('../views/children/doctor.vue'),
		},
		{
			path: '/patsient',
			name: 'patsient',
			component: () => import('../views/patsient.vue'),
		},
		{
			path: '/patsient/:id',
			name: 'patsient/id',
			component: () => import('../views/children/patsient.vue'),
		},
		{
			path: '/treatment',
			name: 'treatment',
			component: () => import('../views/treatment.vue'),
		},
	],
})

export default router
