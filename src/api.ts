import axios, { AxiosRequestConfig } from 'axios';

export class Api {
  protected axios = axios.create();

  protected post<Req, Res>(
    url: string,
    data: Req,
    options?: AxiosRequestConfig,
  ): Promise<Res> {
    return this.axios.post<Req, Res>(url, data, {
      ...options,
    });
  }

  protected postJson<Req, Res>(
    url: string,
    data: Req,
    options?: AxiosRequestConfig,
  ): Promise<Res> {
    return this.post<Req, Res>(url, data, {
      ...options,
      responseType: 'json',
    });
  }
}
