import { type DogRecipe } from '@/views/recipes/adapters/recipes-adapter.ts';

export type RecipesManager = {
  state: {
    list: DogRecipe[];
    loading: boolean;
  };
  load: () => void;
  view: (id: string) => void;
  add: () => void;
};
