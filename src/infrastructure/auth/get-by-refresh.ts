import query from '@/infrastructure/query';

export type InfraAuthGetByRefreshRequest = {
  refresh: string;
};

export type InfraAuthGetByRefreshResponse = {
  access: string;
} | null;

export default function (
  payload: InfraAuthGetByRefreshRequest
): Promise<InfraAuthGetByRefreshResponse> {
  return query<InfraAuthGetByRefreshResponse>('/auth/refresh', 'POST', {
    body: payload,
  });
}
