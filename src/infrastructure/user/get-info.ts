import query from '@/infrastructure/query';

export type InfraUserGetInfoResponse = Partial<{
  name: string;
  email: string;
}>;

export default function (): Promise<InfraUserGetInfoResponse> {
  return query<InfraUserGetInfoResponse>('/api/user/info', 'GET');
}
