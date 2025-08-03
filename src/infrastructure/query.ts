async function query<T>(path: string, method: "GET" | "PUT", params?: any, body?: any) {
    const url = new URL(window.VUE_APP_API_URL + path);
    if (Object.keys(params).length) {
        Object.keys(params).forEach((key) => {
            url.searchParams.set(key, params[key]);
        })
    }
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
    });
    return await response.json();
}

export default query;
