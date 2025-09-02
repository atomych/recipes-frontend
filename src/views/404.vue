<template>
  <div class="page-404">
    <Empty title="Страница не найдена" subtitle="Проверьте URL вашего запроса или попробуйте зайти позже" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Empty from "@/components/empty.vue";

export default defineComponent({
  name: "NotFound",
  components: {
    Empty,
  },
})
</script>

<style>
.page-404 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 200px;
}
</style>
