<template>
  <div class="dogrecipes-empty">
    <i class="dogrecipes-empty__icon pi pi-box"></i>
    <h3 class="dogrecipes-empty__title">{{ title }}</h3>
    <p class="dogrecipes-empty__subtitle">{{ subtitle }}</p>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Empty',
    props: {
      title: {
        required: true,
        type: String,
      },
      subtitle: {
        required: true,
        type: String,
      },
    },
  });
</script>

<style>
  .dogrecipes-empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 300px;
  }

  .dogrecipes-empty__icon {
    margin: 0 auto;
    margin-bottom: 15px;
    font-size: 80px !important;
    color: var(--p-button-primary-background) !important;
  }

  .dogrecipes-empty__title {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }

  .dogrecipes-empty__subtitle {
    width: 100%;
    text-align: center;
  }
</style>
