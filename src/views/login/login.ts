import { defineComponent, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { type RecipesLogin } from '@/views/login/types.ts';
import infrastructure from '@/infrastructure';
import { LocalStorageKeys } from '@/infrastructure/localstorage/consts.ts';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  components: {
    InputText,
    Button,
  },
  setup: () => {
    const router = useRouter();

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
          await router.push({ name: 'recipes' });
        } catch (error) {
          console.log(error);
        } finally {
          RECIPES_LOGIN.state.loading = false;
          RECIPES_LOGIN.state.password = '';
        }
      },
    };

    return {
      RECIPES_LOGIN,
    };
  },
});
