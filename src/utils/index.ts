export function sizeToString(size: number) {
  const num = Math.floor(size / 1024 / 1024 * 10) / 10;
  return `${num}MB`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      if (dataURL) {
        resolve(dataURL.toString());
      } else {
        reject(new Error(`DataURL of '${file.name}' is null`));
      }
    };
    reader.readAsDataURL(file);
  });
}
