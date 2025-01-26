const UsersTableTestHelper = require("../../../../test/UsersTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const RegisterUserRequest = require("../../../Domains/users/entities/RegisterUserRequest");
const RegisterUserResponse = require("../../../Domains/users/entities/RegisterUserResponse");
const pool = require("../../database/postgres/pool");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");

describe('UserRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verifyAvailableUsername function', () => {
        it('should throw InvariantError when username not available ', async () => {
            await UsersTableTestHelper.addUser({ username: 'dicoding' });
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).rejects.toThrow(InvariantError);
        });

        it('should not throw InvariantError when username available', async () => {
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding'));
        });
    });

    describe('addUser function', () => {
        it('should persist register user', async () => {

            const registerUserRequest = new RegisterUserRequest({
                username: 'dicoding',
                password: 'secret_password',
                fullname: 'Dicoding Indo',
            });
            const fakeIdGenerator = () => '123';
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            await userRepositoryPostgres.addUser(registerUserRequest);

            const users = await UsersTableTestHelper.findUserById('user-123');
            expect(users).toHaveLength(1);
        });

        it('should return registered user correctly', async () => {
            const registerUserRequest = new RegisterUserRequest({
                username: 'dicoding',
                password: 'secret_password',
                fullname: 'Dicoding Indonesia',
            });
            const fakeIdGenerator = () => '123';
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            const registerUserResponse = await userRepositoryPostgres.addUser(registerUserRequest);

            expect(registerUserResponse).toStrictEqual(new RegisterUserResponse({
                id: 'user-123',
                username: 'dicoding',
                fullname: 'Dicoding Indonesia',
            }));
        });
    });
});