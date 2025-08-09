import { UserContextType } from "@/app/types/user-context-type";

interface IUseCreateAccount {
    userContext: UserContextType | null;
    createAccount(name: string, email: string, password: string): Promise<boolean>;
};

export const useCreateAccount = ({
    userContext,
    createAccount,
}: IUseCreateAccount) => {
    const handleCreateAccount = async (name: string, email: string, password: string) => {
        const registerSuccess: boolean = await createAccount(name, email, password);

        if (!registerSuccess) {
            return;
        }

        await userContext?.refreshUser();
    }

    return {
        handleCreateAccount
    };
}