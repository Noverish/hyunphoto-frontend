import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_URL } from 'src/envs';

export function uploladApi(file: File, callback?: (ratio: number) => void) {
  const formData = new FormData();
  formData.append('file', file);
  const config: AxiosRequestConfig = {
    url: `${SERVER_URL}/upload`,
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
    onUploadProgress: (e) => {
      const ratio = Math.round((e.loaded * 1000) / e.total) / 10;
      callback?.(ratio);
    }
  };
  return axios(config).then(res => res.data);
}