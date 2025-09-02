import { createWebHistory, createRouter } from 'vue-router';
import Recipes from '@/views/recipes/recipes.vue';
import RecipePage from '@/views/recipe-page/recipe-page.vue';
import Login from '@/views/login/login.vue';
import Register from '@/views/register/register.vue';
import Account from '@/views/account/account.vue';
import NotFound from '@/views/404.vue';

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  {
    path: '/',
    component: Account,
    name: 'home',
    children: [
      { path: '/recipes', component: Recipes, name: 'recipes' },
      { path: '/recipes/:id', component: RecipePage, name: 'recipePage' },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound, name: '404' },
];

const router = createRouter({
  history: createWebHistory(),
  // @ts-ignore
  routes,
});

export default router;
