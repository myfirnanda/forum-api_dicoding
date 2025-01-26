const TokenManager = require("../TokenManager");

describe('TokenManager interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        const tokenManager = new TokenManager();

        await expect(tokenManager.generateAccessToken({ id: 'user-123' }, 'access_key')).rejects.toThrow('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
        await expect(tokenManager.generateRefreshToken({ id: 'user-123' }, 'refresh_key')).rejects.toThrow('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
        await expect(tokenManager.verifyRefreshToken('invalid_refresh_token', 'refresh-key')).rejects.toThrow('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    })
});