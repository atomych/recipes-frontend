<template>
  <Dialog
    modal
    :visible="manager.state.isFiltersOpen"
    position="center"
    append-to="#app"
    :draggable="false"
    @update:visible="!$event && manager.closeFilters()"
    class="recipes-filters-dialog"
    style="width: 650px; min-height: 400px"
  >
    <template #header>
      <header class="recipes-filters-dialog-header">
        <h2 class="recipes-filters-dialog-header__title">Фильтры</h2>
      </header>
    </template>
    <template #default>
      <div class="recipes-filters-dialog-body">
        <div class="recipes-filters-dialog-body-input-wrapper">
          <p class="recipes-filters-dialog-body-input-label">Тэги</p>
          <MultiSelect
            :options="manager.state.tagsOptions"
            :model-value="manager.state.tagsTemp"
            :show-toggle-all="false"
            empty-message="Пустой список тэгов"
            placeholder="Тэги"
            class="recipes-filters-dialog-body-input"
            @update:model-value="manager.updateTagsTemp($event)"
          />
        </div>
        <div class="recipes-filters-dialog-body-input-wrapper">
          <p class="recipes-filters-dialog-body-input-label">Ингредиенты</p>
          <MultiSelect
            :options="manager.state.ingredientsOptions"
            :model-value="manager.state.ingredientsTemp"
            :show-toggle-all="false"
            empty-message="Пустой список ингредиентов"
            placeholder="Ингредиенты"
            class="recipes-filters-dialog-body-input"
            @update:model-value="manager.updateIngredientsTemp($event)"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <footer class="recipes-filters-dialog-footer">
        <Button
          type="button"
          label="Очистить"
          severity="danger"
          class="recipes-filters-dialog-footer__button"
          @click="manager.clearFilters"
        />
        <Button
          type="button"
          label="Сохранить"
          class="recipes-filters-dialog-footer__button"
          @click="manager.applyFilters"
        />
      </footer>
    </template>
  </Dialog>
</template>

<script src="./recipes-filters.ts"></script>
<style src="./css/recipes-filters.css"></style>
