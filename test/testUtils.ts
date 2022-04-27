import { LoginResponse } from '../src/@types/Responses';

export const createEmptyLoginResponse = (): LoginResponse => ({
  serverrequestid: '',
  clientrequestid: '',
  action: '',
  status: '',
  statuscode: 0,
  shortmessage: '',
  longmessage: '',
  responsedata: {
    apisessionid: '',
  },
});
