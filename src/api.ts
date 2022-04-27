import axios, { AxiosRequestConfig } from 'axios';

export class Api {
  static post<Req, Res>(
    url: string,
    data: Req,
    options?: AxiosRequestConfig,
  ): Promise<Res> {
    return axios.post<Req, Res>(url, data, {
      ...options,
    });
  }
  static async postJson<Req, Res>(
    url: string,
    data: Req,
    options?: AxiosRequestConfig,
  ): Promise<Res> {
    return await Api.post<Req, Res>(url, data, {
      ...options,
      responseType: 'json',
    });
  }
}
