import nodemailer, { Transporter } from 'nodemailer';
import MailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import MailProvider from '../models/MailProvider';
import SendMailDTO from '../dtos/ISendMailDTO';

@injectable()
class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        ...account.smtp,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
