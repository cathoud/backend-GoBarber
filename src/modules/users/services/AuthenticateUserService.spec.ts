import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able authenticate', async () => {
    const user = await createUser.execute({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'falula@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'falula@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    await createUser.execute({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'falula@mail.com',
        password: 'incorrect-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
