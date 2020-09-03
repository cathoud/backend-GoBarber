import SendMailDTO from '../dtos/ISendMailDTO';

export default interface MailProvider {
  sendMail(data: SendMailDTO): Promise<void>;
}
