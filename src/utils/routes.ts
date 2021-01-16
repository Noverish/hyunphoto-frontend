import { match } from "react-router-dom";

export const album_list = '/albums';
export const album_detail_func = (albumId: number | string) => `/albums/${albumId}`;
export const album_detail = album_detail_func(':albumId');
export const album_detail_albumId_parse = (m: match<any>): number => parseInt(m.params.albumId);

export const image_upload = '/upload/image';
export const video_upload = '/upload/video';
