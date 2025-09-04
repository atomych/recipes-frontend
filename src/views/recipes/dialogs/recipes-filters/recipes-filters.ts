import { defineComponent, type PropType } from 'vue';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import { type RecipesFilters } from '@/views/recipes/types.ts';

export default defineComponent({
  name: 'RecipesFilters',
  components: {
    Dialog,
    MultiSelect,
    Button,
  },
  props: {
    manager: {
      type: Object as PropType<RecipesFilters>,
      required: true,
    },
  },
});
