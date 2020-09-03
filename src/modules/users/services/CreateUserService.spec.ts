import AppError from '@shared/errors/AppError';

import CreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a new user with the same email of another', async () => {
    const userData: CreateUserDTO = {
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    };

    await createUser.execute(userData);

    await expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
