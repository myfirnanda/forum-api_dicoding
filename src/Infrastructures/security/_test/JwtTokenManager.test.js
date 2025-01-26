const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('JwtTokenManager', () => {
    describe('generateAccessToken method', () => {
        it('should generate access token correctly', async () => {
            const spyGenerate = jest.spyOn(Jwt.token, 'generate').mockReturnValue('mock_access_token');

            const jwtTokenManager = new JwtTokenManager(Jwt);
            const payload = { id: 'user-123' };
            const accessTokenKey = 'access_key';

            const accessToken = await jwtTokenManager.generateAccessToken(payload, accessTokenKey);

            expect(spyGenerate).toHaveBeenCalledWith(payload, accessTokenKey);
            expect(accessToken).toBe('mock_access_token');

            spyGenerate.mockRestore();
        });
    });

    describe('generateRefreshToken method', () => {
        it('should generate refresh token correctly', async () => {
            const spyGenerate = jest.spyOn(Jwt.token, 'generate').mockReturnValue('mock_refresh_token');

            const jwtTokenManager = new JwtTokenManager(Jwt);
            const payload = { id: 'user-123' };
            const refreshTokenKey = 'refresh_key';

            const refreshToken = await jwtTokenManager.generateRefreshToken(payload, refreshTokenKey);

            expect(spyGenerate).toHaveBeenCalledWith(payload, refreshTokenKey);
            expect(refreshToken).toBe('mock_refresh_token');

            spyGenerate.mockRestore();
        });
    });

    describe('verifyRefreshToken method', () => {
        it('should verify refresh token correctly', async () => {
            const refreshToken = 'valid_refresh_token';
            const refreshTokenKey = 'refresh_key';
            const mockPayload = { id: 'user-123' };

            jest.spyOn(Jwt.token, 'decode').mockReturnValue({
                decoded: { payload: mockPayload },
            });
            jest.spyOn(Jwt.token, 'verifySignature').mockImplementation(() => {});

            const jwtTokenManager = new JwtTokenManager(Jwt);

            const result = await jwtTokenManager.verifyRefreshToken(refreshToken, refreshTokenKey);

            expect(Jwt.token.decode).toHaveBeenCalledWith(refreshToken);
            expect(Jwt.token.verifySignature).toHaveBeenCalled();
            expect(result).toEqual(mockPayload);

            Jwt.token.decode.mockRestore();
            Jwt.token.verifySignature.mockRestore();
        });

        it('should throw InvariantError when refresh token is invalid', async () => {
            const refreshToken = 'invalid_refresh_token';
            const refreshTokenKey = 'refresh_key';

            jest.spyOn(Jwt.token, 'decode').mockReturnValue({});
            jest.spyOn(Jwt.token, 'verifySignature').mockImplementation(() => {
                throw new Error('Invalid token');
            });

            const jwtTokenManager = new JwtTokenManager(Jwt);

            await expect(jwtTokenManager.verifyRefreshToken(refreshToken, refreshTokenKey))
                .rejects
                .toThrow(InvariantError);

            Jwt.token.decode.mockRestore();
            Jwt.token.verifySignature.mockRestore();
        });
    });
});
