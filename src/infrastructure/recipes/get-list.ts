import query from "@/infrastructure/query";

export type InfraRecipesGetListParams = {
    userId: number;
}

export type InfraRecipesGetListRecipe = Partial<{
    id: number;
    title: string;
    description: string;
    ingredients: string[];
}>;

export default function(payload: InfraRecipesGetListParams): Promise<InfraRecipesGetListRecipe[]> {
    return query<InfraRecipesGetListRecipe[]>(
        "/api/recipes",
        "GET",
        payload,
    )
}
