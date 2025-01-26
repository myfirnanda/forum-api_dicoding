class AddAuthenticationRequest {
    constructor(payload) {
        this._verifyPayload(payload);

        this.username = payload.username;
        this.password = payload.password;
    }

    _verifyPayload(payload) {
        const { username, password } = payload;

        if (!username || !password) {
            throw new Error('ADD_AUTHENTICATION_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof username !== 'string' || typeof password !== 'string') {
            throw new Error('ADD_AUTHENTICATION_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddAuthenticationRequest;