import { login } from "@/app/features/login/api/login";
import { UserContextType } from "@/app/types/UserContextType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IUseLogin {
    userContext: UserContextType | null;
    router: AppRouterInstance;
};

export const useLogin = ({
    userContext,
    router,
}: IUseLogin) => {
    const handleLogin = async (email: string, password: string) => {
        const loginSuccess = await login(email, password);

        if (!loginSuccess) {
            return;
        }

        await userContext?.refreshUser();

        if (!userContext?.isLoading && userContext?.user) {
            router.push("/");
        }
    }

    return { handleLogin };
};
