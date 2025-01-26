class AddThreadResponse {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, title, body } = payload;

        this.id = id;
        this.title = title;
        this.body = body;
    }

    _verifyPayload({ id, title, body }) {
        if ( !id || !title || !body ) {
            throw new Error('ADD_THREAD_RESPONSE.NOT_CONTAIN NEEDED_PROPERTY');
        }

        if (typeof id !== "id" || typeof title !== "string" || typeof body !== "string") {
            throw new Error('ADD_THREAD_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddThreadResponse;