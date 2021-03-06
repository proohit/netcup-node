import { Actions } from '../src/@types/Actions';
import { LoginParam } from '../src/@types/Requests';
import {
  ApiResponse,
  DnsRecord,
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
  LoginResponse,
  UpdateDNSRecordsResponse,
} from '../src/@types/Responses';
import NetcupRestApi from '../src/api';

export const createEmptyApiResponse = <
  R extends ApiResponse,
>(): ApiResponse => ({
  serverrequestid: '',
  clientrequestid: '',
  action: '',
  status: '',
  statuscode: 0,
  shortmessage: '',
  longmessage: '',
  responsedata: {} as R['responsedata'],
});

export const createEmptyLoginResponse = (): LoginResponse => ({
  ...createEmptyApiResponse<LoginResponse>(),
  action: Actions.login,
  responsedata: {
    apisessionid: '',
  },
});

export const createEmptyLoginRequest = (): LoginParam => ({
  apikey: '',
  apipassword: '',
  customernumber: '',
});

export const createEmptyInfoDnsZoneResponse = (): InfoDNSZoneResponse => ({
  ...createEmptyApiResponse<InfoDNSZoneResponse>(),
  action: Actions.infoDnsZone,
  responsedata: {
    name: '',
    ttl: '',
    serial: '',
    refresh: '',
    retry: '',
    expire: '',
    dnssecstatus: false,
  },
});

export const createEmptyInfoDnsRecordsResponse =
  (): InfoDNSRecordsResponse => ({
    ...createEmptyApiResponse<InfoDNSRecordsResponse>(),
    action: Actions.infoDnsRecords,
    responsedata: {
      dnsrecords: [],
    },
  });

export const givenSessionId = 'testSession';

export function mockLoginResponse(api: NetcupRestApi) {
  const givenLoginResponse = {
    ...createEmptyLoginResponse(),
    responsedata: { apisessionid: givenSessionId },
  };
  jest.spyOn(api, 'login').mockReturnValue(Promise.resolve(givenLoginResponse));
}

export const createEmptyUpdateDnsRecordsResponse =
  (): UpdateDNSRecordsResponse => ({
    ...createEmptyApiResponse<UpdateDNSRecordsResponse>(),
    action: Actions.updateDnsRecords,
    responsedata: {
      dnsrecords: [],
    },
  });

export const emptyDnsRecord: DnsRecord = {
  id: '',
  deleterecord: false,
  hostname: '',
  priority: '',
  state: '',
  type: '',
  destination: '',
};
