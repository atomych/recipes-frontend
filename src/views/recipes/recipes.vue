<template>
  <div class="recipes">
    <div v-if="RECIPES_MANAGER.state.loading" class="recipes-loading">
      <Loader></Loader>
    </div>
    <header v-if="!RECIPES_MANAGER.state.loading" class="recipes-header">
      <h2 class="recipes-header__title">Мои рецепты</h2>
      <Button
        type="button"
        label="Добавить"
        icon="pi pi-plus"
        class="recipes-header__button"
        @click="RECIPES_MANAGER.add"
      />
    </header>
    <div v-if="!RECIPES_MANAGER.state.loading" class="recipes-list">
      <Card
        v-for="recipe in RECIPES_MANAGER.state.list"
        :key="recipe.id"
        class="recipes-list__item"
        @click="RECIPES_MANAGER.view(recipe.id)"
      >
        <template #title>
          <p class="recipes-list__item-title">{{ recipe.title }}</p>
        </template>
        <template #content>
          <p class="recipes-list__item-description">{{ recipe.description }}</p>
        </template>
        <template #footer>
          <p class="recipes-list__item-lasttime">{{ "Последнее изменение: " + recipe.lastUpdate }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" src="./recipes.ts"></script>
<style src="./css/recipes.css"></style>
