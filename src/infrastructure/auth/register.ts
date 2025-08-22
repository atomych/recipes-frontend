import query from '@/infrastructure/query';

export type InfraAuthRegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type InfraAuthRegisterResponse = {
  id: string;
};

export default function (
  payload: InfraAuthRegisterRequest
): Promise<InfraAuthRegisterResponse> {
  return query<InfraAuthRegisterResponse>('/auth/register', 'POST', {
    body: payload,
  });
}
