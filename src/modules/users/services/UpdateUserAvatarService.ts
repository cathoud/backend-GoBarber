// import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only unthenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // if (userAvatarFileExists) {
      try {
        await fs.promises.unlink(userAvatarFilePath);
      } catch (err) {
        console.log(err);
      }
      // }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
