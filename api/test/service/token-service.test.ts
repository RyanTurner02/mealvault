import { createTokenService, ITokenService } from "@service/token-service";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { JwtPayload } from "jsonwebtoken";

describe("TokenService", () => {
    let tokenService: ITokenService;

    beforeAll(() => {
        tokenService = createTokenService();
    });

    describe("generateAccessToken", () => {
        it("should return a valid JWT containing the user id", () => {
            const id: number = 0;
            const accessToken: string = tokenService.generateAccessToken(id);
            const decodedToken: string | JwtPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
            
            expect(decodedToken).toHaveProperty("id", id);
        });
    });

    describe("generateRefreshToken", () => {
        it("should return a valid JWT containing the user id", () => {
            const id: number = 0;
            const refreshToken: string = tokenService.generateRefreshToken(id);
            const decodedToken: string | JwtPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

            expect(decodedToken).toHaveProperty("id", id);
        });
    });
});