import query from '@/infrastructure/query';

export type InfraAuthGetByCodeRequest = {
  code: string;
};

export type InfraAuthGetByCodeResponse = {
  access: string;
  refresh: string;
} | null;

export default function (
  payload: InfraAuthGetByCodeRequest
): Promise<InfraAuthGetByCodeResponse> {
  return query<InfraAuthGetByCodeResponse>('/auth/code', 'POST', {
    body: payload,
  });
}
