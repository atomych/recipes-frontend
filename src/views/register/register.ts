import { defineComponent, reactive } from 'vue';
import { type RecipesRegister } from '@/views/register/types.ts';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import infrastructure from '@/infrastructure';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'Register',
  components: {
    InputText,
    Button,
  },
  setup: () => {
    const router = useRouter();
    const toast = useToast();

    const RECIPES_REGISTER: RecipesRegister = {
      state: reactive({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        loading: false,
        get isValid() {
          return (
            !!this.name.length &&
            !!this.email.length &&
            this.password.length > 5 &&
            this.password === this.repeatPassword
          );
        },
      }),
      updateName: (value) => {
        RECIPES_REGISTER.state.name = value;
      },
      updateEmail: (value) => {
        RECIPES_REGISTER.state.email = value;
      },
      updatePassword: (value) => {
        RECIPES_REGISTER.state.password = value;
      },
      updateRepeatPassword: (value) => {
        RECIPES_REGISTER.state.repeatPassword = value;
      },
      register: async () => {
        try {
          RECIPES_REGISTER.state.loading = true;
          const response = await infrastructure.auth.register({
            email: RECIPES_REGISTER.state.email.trim(),
            name: RECIPES_REGISTER.state.name.trim(),
            password: RECIPES_REGISTER.state.password,
          });
          if (!response?.id) return;
          toast.add({
            severity: 'success',
            life: 3000,
            summary: 'Вы успешно зарегистрировались',
          });
          await RECIPES_REGISTER.toLogin();
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка регистрации',
          });
        } finally {
          RECIPES_REGISTER.state.loading = false;
          RECIPES_REGISTER.state.email = '';
          RECIPES_REGISTER.state.name = '';
          RECIPES_REGISTER.state.password = '';
          RECIPES_REGISTER.state.repeatPassword = '';
        }
      },
      toLogin: async () => {
        await router.push({ name: 'login' });
      },
    };

    return {
      RECIPES_REGISTER,
    };
  },
});
