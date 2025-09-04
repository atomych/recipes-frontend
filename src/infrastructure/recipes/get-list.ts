import query from '@/infrastructure/query';

export type InfraRecipesGetListQuery = {
  search?: string;
  tags?: string;
  ingredients?: string;
};

export type InfraRecipesGetListRequest = {
  query?: InfraRecipesGetListQuery;
};

export type InfraRecipesGetListResponse = Partial<{
  total: number;
  recipes: InfraRecipesGetListRecipe[];
  filters: InfraRecipesGetListFilters;
}>;

export type InfraRecipesGetListFilters = {
  tags: string[];
  ingredients: string[];
};

export type InfraRecipesGetListRecipe = Partial<{
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  tags: string[];
  last_update: string;
}>;

export default function (
  payload?: InfraRecipesGetListRequest
): Promise<InfraRecipesGetListResponse> {
  return query<InfraRecipesGetListResponse>('/api/recipes/list', 'GET', {
    query: payload?.query,
  });
}
