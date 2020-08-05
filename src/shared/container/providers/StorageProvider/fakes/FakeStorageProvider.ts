import StorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements StorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(filename => filename === file);
    this.storage.splice(fileIndex, 1);
  }
}

export default DiskStorageProvider;
