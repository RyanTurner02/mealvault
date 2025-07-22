import { createTokenService, ITokenService } from "@service/tokenService";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

describe("TokenService", () => {
    let tokenService: ITokenService;

    beforeAll(() => {
        tokenService = createTokenService();
    });

    describe("generateAccessToken", () => {
        it("should return a valid JWT containing the user id", () => {
            const id: number = 0;
            
            const accessToken: string = tokenService.generateAccessToken(id);
            const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
            
            expect(decoded).toHaveProperty("id", id);
        });
    });

    describe("generateRefreshToken", () => {
        
    });
});