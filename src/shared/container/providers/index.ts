import { container } from 'tsyringe';

import StorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
