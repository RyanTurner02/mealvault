export interface IUserValidationService {
    validateName(name: string): boolean;
    validateEmail(email: string): boolean;
    validatePassword(password: string): boolean;
}

export const createUserValidationService = (): IUserValidationService => {
    const validateName = (name: string): boolean => {
        const minLength: number = 1;
        const maxLength: number = 32;

        return name.length >= minLength &&
            name.length <= maxLength
    }

    const validateEmail = (email: string): boolean => {
        return true;
    }

    const validatePassword = (password: string): boolean => {
        const passwordRegex: RegExp = /^[a-zA-Z0-9!@#$%^&*]{8,71}$/;
        return passwordRegex.test(password);
    }

    return {
        validateName,
        validateEmail,
        validatePassword
    };
}