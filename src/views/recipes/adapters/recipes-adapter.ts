import { type InfraRecipesGetListResponse } from '@/infrastructure/recipes/get-list.ts';
import formatedDate from '@/common/date.ts';

export type DogRecipe = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  lastUpdate: string;
};

export default function (response?: InfraRecipesGetListResponse) {
  return {
    total: response?.total || 0,
    recipes: recipesAdapter(response),
    filters: response?.filters || null,
  };
}

export function recipesAdapter(
  response?: InfraRecipesGetListResponse
): DogRecipe[] {
  return (response?.recipes || []).reduce((acc: DogRecipe[], recipe) => {
    const id = recipe.id || '';
    const title = recipe.title?.trim() || '';
    const description = recipe.description?.trim() || '';
    const tags = recipe.tags || [];
    const ingredients = recipe.ingredients || [];
    const lastUpdate = formatedDate(recipe.last_update || '');
    if (id) {
      acc.push({
        id,
        title,
        description,
        tags,
        ingredients,
        lastUpdate,
      });
    }
    return acc;
  }, []);
}
