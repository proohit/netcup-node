import { Actions } from './@types/Actions';
import { Formats } from './@types/Formats';
import {
  InfoDNSZoneParam,
  InfoDNSZoneRequest,
  LoginParam,
  LoginRequest,
} from './@types/Requests';
import { InfoDNSZoneResponse, LoginResponse } from './@types/Responses';
import { Api } from './api';
import { getFormattedUrl } from './utils';

export class NetcupApi extends Api {
  private format: Formats = Formats.JSON;
  constructor(format?: Formats) {
    super();
    if (format) {
      this.format = format;
    }
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

  public infoDnsZone(params: InfoDNSZoneParam) {
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

  public infoDnsRecords(params: InfoDNSZoneParam) {
    return this.postJson<InfoDNSZoneRequest, InfoDNSZoneResponse>(
      getFormattedUrl(this.format),
      {
        action: Actions.infoDnsRecords,
        param: {
          ...params,
        },
      },
    );
  }
}
