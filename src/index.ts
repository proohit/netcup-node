import { NetcupAuth } from './@types/NetcupAuth';
import { Formats } from './@types/Formats';
import { InfoDNSZoneParam, LoginParam } from './@types/Requests';
import { InfoDNSZoneResponse, LoginResponse } from './@types/Responses';
import { NetcupApi } from './netcup-api';
interface InitParams extends LoginParam {
  format?: Formats;
}

const authData: NetcupAuth = {
  apiKey: '',
  apiPassword: '',
  customerNumber: '',
  apiSessionId: '',
};

let netcuApi: NetcupApi;

export async function init(params: InitParams): Promise<LoginResponse> {
  netcuApi = new NetcupApi(params.format);
  const res: LoginResponse = await netcuApi.login(params);
  authData.apiKey = params.apikey;
  authData.apiPassword = params.apipassword;
  authData.customerNumber = params.customernumber;
  authData.apiSessionId = res.responsedata.apisessionid;
  return res;
}

export function infoDnsZone(
  params: InfoDNSZoneParam,
): Promise<InfoDNSZoneResponse> {
  return netcuApi.infoDnsZone({
    ...params,
    apisessionid: authData.apiSessionId,
    customernumber: authData.customerNumber,
    apikey: authData.apiKey,
  });
}

export function getAuthData(): NetcupAuth {
  return authData;
}
