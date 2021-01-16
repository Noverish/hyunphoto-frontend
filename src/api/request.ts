import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function axiosErrorToString(error: any): string {
  if (error.response.data.msg) {
    return error.response.data.msg;
  } else if (error.response.data) {
    return JSON.stringify(error.response.data);
  } else if (error.request) {
    return JSON.stringify(error.request);
  } else if (error.message) {
    return error.message;
  } else {
    return JSON.stringify(error.config);
  }
}

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const errMsg = axiosErrorToString(error);
  return Promise.reject(errMsg);
});

export default function axiosRequest<T = any>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((err: string) => {
        reject(err);
      })
  })
}
