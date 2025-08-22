<template>
  <div class="recipe-page">
    <header class="recipe-page-header">
      <Button
        type="button"
        label="Вернуться"
        class="recipe-page-header__button"
        @click="RECIPE_MANAGER.toList"
      />
      <div
        v-if="!RECIPE_MANAGER.state.isNew"
        class="recipe-page-header-wrapper"
      >
        <Button
          v-if="RECIPE_MANAGER.state.mode === RecipePageMode.EDIT"
          type="button"
          severity="danger"
          label="Удалить"
          class="recipe-page-header__button"
          @click="RECIPE_MANAGER.delete"
        />
        <Button
          type="button"
          :severity="RECIPE_MANAGER.button.severity"
          :label="RECIPE_MANAGER.button.text"
          class="recipe-page-header__button"
          @click="RECIPE_MANAGER.changeMode"
        />
      </div>
    </header>
    <div v-if="RECIPE_MANAGER.state.recipe" class="recipe-page-wrapper">
      <InputText
        placeholder="Введите название рецепта..."
        :model-value="RECIPE_MANAGER.state.recipe.title"
        :disabled="RECIPE_MANAGER.state.mode != RecipePageMode.EDIT"
        class="recipe-page__item"
        @update:model-value="RECIPE_MANAGER.updateTitle"
      />
      <Selector
        :items="RECIPE_MANAGER.state.recipe.tags"
        :input-value="RECIPE_MANAGER.state.tagInput"
        title="Тэги"
        button-text="Добавить"
        empty-text="Тэги еще не были добавлены"
        input-placeholder="Название тэга..."
        :panel-visible="RECIPE_MANAGER.state.mode === RecipePageMode.EDIT"
        class="recipe-page__item"
        @update:input="RECIPE_MANAGER.updateTagInput($event)"
        @add-item="RECIPE_MANAGER.addTag"
        @remove-item="RECIPE_MANAGER.removeTag($event)"
      />
      <Selector
        :items="RECIPE_MANAGER.state.recipe.ingredients"
        :input-value="RECIPE_MANAGER.state.ingredientInput"
        title="Ингредиенты"
        button-text="Добавить"
        empty-text="Ингредиенты еще не были добавлены"
        input-placeholder="Название ингредиента..."
        :panel-visible="RECIPE_MANAGER.state.mode === RecipePageMode.EDIT"
        class="recipe-page__item"
        @update:input="RECIPE_MANAGER.updateIngredientInput($event)"
        @add-item="RECIPE_MANAGER.addIngredient"
        @remove-item="RECIPE_MANAGER.removeIngredient($event)"
      />
      <Textarea
        placeholder="Опишите рецепт..."
        :model-value="RECIPE_MANAGER.state.recipe.description"
        :disabled="RECIPE_MANAGER.state.mode != RecipePageMode.EDIT"
        class="recipe-page__item"
        style="height: 300px"
        size="large"
        @update:model-value="RECIPE_MANAGER.updateDescription"
      />
      <Button
        v-if="RECIPE_MANAGER.state.mode === RecipePageMode.EDIT"
        type="button"
        label="Сохранить"
        class="recipe-page__item"
        @click="RECIPE_MANAGER.save"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./recipe-page.ts" />
<style src="./css/recipe-page.css"></style>
