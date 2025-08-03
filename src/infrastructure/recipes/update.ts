import query from "@/infrastructure/query";

export type InfraRecipesUpdatePayload = {
    params: InfraRecipesUpdateParams;
    body: InfraRecipesUpdateBody;
}

export type InfraRecipesUpdateParams = {
    id: number;
}

export type InfraRecipesUpdateBody = Partial<{
    title: string;
    description: string;
}>;

export type InfraRecipesUpdateResponse = {
    count: number;
}

export default function(payload: InfraRecipesUpdatePayload): Promise<InfraRecipesUpdateResponse> {
    return query<InfraRecipesUpdateResponse>(
        "/api/recipes",
        "PUT",
        payload.params,
        payload.body,
    )
}
