import { type InfraRecipesGetListRecipe } from "@/infrastructure/recipes/get-list";

export type RecipesManager = {
    state: {
        list: InfraRecipesGetListRecipe[];
    };
    load: () => void;
    view: (id: string) => void;
    add: () => void;
}
