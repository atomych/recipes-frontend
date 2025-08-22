import { createWebHistory, createRouter } from 'vue-router';
import Recipes from '@/views/recipes/recipes.vue';
import RecipePage from '@/views/recipe-page/recipe-page.vue';
import Login from '@/views/login/login.vue';

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/', component: Recipes, name: 'recipes' },
  { path: '/:id', component: RecipePage, name: 'recipePage' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
