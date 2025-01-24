import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import SellProperty from '../views/SellProperty.vue';
import PropertyDetails from '../views/PropertyDetails.vue';
import EditProperty from '../views/EditProperty.vue';
import Agents from '../views/Agents.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/sell-property', component: SellProperty },
  { path: '/property/:id', component: PropertyDetails, props: true},
  { path: '/properties/:id/edit', component: EditProperty},
  { path: '/agents', component: Agents }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;