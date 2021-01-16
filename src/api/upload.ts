import { SERVER_URL } from 'src/envs';
import axiosRequest from './request';

export default function uploadApi(file: File, callback?: (ratio: number) => void) {
  const formData = new FormData();
  formData.append('file', file);
  
  return axiosRequest({
    url: `${SERVER_URL}/upload`,
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
    onUploadProgress: (e) => {
      const ratio = Math.round((e.loaded * 1000) / e.total) / 10;
      callback?.(ratio);
    }
  });
}
