import { NetcupAuth } from './@types/NetcupAuth';
import { Formats } from './@types/Formats';
import { InfoDNSZoneParam, LoginParam } from './@types/Requests';
import { InfoDNSZoneResponse, LoginResponse } from './@types/Responses';
import NetcupApi from './api';
interface InitParams extends LoginParam {
  format?: Formats;
}

const authData: NetcupAuth = {
  apiKey: '',
  apiPassword: '',
  customerNumber: '',
  apiSessionId: '',
};

export const netcuApi: NetcupApi = new NetcupApi();

export async function init(params: InitParams): Promise<LoginResponse> {
  if (params.format && !Object.values(Formats).includes(params.format)) {
    throw new Error(
      'Invalid format. Valid formats are: ' + Object.values(Formats).join(', '),
    );
  }
  netcuApi.format = params.format || Formats.JSON;
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
