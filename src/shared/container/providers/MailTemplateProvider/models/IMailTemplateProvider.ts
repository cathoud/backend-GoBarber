import ParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface MailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}
