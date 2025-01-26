const AddAuthenticationRequest = require('../../../Domains/authentications/entities/AddAuthenticationRequest');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuthentication');

class AddAuthenticationUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    tokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new AddAuthenticationRequest(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const accessToken = await this._tokenManager
      .generateAccessToken({ username, id });
    const refreshToken = await this._tokenManager
      .generateRefreshToken({ username, id });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addRefreshToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = AddAuthenticationUseCase;