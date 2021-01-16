export * from './file';

export function sizeToString(size: number) {
  const num = Math.floor(size / 1024 / 1024 * 10) / 10;
  return `${num}MB`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function filterFileList(fileList: FileList | null): File[] {
  if (fileList === null) {
    return [];
  }

  const allowes = ['jpg', 'jpeg', 'png', 'mp4', 'mov'];

  return Array.from(fileList)
    .filter(v => {
      const ext = v.name.split('.').pop()?.toLocaleLowerCase() || '';
      return allowes.includes(ext);
    })
}
