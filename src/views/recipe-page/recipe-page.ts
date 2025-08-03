import {defineComponent, onBeforeMount, reactive} from "vue";
import {editButton, NEW_RECIPE_ID, type RecipeManager, RecipePageMode} from "@/views/recipe-page/types";
import {useRoute, useRouter} from "vue-router";
import infrastructure from "@/infrastructure";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

export default defineComponent({
    name: "RecipePage",
    components: {
        InputText,
        Textarea,
        Button,
    },
    setup: () => {
        onBeforeMount(() => {
            if (!localStorage.getItem("VUE_APP_USER_ID") || !localStorage.getItem("VUE_APP_USER_NAME")) {
                router.push({ name: "home" });
                return;
            }
            if (route.params.id === NEW_RECIPE_ID) {
                RECIPE_MANAGER.state.isNew = true;
                RECIPE_MANAGER.state.recipe = {
                    title: "",
                    description: "",
                    ingredients: [],
                }
                RECIPE_MANAGER.state.mode = RecipePageMode.EDIT;
                return;
            }
            RECIPE_MANAGER.load();
        });

        const router = useRouter();
        const route = useRoute();

        const RECIPE_MANAGER: RecipeManager = {
            state: reactive({
                recipe: null,
                mode: RecipePageMode.VIEW,
                isNew: false,
            }),
            load: async () => {
                try {
                    const userId = localStorage.getItem("VUE_APP_USER_ID");
                    const recipeId = route.params.id;
                    if (!recipeId) return;
                    const recipe = await infrastructure.recipes.getById({ userId, recipeId });
                    if (!recipe) return;
                    RECIPE_MANAGER.state.recipe = recipe;
                } catch (error) {
                    console.error(error);
                }
            },
            changeMode: () => {
              RECIPE_MANAGER.state.mode = RECIPE_MANAGER.state.mode === RecipePageMode.VIEW ? RecipePageMode.EDIT : RecipePageMode.VIEW;
            },
            updateTitle: (value) => {
              RECIPE_MANAGER.state.recipe.title = value;
            },
            updateDescription: (value) => {
                RECIPE_MANAGER.state.recipe.description = value;
            },
            toList: () => {
                router.push({ name: "recipes" })
            },
            save: async () => {
                try {
                    const response = await infrastructure.recipes.update({
                        params: {
                            ...(!RECIPE_MANAGER.state.isNew && { id: RECIPE_MANAGER.state.recipe.id }),
                        },
                        body: {
                            user_id: localStorage.getItem("VUE_APP_USER_ID"),
                            title: RECIPE_MANAGER.state.recipe.title,
                            description: RECIPE_MANAGER.state.recipe.description,
                        }
                    });
                    if (!response.count) return;
                } catch (error) {
                    console.error(error)
                } finally {
                    if (RECIPE_MANAGER.state.isNew) {
                        router.push({ name: "recipes" });
                    }
                    RECIPE_MANAGER.state.mode = RecipePageMode.VIEW;
                    RECIPE_MANAGER.load();
                }
            },
            get button() {
                return editButton[RECIPE_MANAGER.state.mode];
            }
        };

        return {
            RECIPE_MANAGER,
            RecipePageMode,
        };
    },
});
