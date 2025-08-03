import query from "@/infrastructure/query";

export type InfraRecipesGetByIdParams = {
    userId: number;
    recipeId: number;
}

export type InfraRecipesGetByIdResponse = Partial<{
    id: number;
    title: string;
    description: string;
    ingredients: string[];
}>;

export default function(payload: InfraRecipesGetByIdParams): Promise<InfraRecipesGetByIdResponse> {
    return query<InfraRecipesGetByIdResponse>(
        "/api/recipes",
        "GET",
        payload,
    )
}
