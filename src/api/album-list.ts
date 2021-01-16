import { SERVER_URL } from 'src/envs';
import { AlbumPreview } from 'src/models';
import axiosRequest from './request';

export default function albumListApi(): Promise<AlbumPreview[]> {
  return axiosRequest({
    url: `${SERVER_URL}/albums`,
    method: 'get',
  });
}
