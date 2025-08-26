export type InfraUserCurrentUser = {
  id: string;
  email: string;
  name: string;
};

export let currentUser: InfraUserCurrentUser | null = null;
