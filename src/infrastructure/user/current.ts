import { ref } from "vue";

export type InfraUserCurrentUser = {
  email: string;
  name: string;
  avatar: string
};

export const currentUser = ref<InfraUserCurrentUser | null>(null);
