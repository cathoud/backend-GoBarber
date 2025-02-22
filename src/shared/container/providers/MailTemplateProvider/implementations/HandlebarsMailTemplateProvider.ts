import handlebars from 'handlebars';
import fs from 'fs';

import MailTemplateProvider from '../models/IMailTemplateProvider';
import ParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements MailTemplateProvider {
  public async parse({
    file,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
