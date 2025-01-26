const AddThreadRequest = require("../AddThreadRequest");

describe('an AddThreadRequest entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            title: 'abc',
        };

        expect(() => new AddThreadRequest(payload)).toThrow('ADD_THREAD_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload meet data type specification', () => {
        const payload = {
            title: 1234,
            body: true,
        };

        expect(() => new AddThreadRequest(payload)).toThrow('ADD_THREAD_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION');
    })

    it('should create addThreadRequest object correctly', () => {
        const payload = {
            title: 'Dicoding Forum',
            body: 'lorem ipsum dolor it amet',
        };

        const { title, body } = new AddThreadRequest(payload);

        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
    });
})