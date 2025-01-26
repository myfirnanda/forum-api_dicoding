class AddThreadRequest {
    constructor(payload) {
        this._verifyPayload(payload);

        const { title, body } = payload;

        this.title = title;
        this.body = body;
    }

    _verifyPayload({ title, body }) {
        if ( !title || !body ) {
            throw new Error('ADD_THREAD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof title !== "string" || typeof body !== "string") {
            throw new Error('ADD_THREAD_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = AddThreadRequest;