const baseUrl = "https://localhost:5001/api/Todo";
const baseHeaders = { "Content-Type": "application/json" };

export const getReq = async () => {
    const res = await fetch(baseUrl);
    return await res.json();
};

export const postReq = async (todo: object) => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(todo),
    });
    return await res.json();
};

export const putReq = async (id: number, todo: object) => {
    const res = await fetch(`${baseUrl}?id=${id}`, {
        method: "PUT",
        headers: baseHeaders,
        body: JSON.stringify(todo),
    });
    return await res.json();
};

export const deleteReq = async (id: number) => {
    const res = await fetch(`${baseUrl}?id=${id}`, {
        method: "DELETE",
        headers: baseHeaders,
    });
    return await res.json();
};
