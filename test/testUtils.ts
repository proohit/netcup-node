import { Actions } from '../src/@types/Actions';
import { LoginParam } from '../src/@types/Requests';
import { ApiResponse, LoginResponse } from '../src/@types/Responses';

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
