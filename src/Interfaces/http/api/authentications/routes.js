const routes = handler => ([
    {
        method: 'POST',
        path: '/authentications',
        handler: handler.addRefreshTokenHandler,
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: handler.verifyRefreshTokenHandler,
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: handler.deleteRefreshTokenHandler,
    },
]);