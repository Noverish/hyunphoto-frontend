export enum UploadFileStatus {
  FILE_LOADING = 0,
  IMAGE_CONVERTING = 1,
  READY = 2,
  UPLOADING = 3,
  DONE = 4,
}

export type UploadFile = {
  file: File;
  status: UploadFileStatus;
  progress: number;
}

export type AlbumPreview = {
  id: number;
  name: string;
  thumbnail: string;
}
