import { Formats } from './@types/Formats';
import { InitParams } from './@types/InitParams';
import { NetcupAuth } from './@types/NetcupAuth';
import { InfoDNSRecordsParam, InfoDNSZoneParam } from './@types/Requests';
import {
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
  LoginResponse,
} from './@types/Responses';
import NetcupRestApi from './api';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from './constants';
import { missingAuth } from './utils';

class NetcupApi {
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
    params: Pick<InfoDNSZoneParam, 'domainname'>,
  ): Promise<InfoDNSZoneResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.infoDnsZone({
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
      ...params,
    });
  }

  public async infoDnsRecords(
    params: Pick<InfoDNSRecordsParam, 'domainname'>,
  ): Promise<InfoDNSRecordsResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.infoDnsRecords({
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
      ...params,
    });
  }

  public getAuthData(): NetcupAuth {
    return this.authData;
  }
}

// EXPORTS

export * from './@types/Formats';
export * from './@types/InitParams';
export * from './@types/NetcupAuth';
export * from './@types/Requests';
export * from './@types/Responses';
export { NetcupRestApi };

export default NetcupApi;
