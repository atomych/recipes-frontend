import query from '@/infrastructure/query';

export type InfraRecipesGetListRequest = Partial<{
  total: number;
  recipes: InfraRecipesGetListRecipe[];
}>;

export type InfraRecipesGetListRecipe = Partial<{
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  tags: string[];
  last_update: string;
}>;

export default function (): Promise<InfraRecipesGetListRequest> {
  return query<InfraRecipesGetListRequest>('/api/recipes/list', 'GET');
}
