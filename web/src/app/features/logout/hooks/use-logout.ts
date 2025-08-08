import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "@/app/hooks/user-hook";
import { logout } from "@/app/features/logout/api/logout";

export const useLogout = () => {
    const router = useRouter();
    const userContext = useUserContext();

    useEffect(() => {
        const handleLogout = async () => {
            await logout();
            await userContext?.refreshUser();
            router.push("/");
        }
        handleLogout();
    }, []);
}