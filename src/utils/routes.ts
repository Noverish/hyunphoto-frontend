import { match } from "react-router-dom";

export const login = '/login';

export const album_list = '/albums';
export const album_detail_func = (albumId: number | string) => `/albums/${albumId}`;
export const album_detail = album_detail_func(':albumId');
export const album_detail_albumId_parse = (m: match<any>): number => parseInt(m.params.albumId);

export const album_upload_func = (albumId: number | string) => `/albums/${albumId}/upload`;
export const album_upload = album_upload_func(':albumId');
export const album_upload_albumId_parse = (m: match<any>): number => parseInt(m.params.albumId);
