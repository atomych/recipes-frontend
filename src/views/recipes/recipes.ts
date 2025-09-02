import { defineComponent, reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { type RecipesManager, type RecipesSearch } from '@/views/recipes/types';
import infrastructure from '@/infrastructure';
import { NEW_RECIPE_ID } from '@/views/recipe-page/types';
import Empty from '@/components/empty.vue';
import Loader from '@/components/loader.vue';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import recipesAdapter from '@/views/recipes/adapters/recipes-adapter.ts';

export default defineComponent({
  name: 'Recipes',
  components: {
    Card,
    Button,
    Empty,
    Loader,
    InputText,
  },
  setup: () => {
    onBeforeMount(() => {
      RECIPES_MANAGER.load();
    });

    const router = useRouter();
    const toast = useToast();

    const RECIPES_SEARCH: RecipesSearch = {
      state: reactive({
        search: "",
        timeout: 0,
      }),
      updateSearch: (value) => {
        RECIPES_SEARCH.state.search = value;
        RECIPES_SEARCH.debounceSearch();
      },
      debounceSearch: () => {
        if (RECIPES_SEARCH.state.timeout) clearTimeout(RECIPES_SEARCH.state.timeout);
        RECIPES_SEARCH.state.timeout = setTimeout(() => {
          RECIPES_MANAGER.load();
        }, 700);
      },
      get query() {
        return {
        ...(this.state.search.trim().length && { search: this.state.search.trim() }),
        }
      }
    }

    const RECIPES_MANAGER: RecipesManager = {
      state: reactive({
        list: [],
        loading: true,
      }),
      load: async () => {
        try {
          RECIPES_MANAGER.state.loading = true;
          RECIPES_MANAGER.state.list = recipesAdapter(
            await infrastructure.recipes.getList({
              query: RECIPES_SEARCH.query,
            })
          );
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
      RECIPES_SEARCH,
    };
  },
});
