import { container } from 'tsyringe';

import StorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProvider from './MailProvider/models/MailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import MailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<MailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<MailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
