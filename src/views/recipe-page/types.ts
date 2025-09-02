import { type InfraRecipesGetByIdResponse } from '@/infrastructure/recipes/get-by-id';

export const NEW_RECIPE_ID = 'new';

export enum RecipePageMode {
  VIEW,
  EDIT,
}

export type EditButton = {
  text: string;
  severity: 'danger' | 'info';
};

export const editButton: Record<RecipePageMode, EditButton> = {
  [RecipePageMode.VIEW]: {
    text: 'Редактировать',
    severity: 'danger',
  },
  [RecipePageMode.EDIT]: {
    text: 'К просмотру',
    severity: 'info',
  },
};

export type RecipeManager = {
  state: {
    loading: boolean;
    recipe: InfraRecipesGetByIdResponse | null;
    mode: RecipePageMode;
    isNew: boolean;
    tagInput: string;
    ingredientInput: string;
  };
  load: () => void;
  changeMode: () => void;
  updateTitle: (value: string) => void;
  updateDescription: (value: string) => void;
  updateTagInput: (value: string) => void;
  updateIngredientInput: (value: string) => void;
  addTag: () => void;
  removeTag: (value: string) => void;
  addIngredient: () => void;
  removeIngredient: (value: string) => void;
  save: () => void;
  delete: () => void;
  toList: () => void;
  button: EditButton;
};
