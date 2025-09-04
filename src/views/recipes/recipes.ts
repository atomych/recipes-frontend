import { defineComponent, onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import {
  type RecipesFilters,
  type RecipesManager,
} from '@/views/recipes/types';
import infrastructure from '@/infrastructure';
import { NEW_RECIPE_ID } from '@/views/recipe-page/types';
import Empty from '@/components/empty.vue';
import Loader from '@/components/loader.vue';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import recipesAdapter from '@/views/recipes/adapters/recipes-adapter.ts';
import RecipesFiltersDialog from '@/views/recipes/dialogs/recipes-filters/recipes-filters.vue';
import { LocalStorageKeys } from '@/infrastructure/localstorage/consts.ts';

export default defineComponent({
  name: 'Recipes',
  components: {
    Card,
    Button,
    Empty,
    Loader,
    InputText,
    RecipesFiltersDialog,
  },
  setup: () => {
    onBeforeMount(() => {
      const filterTags = infrastructure.localstorage.getItem(
        LocalStorageKeys.RECIPES_FILTER_TAGS
      );
      if (filterTags) {
        RECIPES_FILTERS.state.tags = filterTags.split('_');
      }
      const filterIngredients = infrastructure.localstorage.getItem(
        LocalStorageKeys.RECIPES_FILTER_INGREDIENTS
      );
      if (filterIngredients) {
        RECIPES_FILTERS.state.ingredients = filterIngredients.split('_');
      }
      console.log(RECIPES_FILTERS.state.tags);
      RECIPES_MANAGER.load();
    });

    const router = useRouter();
    const toast = useToast();

    const RECIPES_FILTERS: RecipesFilters = {
      state: reactive({
        search: '',
        tags: [],
        tagsOptions: [],
        tagsTemp: [],
        ingredients: [],
        ingredientsOptions: [],
        ingredientsTemp: [],
        timeout: 0,
        isFiltersOpen: false,
      }),
      updateSearch: (value) => {
        RECIPES_FILTERS.state.search = value;
        RECIPES_FILTERS.debounceSearch();
      },
      debounceSearch: () => {
        if (RECIPES_FILTERS.state.timeout)
          clearTimeout(RECIPES_FILTERS.state.timeout);
        RECIPES_FILTERS.state.timeout = setTimeout(() => {
          RECIPES_MANAGER.load();
        }, 700);
      },
      setTagsOptions: (value) => {
        RECIPES_FILTERS.state.tagsOptions = value;
      },
      updateTags: () => {
        RECIPES_FILTERS.state.tags = RECIPES_FILTERS.state.tagsTemp;
      },
      updateTagsTemp: (value) => {
        RECIPES_FILTERS.state.tagsTemp = value;
      },
      setIngredientsOptions: (value) => {
        RECIPES_FILTERS.state.ingredientsOptions = value;
      },
      updateIngredients: () => {
        RECIPES_FILTERS.state.ingredients =
          RECIPES_FILTERS.state.ingredientsTemp;
      },
      updateIngredientsTemp: (value) => {
        RECIPES_FILTERS.state.ingredientsTemp = value;
      },
      openFilters: () => {
        RECIPES_FILTERS.state.tagsTemp = RECIPES_FILTERS.state.tags;
        RECIPES_FILTERS.state.ingredientsTemp =
          RECIPES_FILTERS.state.ingredients;
        RECIPES_FILTERS.state.isFiltersOpen = true;
      },
      clearFilters: () => {
        RECIPES_FILTERS.state.tags = [];
        RECIPES_FILTERS.state.ingredients = [];
        RECIPES_FILTERS.saveFilters();
        RECIPES_MANAGER.load();
        RECIPES_FILTERS.closeFilters();
      },
      closeFilters: () => {
        RECIPES_FILTERS.state.tagsTemp = [];
        RECIPES_FILTERS.state.ingredientsTemp = [];
        RECIPES_FILTERS.state.isFiltersOpen = false;
      },
      applyFilters: () => {
        RECIPES_FILTERS.updateTags();
        RECIPES_FILTERS.updateIngredients();
        RECIPES_FILTERS.saveFilters();
        RECIPES_MANAGER.load();
        RECIPES_FILTERS.closeFilters();
      },
      saveFilters: () => {
        infrastructure.localstorage.setItem(
          LocalStorageKeys.RECIPES_FILTER_TAGS,
          RECIPES_FILTERS.query.tags || ''
        );
        infrastructure.localstorage.setItem(
          LocalStorageKeys.RECIPES_FILTER_INGREDIENTS,
          RECIPES_FILTERS.query.ingredients || ''
        );
      },
      updateFiltersValidation: () => {
        const validTags = RECIPES_FILTERS.state.tags.filter((i) =>
          RECIPES_FILTERS.state.tagsOptions.includes(i)
        );
        const validIngredients = RECIPES_FILTERS.state.ingredients.filter((i) =>
          RECIPES_FILTERS.state.ingredientsOptions.includes(i)
        );
        if (
          validTags.length !== RECIPES_FILTERS.state.tags.length ||
          validIngredients.length !== RECIPES_FILTERS.state.ingredients.length
        ) {
          RECIPES_FILTERS.state.tags = validTags;
          RECIPES_FILTERS.state.ingredients = validIngredients;
          RECIPES_MANAGER.load();
        }
      },
      get query() {
        return {
          ...(this.state.search.trim().length && {
            search: this.state.search.trim(),
          }),
          ...(this.state.tags.length && { tags: this.state.tags.join('_') }),
          ...(this.state.ingredients.length && {
            ingredients: this.state.ingredients.join('_'),
          }),
        };
      },
    };

    const RECIPES_MANAGER: RecipesManager = {
      state: reactive({
        list: [],
        loading: true,
      }),
      load: async () => {
        try {
          RECIPES_MANAGER.state.loading = true;
          const { recipes, filters } = recipesAdapter(
            await infrastructure.recipes.getList({
              query: RECIPES_FILTERS.query,
            })
          );
          RECIPES_MANAGER.state.list = recipes;
          if (!filters) return;
          RECIPES_FILTERS.setTagsOptions(filters.tags);
          RECIPES_FILTERS.setIngredientsOptions(filters.ingredients);
          RECIPES_FILTERS.updateFiltersValidation();
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
      RECIPES_FILTERS,
    };
  },
});
