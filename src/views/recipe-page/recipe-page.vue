<template>
  <div class="recipe-page">
    <header class="recipe-page-header">
      <Button type="button" label="Вернуться" class="recipe-page-header__button" @click="RECIPE_MANAGER.toList" />
      <Button v-if="!RECIPE_MANAGER.state.isNew" type="button" :severity="RECIPE_MANAGER.button.severity" :label="RECIPE_MANAGER.button.text" class="recipe-page-header__button" @click="RECIPE_MANAGER.changeMode" />
    </header>
    <div v-if="RECIPE_MANAGER.state.recipe" class="recipe-page-wrapper">
      <InputText placeholder="Введите название рецепта..." :model-value="RECIPE_MANAGER.state.recipe.title" :disabled="RECIPE_MANAGER.state.mode != RecipePageMode.EDIT" class="recipe-page__item" @update:model-value="RECIPE_MANAGER.updateTitle" />
      <Textarea placeholder="Опишите рецепт..." :model-value="RECIPE_MANAGER.state.recipe.description" :disabled="RECIPE_MANAGER.state.mode != RecipePageMode.EDIT" class="recipe-page__item" style="height: 300px" size="large" @update:model-value="RECIPE_MANAGER.updateDescription" />
      <Button v-if="RECIPE_MANAGER.state.mode === RecipePageMode.EDIT" type="button" label="Сохранить" class="recipe-page__item" @click="RECIPE_MANAGER.save" />
    </div>
  </div>
</template>

<script lang="ts" src="./recipe-page.ts"/>
<style src="./css/recipe-page.css"></style>
