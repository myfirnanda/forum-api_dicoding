class RegisterUserResponse {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, username, fullname } = payload;
        
        this.id = id;
        this.username = username;
        this.fullname = fullname;
    }

    _verifyPayload({ id, username, fullname }) {
        if (!id || !username || !fullname) {
            throw new Error('REGISTER_USER_RESPONSE.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
            throw new Error('REGISTER_USER_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = RegisterUserResponse;