<template>
  <div class="home">
    <div class="home-container">
      <InputText :model-value="HOME_MANAGER.state.id" placeholder="Введите id" class="home-container__item" @update:model-value="HOME_MANAGER.changeId"/>
      <Button class="home-container__item" @click="HOME_MANAGER.load">Найти</Button>
    </div>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style src="./css/home.css"></style>
