export interface IAuthService {
    logout(): boolean;
}

export const createAuthService = (): IAuthService => {
    const logout = (): boolean => {
        return true;
    }

    return {
        logout,
    };
}