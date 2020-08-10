import { container } from 'tsyringe';

import StorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import MailProvider from './MailProvider/models/MailProvider';
// import {} from './MailProvider/implementations';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
