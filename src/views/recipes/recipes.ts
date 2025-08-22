import { defineComponent, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { type RecipesManager } from '@/views/recipes/types';
import infrastructure from '@/infrastructure';
import { NEW_RECIPE_ID } from '@/views/recipe-page/types';
import Loader from '@/components/loader.vue';
import { useToast } from 'primevue/usetoast';
import recipes from '../../infrastructure/recipes';
import recipesAdapter from "@/views/recipes/adapters/recipes-adapter.ts";

export default defineComponent({
  name: 'Recipes',
  computed: {
    recipes() {
      return recipes;
    },
  },
  components: {
    Card,
    Button,
    Loader,
  },
  setup: () => {
    onBeforeMount(() => {
      RECIPES_MANAGER.load();
    });

    const router = useRouter();
    const toast = useToast();

    const RECIPES_MANAGER: RecipesManager = {
      state: reactive({
        list: [],
        loading: false,
      }),
      load: async () => {
        try {
          RECIPES_MANAGER.state.loading = true;
          RECIPES_MANAGER.state.list = recipesAdapter(await infrastructure.recipes.getList());
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка загрузки рецептов',
          });
        } finally {
          RECIPES_MANAGER.state.loading = false;
        }
      },
      view: (id) => {
        router.push({ name: 'recipePage', params: { id } });
      },
      add: () => {
        router.push({ name: 'recipePage', params: { id: NEW_RECIPE_ID } });
      },
    };

    return {
      RECIPES_MANAGER,
    };
  },
});
