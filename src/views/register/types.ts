export type RecipesRegister = {
  state: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    loading: boolean;
    isValid: boolean;
  };
  updateName: (value: string) => void;
  updateEmail: (value: string) => void;
  updatePassword: (value: string) => void;
  updateRepeatPassword: (value: string) => void;
  register: () => void;
  toLogin: () => void;
};
