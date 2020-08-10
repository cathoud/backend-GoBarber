import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../repositories/IUsersRepository';
import UserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('MailProvider')
    private mailProvider: MailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email not found', 400);
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Recover password mail body');
  }
}

export default SendForgotPasswordEmailService;
