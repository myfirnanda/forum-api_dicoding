const AuthenticationRepository = require("../../../../Domains/authentications/AuthenticationRepository");
const NewAuthentication = require("../../../../Domains/authentications/entities/NewAuthentication");
const UserRepository = require("../../../../Domains/users/UserRepository");
const PasswordHash = require("../../../security/PasswordHash");
const TokenManager = require("../../../security/TokenManager");
const AddAuthenticationUseCase = require('../AddAuthenticationUseCase');

describe('AddAuthenticationUseCase', () => {
    it('should orchestrate the get authentication action correctly', async () => {
        // Arrange
        const useCasePayload = {
            username: 'dicoding',
            password: 'secret',
        };

        const mockedAuthentication = new NewAuthentication({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        });

        const mockUserRepository = new UserRepository();
        const mockAuthenticationRepository = new AuthenticationRepository();
        const mockTokenManager = new TokenManager();
        const mockPasswordHash = new PasswordHash();

        // Mocking dependencies
        jest.spyOn(mockUserRepository, 'getPasswordByUsername')
            .mockResolvedValue('encrypted_password');

        jest.spyOn(mockPasswordHash, 'comparePassword')
            .mockResolvedValue();

            jest.spyOn(mockTokenManager, 'generateAccessToken')
            .mockResolvedValue(mockedAuthentication.accessToken);
        
        jest.spyOn(mockTokenManager, 'generateRefreshToken')
            .mockResolvedValue(mockedAuthentication.refreshToken);

        jest.spyOn(mockUserRepository, 'getIdByUsername')
            .mockResolvedValue('user-123');

        jest.spyOn(mockAuthenticationRepository, 'addRefreshToken')
            .mockResolvedValue();

        // Create use case instance
        const addAuthenticationUseCase = new AddAuthenticationUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthenticationRepository,
            tokenManager: mockTokenManager,
            passwordHash: mockPasswordHash,
        });

        // Action
        const actualAuthentication = await addAuthenticationUseCase.execute(useCasePayload);

        // Assert
        expect(actualAuthentication).toEqual(new NewAuthentication({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        }));

        expect(mockUserRepository.getPasswordByUsername)
            .toHaveBeenCalledWith('dicoding');

        expect(mockPasswordHash.comparePassword)
            .toHaveBeenCalledWith('secret', 'encrypted_password');

        expect(mockUserRepository.getIdByUsername)
            .toHaveBeenCalledWith('dicoding');

        expect(mockTokenManager.generateAccessToken)
            .toHaveBeenCalledWith({ id: 'user-123', username: 'dicoding' });

        expect(mockTokenManager.generateRefreshToken)
            .toHaveBeenCalledWith({ username: 'dicoding', id: 'user-123' });

        expect(mockAuthenticationRepository.addRefreshToken)
            .toHaveBeenCalledWith(mockedAuthentication.refreshToken);
    });
});
