const RegisterUserResponse = require("../RegisterUserResponse");

describe('a RegisterUserResponse entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            username: 'dicoding',
            fullname: 'Dicoding Indonesia',
        };

        // Action and Assert
        expect(() => new RegisterUserResponse(payload)).toThrow('REGISTER_USER_RESPONSE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            id: 123,
            username: 'dicoding',
            fullname: 'Dicoding Indonesia',
        };

        // Action and Assert
        expect(() => new RegisterUserResponse(payload)).toThrow('REGISTER_USER_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create registerUserResponse object correctly', () => {
        // Arrange
        const payload = {
            id: 'user--123',
            username: 'dicoding',
            fullname: 'Dicoding Indonesia',
        };

        // Action
        const registerUserResponse = new RegisterUserResponse(payload);

        // Assert
        expect(registerUserResponse.id).toEqual(payload.id);
        expect(registerUserResponse.username).toEqual(payload.username);
        expect(registerUserResponse.fullname).toEqual(payload.fullname);
    })
});