const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repositories/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const AuthenticationRepositoryPostgres = require('./repositories/AuthenticationRepositoryPostgres');
const JwtTokenManager = require('./security/JwtTokenManager');

// use case
const AddUserUseCase = require('../Applications/use_cases/users/AddUserUseCase');
const AddAuthenticationUseCase = require('../Applications/use_cases/authentications/AddAuthenticationUseCase');
const DeleteAuthenticationUseCase = require('../Applications/use_cases/authentications/DeleteAuthenticationUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_cases/authentications/RefreshAuthenticationUseCase');

// domain interfaces
const UserRepository = require('../Domains/users/UserRepository');
const PasswordHash = require('../Applications/security/PasswordHash');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const TokenManager = require('../Applications/security/TokenManager');

// creating container
const container = createContainer();

// registering services and repositories
container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryPostgres,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },
    {
        key: PasswordHash.name,
        Class: BcryptPasswordHash,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    concrete: bcrypt,
                },
            ],
        },
    },
    {
        key: AuthenticationRepository.name,
        Class: AuthenticationRepositoryPostgres,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    concrete: pool,
                },
            ],
        },
    },
    {
        key: TokenManager.name,
        Class: JwtTokenManager,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    concrete: Jwt,
                },
            ],
        },
    },
]);

// registering use cases
container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
            ],
        },
    },
    {
        key: AddAuthenticationUseCase.name,
        Class: AddAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
            ],
        },
    },
    {
        key: DeleteAuthenticationUseCase.name,
        Class: DeleteAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
            ],
        },
    },
    {
        key: RefreshAuthenticationUseCase.name,
        Class: RefreshAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'tokenManager',
                    internal: TokenManager.name,
                },
            ],
        },
    },
]);

module.exports = container;
