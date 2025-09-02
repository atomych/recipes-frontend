<template>
  <div class="page-layout">
    <header v-if="isVisible" class="page-layout__header">
      <PageHeader />
    </header>
    <div class="page-layout__container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import PageHeader from '@/layouts/components/header.vue';
  import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

  export default defineComponent({
    name: 'PageLayout',
    components: {
      PageHeader,
    },
    setup: () => {
      const router = useRouter();
      const isVisible = ref<boolean>(false);

      function changeVisible(route: RouteLocationNormalizedLoadedGeneric) {
        isVisible.value = !['login', 'register'].includes(String(route.name));
      }

      watch(router.currentRoute, changeVisible, { immediate: true });

      return {
        isVisible,
      };
    },
  });
</script>

<style>
  .page-layout {
    width: 100%;
    position: relative;
  }

  .page-layout__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .page-layout__container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 75px;
    height: 100vh;
  }
</style>
