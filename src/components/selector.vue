<template>
  <div class="dr-selector">
    <h3 class="dr-selector__title">{{ title }}</h3>
    <div v-if="panelVisible" class="dr-selector__panel">
      <InputText
        :placeholder="inputPlaceholder"
        :model-value="inputValue"
        class="dr-selector__panel-input"
        @update:model-value="$emit('update:input', $event)"
      />
      <Button
        type="button"
        :label="buttonText"
        class="dr-selector__panel-button"
        @click="$emit('add-item')"
      />
    </div>
    <div v-if="items.length" class="dr-selector__list">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="dr-selector__list-item"
      >
        <p class="dr-selector__list-item-text">{{ item }}</p>
        <i
          v-if="panelVisible"
          class="pi pi-times dr-selector__list-item-close"
          @click="$emit('remove-item', item)"
        ></i>
      </div>
    </div>
    <div v-else class="dr-selector__empty">
      <p class="dr-selector__empty-text">{{ emptyText }}</p>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';

  export default defineComponent({
    name: 'Selector',
    components: {
      InputText,
      Button,
    },
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      panelVisible: {
        type: Boolean,
        required: false,
        default: true,
      },
      inputPlaceholder: {
        type: String,
        required: false,
        default: '',
      },
      inputValue: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: false,
        default: '',
      },
      items: {
        type: Array,
        required: true,
      },
      emptyText: {
        type: String,
        required: false,
        default: '',
      },
    },
    emits: ['update:input', 'add-item', 'remove-item'],
  });
</script>

<style>
  .dr-selector__title {
    margin-bottom: 12px;
  }

  .dr-selector__panel {
    margin-bottom: 12px;
  }

  .dr-selector__panel-input {
    margin-right: 20px;
  }

  .dr-selector__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  .dr-selector__list-item {
    padding: 5px 8px;
    border: 2px solid var(--p-button-info-color);
    border-radius: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .dr-selector__list-item-close {
    cursor: pointer;
    margin-left: 8px;
  }
</style>
