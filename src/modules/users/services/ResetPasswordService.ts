import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';
import UsersRepository from '../repositories/IUsersRepository';
import UserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
  password: string;
  token: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository,
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;
    await this.usersRepository.save(user);
  }
}

export default SendForgotPasswordEmailService;
