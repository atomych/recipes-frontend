export type RecipesLogin = {
  state: {
    login: string;
    password: string;
    loading: boolean;
  };
  updateLogin: (value: string) => void;
  updatePassword: (value: string) => void;
  login: () => void;
  toRegister: () => void;
};
