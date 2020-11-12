import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Transaction from '../views/Transaction.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Transaction',
    component: Transaction
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
