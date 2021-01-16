export type UploadFile = {
  file: File;
  dataURL: string;
  progress: number;
}

export type AlbumPreview = {
  id: number;
  name: string;
  thumbnail: string;
}

export type AlbumDetail = {
  id: number;
  name: string;
  date: string;
  pictures: string[];
}
