import MailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements MailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
