import { User } from "../types/user";
import { FetchUser } from "./FetchAuth";

export const loadUser = async() => {
    const user = await FetchUser();
    console.log(user);

    if (!user || !user.ok) {
        console.log("Invalid user");
        return null;
    }

    const data: User = await user.json();
    return data;
}