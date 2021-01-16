import { SERVER_URL } from 'src/envs';
import { AlbumDetail } from 'src/models';
import axiosRequest from './request';

export default function albumDetailApi(albumId: number): Promise<AlbumDetail> {
  return axiosRequest({
    url: `${SERVER_URL}/albums/${albumId}`,
    method: 'get',
  });
}
