import { login } from "@/app/features/login/api/login";
import { UserContextType } from "@/app/types/UserContextType";

interface IUseLogin {
    userContext: UserContextType | null;
};

export const useLogin = ({
    userContext,
}: IUseLogin) => {
    const handleLogin = async (email: string, password: string) => {
        const loginSuccess = await login(email, password);

        if (!loginSuccess) {
            return;
        }

        await userContext?.refreshUser();
    }

    return { handleLogin };
};
