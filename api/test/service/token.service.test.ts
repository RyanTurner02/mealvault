import { createTokenService, ITokenService } from "@service/tokenService";

describe("TokenService", () => {
    let tokenService: ITokenService;

    beforeAll(() => {
        tokenService = createTokenService();
    });

    describe("generateAccessToken", () => {

    });

    describe("generateRefreshToken", () => {
        
    });
});