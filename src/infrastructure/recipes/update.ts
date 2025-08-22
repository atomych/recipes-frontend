import query from '@/infrastructure/query';

export type InfraRecipesUpdatePayload = {
  params: InfraRecipesUpdateParams;
  body: InfraRecipesUpdateBody;
};

export type InfraRecipesUpdateParams = {
  id: string;
};

export type InfraRecipesUpdateBody = Partial<{
  title: string;
  description: string;
  ingredients: string[];
  tags: string[];
}>;

export type InfraRecipesUpdateResponse = {
  id: string;
};

export default function (
  payload: InfraRecipesUpdatePayload
): Promise<InfraRecipesUpdateResponse> {
  return query<InfraRecipesUpdateResponse>(
    '/api/recipes/' + payload.params.id,
    'PUT',
    {
      body: payload.body,
    }
  );
}
