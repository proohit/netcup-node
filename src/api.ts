import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Actions } from './@types/Actions';
import { Formats } from './@types/Formats';
import {
  InfoDNSRecordsParam,
  InfoDNSRecordsRequest,
  InfoDNSZoneParam,
  InfoDNSZoneRequest,
  LoginParam,
  LoginRequest,
  UpdateDNSRecordsParam,
  UpdateDNSRecordsRequest,
  WithAuthentication,
} from './@types/Requests';
import {
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
  LoginResponse,
  UpdateDNSRecordsResponse,
} from './@types/Responses';
import { getFormattedUrl } from './utils';

export function defaultResponseHandler(response: AxiosResponse) {
  if (response.data && response.data.statuscode !== 2000) {
    throw new Error(response.data.longmessage);
  }
  return response;
}

export default class NetcupRestApi {
  axios = axios.create();
  format: Formats = Formats.JSON;

  constructor(format?: Formats) {
    if (format) {
      this.format = format;
    }

    this.axios.interceptors.response.use(defaultResponseHandler);
  }

  protected async postJson<Req, Res>(
    url: string,
    data: Req,
    options?: AxiosRequestConfig,
  ): Promise<Res> {
    const res = await this.axios.post(url, data, {
      ...options,
      responseType: 'json',
    });
    return res.data;
  }

  public login(params: LoginParam): Promise<LoginResponse> {
    return this.postJson<LoginRequest, LoginResponse>(
      getFormattedUrl(this.format),
      {
        action: Actions.login,
        param: {
          ...params,
        },
      },
    );
  }

  public infoDnsZone(params: WithAuthentication<InfoDNSZoneParam>) {
    return this.postJson<InfoDNSZoneRequest, InfoDNSZoneResponse>(
      getFormattedUrl(this.format),
      {
        action: Actions.infoDnsZone,
        param: {
          ...params,
        },
      },
    );
  }

  public infoDnsRecords(params: WithAuthentication<InfoDNSRecordsParam>) {
    return this.postJson<InfoDNSRecordsRequest, InfoDNSRecordsResponse>(
      getFormattedUrl(this.format),
      {
        action: Actions.infoDnsRecords,
        param: {
          ...params,
        },
      },
    );
  }

  public updateDnsRecords(params: WithAuthentication<UpdateDNSRecordsParam>) {
    return this.postJson<UpdateDNSRecordsRequest, UpdateDNSRecordsResponse>(
      getFormattedUrl(this.format),
      {
        action: Actions.updateDnsRecords,
        param: {
          ...params,
        },
      },
    );
  }
}
