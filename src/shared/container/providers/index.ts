import { container } from 'tsyringe';

import StorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProvider from './MailProvider/models/MailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<MailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
