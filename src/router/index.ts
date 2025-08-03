import { createWebHistory, createRouter } from 'vue-router'

import Home from "@/views/home/home.vue";
import Recipes from "@/views/recipes/recipes.vue";
import RecipePage from "@/views/recipe-page/recipe-page.vue";

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/recipes', component: Recipes, name: 'recipes' },
    { path: '/recipes/:id', component: RecipePage, name: 'recipePage' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
