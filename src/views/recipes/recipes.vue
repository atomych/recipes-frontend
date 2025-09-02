<template>
  <div class="recipes">
    <div class="recipes-wrapper">
      <header class="recipes-header">
        <h2 class="recipes-header__title">Мои рецепты</h2>
        <Button
          type="button"
          label="Добавить"
          icon="pi pi-plus"
          class="recipes-header__button"
          @click="RECIPES_MANAGER.add"
        />
      </header>
      <div class="recipes-search">
        <InputText placeholder="Введите название или описание" :model-value="RECIPES_SEARCH.state.search"  @update:model-value="RECIPES_SEARCH.updateSearch($event)" class="recipes-search__input" />
      </div>
      <div v-if="RECIPES_MANAGER.state.loading" class="recipes-loader">
        <Loader />
      </div>
      <div v-else-if="RECIPES_MANAGER.state.list.length" class="recipes-list">
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
            <p class="recipes-list__item-description">
              {{ recipe.description }}
            </p>
          </template>
          <template #footer>
            <p class="recipes-list__item-lasttime">
              {{ recipe.lastUpdate }}
            </p>
          </template>
        </Card>
      </div>
      <div v-else class="recipes-empty">
        <Empty
          title="У вас нет рецептов"
          subtitle="Возможно, произошла ошибка или вы еще не создали ни одного рецепта"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./recipes.ts"></script>
<style src="./css/recipes.css"></style>
