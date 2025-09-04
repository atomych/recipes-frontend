import { type DogRecipe } from '@/views/recipes/adapters/recipes-adapter.ts';
import { type InfraRecipesGetListQuery } from '@/infrastructure/recipes/get-list.ts';

export type RecipesManager = {
  state: {
    list: DogRecipe[];
    loading: boolean;
  };
  load: () => void;
  view: (id: string) => void;
  add: () => void;
};

export type RecipesFilters = {
  state: {
    search: string;
    tagsOptions: string[];
    ingredientsOptions: string[];
    tags: string[];
    ingredients: string[];
    tagsTemp: string[];
    ingredientsTemp: string[];
    timeout: number;
    isFiltersOpen: boolean;
  };
  updateSearch: (value: string) => void;
  debounceSearch: () => void;
  setTagsOptions: (value: string[]) => void;
  setIngredientsOptions: (value: string[]) => void;
  updateTags: () => void;
  updateIngredients: () => void;
  updateTagsTemp: (value: string[]) => void;
  updateIngredientsTemp: (value: string[]) => void;
  openFilters: () => void;
  clearFilters: () => void;
  closeFilters: () => void;
  applyFilters: () => void;
  saveFilters: () => void;
  updateFiltersValidation: () => void;
  query: InfraRecipesGetListQuery;
};
