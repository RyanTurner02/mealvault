import { createContext } from "react";
import { User } from "@/app/types/user";

export const UserContext = createContext<User | undefined>(undefined);