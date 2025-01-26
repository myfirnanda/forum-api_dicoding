class TokenManager {
    async generateAccessToken(payload, accessTokenKey) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async generateRefreshToken(payload, refreshTokenKey) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async verifyRefreshToken(refreshToken, refreshTokenKey) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = TokenManager;