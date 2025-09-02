import { type DogRecipe } from '@/views/recipes/adapters/recipes-adapter.ts';
import { type InfraRecipesGetListQuery } from "@/infrastructure/recipes/get-list.ts";

export type RecipesManager = {
  state: {
    list: DogRecipe[];
    loading: boolean;
  };
  load: () => void;
  view: (id: string) => void;
  add: () => void;
};

export type RecipesSearch = {
  state: {
    search: string;
    timeout: number;
  };
  updateSearch: (value: string) => void;
  debounceSearch: () => void;
  query: InfraRecipesGetListQuery;
}
