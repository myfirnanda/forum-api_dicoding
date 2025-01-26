class AuthenticationRepository {
    async addRefreshToken(registeredUser) {
        throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteRefreshToken(username) {
        throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async verifyRefreshToken() {
        throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
};

module.exports = AuthenticationRepository;