import { createContext } from "react";
import { UserContextType } from "@/app/types/UserContextType";

export const UserContext = createContext<UserContextType | null>(null);