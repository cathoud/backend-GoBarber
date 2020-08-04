import AppError from '@shared/errors/AppError';

import CreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a new user with the same email of another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const userData: CreateUserDTO = {
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    };

    await createUser.execute(userData);

    expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
