import query from '@/infrastructure/query';

export type InfraRecipesGetByIdParams = {
  id: string;
};

export type InfraRecipesGetByIdResponse = Partial<{
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  tags: string[];
  last_update: string;
}>;

export default function (
  payload: InfraRecipesGetByIdParams
): Promise<InfraRecipesGetByIdResponse> {
  return query<InfraRecipesGetByIdResponse>(
    '/api/recipes/' + payload.id,
    'GET'
  );
}
