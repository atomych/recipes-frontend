import { defineComponent, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import infrastructure from '@/infrastructure';
import { useToast } from 'primevue/usetoast';
import userAdapter from '@/views/account/adapters/user.ts';

export default defineComponent({
  name: 'Account',
  setup: () => {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    onBeforeMount(async () => {
      try {
        infrastructure.user.currentUser.value = userAdapter(
          await infrastructure.user.getInfo()
        );
        if (route.name === 'home') await router.push({ name: 'recipes' });
      } catch (error) {
        toast.add({
          severity: 'error',
          life: 3000,
          summary: (error as any).error || 'Ошибка авторизации',
        });
        await router.push({ name: 'login' });
      }
    });
  },
});
