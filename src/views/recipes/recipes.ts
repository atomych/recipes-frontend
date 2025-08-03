import { defineComponent, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import Card from 'primevue/card';
import Button from 'primevue/button';
import { type RecipesManager } from "@/views/recipes/types";
import infrastructure from "@/infrastructure";
import { NEW_RECIPE_ID } from "@/views/recipe-page/types";

export default defineComponent({
    name: "Recipes",
    components: {
        Card,
        Button,
    },
    setup: () => {
        onBeforeMount(() => {
            if (!localStorage.getItem("VUE_APP_USER_ID") || !localStorage.getItem("VUE_APP_USER_NAME")) {
                router.push({ name: "home" });
                return;
            }
            RECIPES_MANAGER.load();
        });

        const router = useRouter();

        const RECIPES_MANAGER: RecipesManager = {
            state: reactive({
                list: [],
            }),
            load: async () => {
                try {
                    const userId = localStorage.getItem("VUE_APP_USER_ID");
                    const recipes = await infrastructure.recipes.getList({ userId });
                    if (!recipes.length) return;
                    RECIPES_MANAGER.state.list = recipes;
                } catch (error) {
                    console.error(error);
                }
            },
            view: (id) => {
                router.push({ name: "recipePage", params: { id } });
            },
            add: () => {
                router.push({ name: "recipePage", params: { id: NEW_RECIPE_ID } });
            }
        };

        return {
            RECIPES_MANAGER,
        };
    },
});
