import { createWebHistory, createRouter } from 'vue-router';
import Recipes from '@/views/recipes/recipes.vue';
import RecipePage from '@/views/recipe-page/recipe-page.vue';
import Login from '@/views/login/login.vue';
import Register from '@/views/register/register.vue';

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/', component: Recipes, name: 'recipes' },
  { path: '/:id', component: RecipePage, name: 'recipePage' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
