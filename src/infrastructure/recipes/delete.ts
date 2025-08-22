import query from '@/infrastructure/query';

export type InfraRecipesDeleteParams = {
  id: string;
};

export default function (payload: InfraRecipesDeleteParams): Promise<any> {
  return query<any>('/api/recipes/' + payload.id, 'DELETE');
}
