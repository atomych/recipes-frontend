<template>
  <PageLayout>
    <router-view/>
  </PageLayout>
</template>

<script>
import {defineComponent} from 'vue';
import PageLayout from "@/layouts/layout.vue";

export default defineComponent({
  name: 'App',
  components: {
    PageLayout,
  },
})
</script>
