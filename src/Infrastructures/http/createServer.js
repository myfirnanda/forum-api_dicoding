const Hapi = require('@hapi/hapi');
const config = require('../../Commons/config');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');

const createServer = async container => {
    const server = Hapi.server({
        host: config.app.host,
        port: config.app.port,
        debug: config.app.debug,
    });

    await server.register([
        {
            plugin: users,
            options: { container },
        },
        // {
        //     plugin: authentications,
        //     options: { container },
        // },
    ]);

    server.auth.strategy('forum_api_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
        if (response instanceof Error) {
            const translatedError = DomainErrorTranslator.translate(response);

            if (translatedError instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: translatedError.message,
                });
                newResponse.code(translatedError.statusCode);
                return newResponse;
            }

            if (!translatedError.isServer) {
                return h.continue;
            }

            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });
            newResponse.code(500);
            return newResponse;
        }

        return h.continue;
    });

    return server;
}

module.exports = createServer;