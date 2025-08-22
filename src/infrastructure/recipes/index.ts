import getList from '@/infrastructure/recipes/get-list';
import getById from '@/infrastructure/recipes/get-by-id';
import update from '@/infrastructure/recipes/update';
import deleteRecipe from '@/infrastructure/recipes/delete.ts';

export default {
  getList,
  getById,
  update,
  delete: deleteRecipe,
};
