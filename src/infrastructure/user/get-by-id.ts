import query from "@/infrastructure/query";

export type InfraUserGetByIdParams = {
    id: number;
}

export type InfraUserGetByIdResponse = Partial<{
    id: number;
    name: string;
}>;

export default function(payload: InfraUserGetByIdParams): Promise<InfraUserGetByIdResponse> {
    return query<InfraUserGetByIdResponse>(
        "/api/user",
        "GET",
        payload,
    )
}
