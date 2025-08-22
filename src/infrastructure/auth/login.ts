import query from '@/infrastructure/query';

export type InfraAuthLoginRequest = {
  login: string;
  password: string;
};

export type InfraAuthLoginResponse = {
  code: string;
};

export default function (
  payload: InfraAuthLoginRequest
): Promise<InfraAuthLoginResponse> {
  return query<InfraAuthLoginResponse>('/auth/login', 'POST', {
    body: payload,
  });
}
