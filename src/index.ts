import { NetcupAuth } from './@types/NetcupAuth';
import { Formats } from './@types/Formats';
import { InfoDNSZoneParam } from './@types/Requests';
import { InfoDNSZoneResponse, LoginResponse } from './@types/Responses';
import NetcupRestApi from './api';
import { missingAuth } from './utils';
import { InitParams } from './@types/InitParams';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from './constants';
export default class NetcupApi {
  private authData: NetcupAuth = {
    apiKey: '',
    apiPassword: '',
    customerNumber: '',
    apiSessionId: '',
  };
  public readonly restApi: NetcupRestApi = new NetcupRestApi();

  private async checkAndRefreshAuth() {
    if (missingAuth(this.authData)) {
      throw new Error(NOT_INITIALIZED_ERROR);
    } else {
      await this.init({
        format: this.restApi.format,
        apikey: this.authData.apiKey,
        apipassword: this.authData.apiPassword,
        customernumber: this.authData.customerNumber,
      });
    }
  }

  public async init(params: InitParams): Promise<NetcupApi> {
    if (params.format && !Object.values(Formats).includes(params.format)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
    this.restApi.format = params.format || Formats.JSON;
    const res: LoginResponse = await this.restApi.login(params);
    this.authData.apiKey = params.apikey;
    this.authData.apiPassword = params.apipassword;
    this.authData.customerNumber = params.customernumber;
    this.authData.apiSessionId = res.responsedata.apisessionid;
    return this;
  }

  public async infoDnsZone(
    params: InfoDNSZoneParam,
  ): Promise<InfoDNSZoneResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.infoDnsZone({
      ...params,
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
    });
  }

  public getAuthData(): NetcupAuth {
    return this.authData;
  }
}
