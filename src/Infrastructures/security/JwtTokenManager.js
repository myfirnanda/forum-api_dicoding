const TokenManager = require("../../Applications/security/TokenManager");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class JwtTokenManager extends TokenManager {
    constructor(Jwt) {
        super();
        this._Jwt = Jwt;
    }

    async generateAccessToken(payload, accessTokenKey) {
        return this._Jwt.token.generate(payload, accessTokenKey);
    }

    async generateRefreshToken(payload, refreshTokenKey) {
        return this._Jwt.token.generate(payload, refreshTokenKey);
    }

    async verifyRefreshToken(refreshToken, refreshTokenKey) {
        try {
            const artifacts = this._Jwt.token.decode(refreshToken);
            this._Jwt.token.verifySignature(artifacts, refreshTokenKey);
            const { payload } = artifacts.decoded;
            return payload;
        } catch (error) {
            throw new InvariantError('Refresh token tidak valid. ', error.message);
        }
    }
}

module.exports = JwtTokenManager