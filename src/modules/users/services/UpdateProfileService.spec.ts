import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update the user's profile", async () => {
    const user = await fakeUsersRepository.create({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Phoebe Buffay',
      email: 'phalange@mail.com',
    });

    expect(updatedUser.name).toBe('Phoebe Buffay');
    expect(updatedUser.email).toBe('phalange@mail.com');
  });

  it('should not be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'Phoebe Buffay',
        email: 'phalange@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Phoebe Buffay',
      email: 'phalange@mail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Phoebe Buffay',
        email: 'falula@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Phoebe Buffay',
      email: 'phalange@mail.com',
      password: '654321',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('654321');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Phoebe Buffay',
        email: 'phalange@mail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'falula@mail.com',
      name: 'Monica',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Phoebe Buffay',
        email: 'phalange@mail.com',
        old_password: 'incorrect-old-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
