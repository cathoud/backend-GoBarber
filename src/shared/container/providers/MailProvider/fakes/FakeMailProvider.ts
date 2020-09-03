import MailProvider from '../models/MailProvider';
import SendMailDTO from '../dtos/ISendMailDTO';

class FakeMailProvider implements MailProvider {
  private messages: SendMailDTO[] = [];

  public async sendMail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
