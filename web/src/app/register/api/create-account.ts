interface ICreateAccount {
    name: string;
    email: string;
    password: string;
};

export const createAccount = async ({
    name,
    email,
    password,
}: ICreateAccount): Promise<boolean> => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/create`;
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
}