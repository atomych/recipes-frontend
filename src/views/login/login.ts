import { defineComponent, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { type RecipesLogin } from '@/views/login/types.ts';
import infrastructure from '@/infrastructure';
import { LocalStorageKeys } from '@/infrastructure/localstorage/consts.ts';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  name: 'Login',
  components: {
    InputText,
    Button,
  },
  setup: () => {
    const router = useRouter();
    const toast = useToast();

    const RECIPES_LOGIN: RecipesLogin = {
      state: reactive({
        loading: false,
        login: '',
        password: '',
      }),
      updateLogin: (value) => {
        RECIPES_LOGIN.state.login = value;
      },
      updatePassword: (value) => {
        RECIPES_LOGIN.state.password = value;
      },
      login: async () => {
        const validLogin = RECIPES_LOGIN.state.login.trim() || '';
        if (!validLogin) return;
        try {
          RECIPES_LOGIN.state.loading = true;
          const response = await infrastructure.auth.login({
            login: RECIPES_LOGIN.state.login.trim(),
            password: RECIPES_LOGIN.state.password,
          });
          const code = response?.code;
          if (!code) return;
          const tokens = await infrastructure.auth.getByCode({
            code,
          });
          infrastructure.localstorage.setItem(
            LocalStorageKeys.ACCESS_TOKEN,
            tokens.access
          );
          infrastructure.localstorage.setItem(
            LocalStorageKeys.REFRESH_TOKEN,
            tokens.refresh
          );
          await router.push({ name: 'home' });
        } catch (error) {
          toast.add({
            severity: 'error',
            life: 3000,
            summary: (error as any).error || 'Ошибка авторизации',
          });
        } finally {
          RECIPES_LOGIN.state.loading = false;
          RECIPES_LOGIN.state.password = '';
        }
      },
      toRegister: async () => {
        await router.push({ name: 'register' });
      },
    };

    return {
      RECIPES_LOGIN,
    };
  },
});
