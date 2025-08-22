import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import {
  editButton,
  NEW_RECIPE_ID,
  type RecipeManager,
  RecipePageMode,
} from '@/views/recipe-page/types';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import infrastructure from '@/infrastructure';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Selector from '@/components/selector.vue';

export default defineComponent({
  name: 'RecipePage',
  components: {
    InputText,
    Textarea,
    Button,
    Selector,
  },
  setup: () => {
    onBeforeMount(() => {
      if (route.params.id === NEW_RECIPE_ID) {
        RECIPE_MANAGER.state.isNew = true;
        RECIPE_MANAGER.state.recipe = {
          id: NEW_RECIPE_ID,
          title: '',
          description: '',
          ingredients: [],
          tags: [],
        };
        RECIPE_MANAGER.state.mode = RecipePageMode.EDIT;
        return;
      }
      RECIPE_MANAGER.load();
    });

    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const RECIPE_MANAGER: RecipeManager = {
      state: reactive({
        recipe: null,
        mode: RecipePageMode.VIEW,
        isNew: false,
        tagInput: '',
        ingredientInput: '',
      }),
      load: async () => {
        try {
          const recipeId = route.params.id as string;
          if (!recipeId) return;
          const recipe = await infrastructure.recipes.getById({ id: recipeId });
          if (!recipe) return;
          RECIPE_MANAGER.state.recipe = recipe;
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка загрузки рецепта',
          });
        }
      },
      changeMode: () => {
        RECIPE_MANAGER.state.mode =
          RECIPE_MANAGER.state.mode === RecipePageMode.VIEW
            ? RecipePageMode.EDIT
            : RecipePageMode.VIEW;
      },
      updateTitle: (value) => {
        RECIPE_MANAGER.state.recipe.title = value;
      },
      updateDescription: (value) => {
        RECIPE_MANAGER.state.recipe.description = value;
      },
      updateTagInput: (value) => {
        RECIPE_MANAGER.state.tagInput = value;
      },
      updateIngredientInput: (value) => {
        RECIPE_MANAGER.state.ingredientInput = value;
      },
      addTag: () => {
        if (!RECIPE_MANAGER.state.tagInput) return;
        RECIPE_MANAGER.state.recipe.tags.push(RECIPE_MANAGER.state.tagInput);
        RECIPE_MANAGER.state.tagInput = '';
      },
      removeTag: (value) => {
        RECIPE_MANAGER.state.recipe.tags =
          RECIPE_MANAGER.state.recipe.tags.filter((i) => i !== value);
      },
      addIngredient: () => {
        if (!RECIPE_MANAGER.state.ingredientInput) return;
        RECIPE_MANAGER.state.recipe.ingredients.push(
          RECIPE_MANAGER.state.ingredientInput
        );
        RECIPE_MANAGER.state.ingredientInput = '';
      },
      removeIngredient: (value) => {
        RECIPE_MANAGER.state.recipe.ingredients =
          RECIPE_MANAGER.state.recipe.ingredients.filter((i) => i !== value);
      },
      toList: () => {
        router.push({ name: 'recipes' });
      },
      save: async () => {
        try {
          const response = await infrastructure.recipes.update({
            params: {
              id: RECIPE_MANAGER.state.recipe.id,
            },
            body: {
              title: RECIPE_MANAGER.state.recipe.title,
              description: RECIPE_MANAGER.state.recipe.description,
              ingredients: RECIPE_MANAGER.state.recipe.ingredients,
              tags: RECIPE_MANAGER.state.recipe.tags,
            },
          });
          if (!response.id) return;
          toast.add({
            severity: 'success',
            life: 3000,
            summary: 'Рецепт успешно обновлен',
          });
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка обновления рецепта',
          });
        } finally {
          if (RECIPE_MANAGER.state.isNew) {
            await router.push({ name: 'recipes' });
          } else {
            RECIPE_MANAGER.state.mode = RecipePageMode.VIEW;
            RECIPE_MANAGER.load();
          }
        }
      },
      delete: async () => {
        try {
          await infrastructure.recipes.delete({
            id: route.params.id as string,
          });
          await router.push({ name: 'recipes' });
          toast.add({
            severity: 'success',
            life: 3000,
            summary: 'Рецепт успешно удален',
          });
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка удаления рецепта',
          });
        }
      },
      get button() {
        return editButton[RECIPE_MANAGER.state.mode];
      },
    };

    return {
      RECIPE_MANAGER,
      RecipePageMode,
    };
  },
});
