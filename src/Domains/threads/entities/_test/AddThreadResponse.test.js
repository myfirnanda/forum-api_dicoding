const AddThreadResponse = require("../AddThreadResponse");

describe('an AddThreadResponse entities', () => {
    it('should throw error when payload did not meet contain needed property', () => {
        const payload = {
            title: 'fhe',
        };

        expect(() => new AddThreadResponse(payload)).toThrow('ADD_THREAD_RESPONSE.NOT_CONTAIN NEEDED_PROPERTY');
    });

    it('should throw error when payload meet data type specification', () => {
        const payload = {
            id: 1234,
            title: 'u034',
            body: true,
        };

        expect(() => new AddThreadResponse(payload)).toThrow('ADD_THREAD_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addThreadResponse object correctly', () => {
        const payload = {
            id: 'gr07th6rwjwqf8f',
            title: 'thread-title-example',
            body: 'thread-body-example',
        };

        const { id, title, body } = payload;

        expect(id).toEqual(payload.id);
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
    })
});
