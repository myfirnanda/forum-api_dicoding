const RegisterUserRequest = require("../../../../Domains/users/entities/RegisterUserRequest");
const RegisterUserResponse = require("../../../../Domains/users/entities/RegisterUserResponse");
const UserRepository = require("../../../../Domains/users/UserRepository");
const PasswordHash = require("../../../security/PasswordHash");
const AddUserUseCase = require("../AddUserUseCase");

describe('AddUserUseCase', () => {
    it('should orchestrating the add user action correctly', async () => {
      // Arrange
        const useCasePayload = {
            username: 'dicoding',
            password: 'secret',
            fullname: 'Dicoding Indonesia',
        };
        const mockRegisterUserResponse = new RegisterUserResponse({
            id: 'user-123',
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        });

        /** creating dependency of use case */
        const mockUserRepository = new UserRepository();
        const mockPasswordHash = new PasswordHash();

        /** mocking needed function */
        mockUserRepository.verifyAvailableUsername = jest.fn().mockImplementation(() => Promise.resolve());
        mockPasswordHash.hash = jest.fn().mockImplementation(() => Promise.resolve('encrypted_password'));
        mockUserRepository.addUser = jest.fn().mockImplementation(() => Promise.resolve(mockRegisterUserResponse));

        /** creating use case instance */
        const getUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash,
        });

        // Action
        const registerUserResponse = await getUserUseCase.execute(useCasePayload);

        // Assert
        expect(registerUserResponse).toStrictEqual(new RegisterUserResponse({
            id: 'user-123',
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        }));
        expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
        expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
        expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUserRequest({
            username: useCasePayload.username,
            password: 'encrypted_password',
            fullname: useCasePayload.fullname,
        }));
    });
});