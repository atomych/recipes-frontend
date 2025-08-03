import { type InfraRecipesGetByIdResponse } from "@/infrastructure/recipes/get-by-id";

export const NEW_RECIPE_ID = "new_recipe";

export enum RecipePageMode {
    VIEW,
    EDIT,
}

export type EditButton = {
    text: string;
    severity: "danger" | "info";
}

export const editButton: Record<RecipePageMode, EditButton> = {
    [RecipePageMode.VIEW]: {
        text: "Редактировать",
        severity: "danger",
    },
    [RecipePageMode.EDIT]: {
        text: "К просмотру",
        severity: "info",
    },
}

export type RecipeManager = {
    state: {
        recipe: InfraRecipesGetByIdResponse | null;
        mode: RecipePageMode;
        isNew: boolean;
    };
    load: () => void;
    changeMode: () => void;
    updateTitle: (value: string) => void;
    updateDescription: (value: string) => void;
    save: () => void;
    toList: () => void;
    button: EditButton;
}
