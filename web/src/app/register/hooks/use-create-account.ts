import { UserContextType } from "@/app/types/UserContextType";
import { createAccount } from "@/app/register/api/create-account";

interface IUseCreateAccount {
    userContext: UserContextType | null;
};

export const useCreateAccount = ({
    userContext,
}: IUseCreateAccount) => {
    const handleCreateAccount = async (name: string, email: string, password: string) => {
        const registerSuccess: boolean = await createAccount({ name, email, password });

        if (!registerSuccess) {
            return;
        }

        await userContext?.refreshUser();
    }

    return {
        handleCreateAccount
    };
}