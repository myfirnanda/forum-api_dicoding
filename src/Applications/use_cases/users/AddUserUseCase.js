const RegisterUserRequest = require("../../../Domains/users/entities/RegisterUserRequest");

class AddUserUseCase {
    constructor({ userRepository, passwordHash }) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        const registerUserRequest = new RegisterUserRequest(useCasePayload);
        await this._userRepository.verifyAvailableUsername(registerUserRequest.username);
        registerUserRequest.password = await this._passwordHash.hash(registerUserRequest.password);
        return this._userRepository.addUser(registerUserRequest);
    };
}

module.exports = AddUserUseCase;