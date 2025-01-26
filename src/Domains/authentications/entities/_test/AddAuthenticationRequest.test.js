const AddAuthenticationRequest = require("../AddAuthenticationRequest");

describe('AddAuthenticationRequest entities', () => {
    it('should throw error when payload does not contain needed property', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
        };

        // Action & Assert
        expect(() => new AddAuthenticationRequest(payload)).toThrowError('ADD_AUTHENTICATION_REQUEST.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
            password: 12345,
        };

        // Action & Assert
        expect(() => new AddAuthenticationRequest(payload)).toThrowError('ADD_AUTHENTICATION_REQUEST.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create AddAuthenticationRequest entities correctly', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
            password: '12345',
        };

        // Action
        const addAuthenticationRequest = new AddAuthenticationRequest(payload);

        // Assert
        expect(addAuthenticationRequest).toBeInstanceOf(AddAuthenticationRequest);
        expect(addAuthenticationRequest.username).toEqual(payload.username);
        expect(addAuthenticationRequest.password).toEqual(payload.password);
    });
});