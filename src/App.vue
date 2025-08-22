<template>
  <PageLayout>
    <router-view />
    <Toast :position="'bottom-center'" />
  </PageLayout>
</template>

<script>
  import { defineComponent } from 'vue';
  import PageLayout from '@/layouts/layout.vue';
  import Toast from 'primevue/toast';

  export default defineComponent({
    name: 'App',
    components: {
      PageLayout,
      Toast,
    },
  });
</script>
