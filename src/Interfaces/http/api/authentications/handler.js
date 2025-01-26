const DeleteAuthenticationUseCase = require('../../../../Applications/use_cases/authentications/DeleteAuthenticationUseCase');
const AddAuthenticationUseCase = require('../../../../Applications/use_cases/authentications/AddAuthenticationUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_cases/authentications/RefreshAuthenticationUseCase');

class AuthenticationsHandler {
    constructor(container) {
        this._container = container;

        this.addRefreshTokenHandler = this.addRefreshTokenHandler.bind(this);
        this.verifyRefreshTokenHandler = this.verifyRefreshTokenHandler.bind(this);
        this.deleteRefreshTokenHandler = this.deleteRefreshTokenHandler.bind(this);
    }

    async addRefreshTokenHandler(request, h) {
        const addAuthenticationUseCase = this._container.getInstance(AddAuthenticationUseCase.name);

        const { accessToken, refreshToken } = await addAuthenticationUseCase.execute(request.payload);

        const response = h.response({
            status: 'success',
            data: {
                accessToken,
                refreshToken,
            },
        });
        response.code(201);
        return response;
    }

    async verifyRefreshTokenHandler(request) {
        const refreshAuthenticationUseCase = this._container.getInstance(RefreshAuthenticationUseCase.name);
        const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

        return {
            status: 'success',
            data: {
                accessToken,
            },
        };
    }

    async deleteRefreshTokenHandler(request) {
        const deleteAuthenticationUseCase = this._container.getInstance(DeleteAuthenticationUseCase.name);
        await deleteAuthenticationUseCase.execute(request.payload);
        return {
            status: 'success',
        };
    }
}

module.exports = AuthenticationsHandler;