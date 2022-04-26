import { Actions } from './@types/Actions';
import { AuthData } from './@types/AuthData';
import { Formats } from './@types/Formats';
import { InfoDNSZoneParam, LoginParam } from './@types/Requests';
import { InfoDNSZoneResponse, LoginResponse } from './@types/Responses';
import { Api } from './Api';
import { getFormattedUrl } from './utils';

const authData: AuthData = {
  apiKey: '',
  apiPassword: '',
  customerNumber: '',
  apiSessionId: '',
};

export async function init(params: LoginParam): Promise<string> {
  const res: LoginResponse = await Api.postJson<LoginResponse>(
    getFormattedUrl(Formats.JSON),
    {
      body: JSON.stringify({
        action: Actions.login,
        param: {
          ...params,
        },
      }),
    },
  );
  authData.apiKey = params.apikey;
  authData.apiPassword = params.apipassword;
  authData.customerNumber = params.customernumber;
  authData.apiSessionId = res.responsedata.apisessionid;
  return authData.apiSessionId;
}

export function infoDnsZone(
  params: InfoDNSZoneParam,
): Promise<InfoDNSZoneResponse> {
  if (!authData.apiSessionId) {
    throw new Error('Api session id is not set');
  }
  return Api.postJson(getFormattedUrl(Formats.JSON), {
    body: JSON.stringify({
      action: Actions.infoDnsZone,
      param: {
        apikey: authData.apiKey,
        apisessionid: authData.apiSessionId,
        customernumber: authData.customerNumber,
        ...params,
      },
    }),
  });
}
