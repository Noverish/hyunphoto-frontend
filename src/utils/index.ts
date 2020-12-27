export function sizeToString(size: number) {
  const num = Math.floor(size / 1024 / 1024 * 10) / 10;
  return `${num}MB`
}