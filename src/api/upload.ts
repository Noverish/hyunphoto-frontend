import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_URL } from 'src/envs';

export function uploladApi(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const config: AxiosRequestConfig = {
    url: `${SERVER_URL}/upload`,
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data: formData,
  };
  return axios(config).then(res => res.data);
}