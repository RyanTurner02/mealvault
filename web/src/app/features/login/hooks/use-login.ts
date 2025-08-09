import { UserContextType } from "@/app/types/user-context-type";

interface IUseLogin {
    userContext: UserContextType | null;
    login(email: string, password: string): Promise<boolean>; 
};

export const useLogin = ({
    userContext,
    login,
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
