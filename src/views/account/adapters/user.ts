import type { InfraUserGetInfoResponse } from "@/infrastructure/user/get-info.ts";
import type { InfraUserCurrentUser } from "@/infrastructure/user/current.ts";

export default function (response: InfraUserGetInfoResponse): InfraUserCurrentUser {
    return {
        name: response.name || "",
        email: response.email || "",
        avatar: (response.name || [""])[0].toUpperCase(),
    }
}
