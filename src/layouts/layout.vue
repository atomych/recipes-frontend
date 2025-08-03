<template>
  <div class="page-layout">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PageLayout",
})
</script>

<style>
.page-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
}
</style>
