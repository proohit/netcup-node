import { Actions } from './Actions';

export interface ApiResponse {
  serverrequestid: string;
  clientrequestid: string;
  action: string;
  status: string;
  statuscode: number;
  shortmessage: string;
  longmessage: string;
  responsedata: unknown;
}

export interface LoginResponse extends ApiResponse {
  action: Actions.login;
  responsedata: LoginResponsedata;
}

export interface LoginResponsedata {
  apisessionid: string;
}

export interface InfoDNSZoneResponse {
  serverrequestid: string;
  clientrequestid: string;
  action: string;
  status: string;
  statuscode: number;
  shortmessage: string;
  longmessage: string;
  responsedata: InfoDNSZoneResponsedata;
}

export interface InfoDNSZoneResponsedata {
  name: string;
  ttl: string;
  serial: string;
  refresh: string;
  retry: string;
  expire: string;
  dnssecstatus: boolean;
}

export interface InfoDNSRecordsResponse {
  serverrequestid: string;
  clientrequestid: string;
  action: string;
  status: string;
  statuscode: number;
  shortmessage: string;
  longmessage: string;
  responsedata: InfoDNSRecordsResponsedata;
}

export interface InfoDNSRecordsResponsedata {
  dnsrecords: Dnsrecord[];
}

export interface Dnsrecord {
  id: string;
  hostname: string;
  type: string;
  priority: string;
  destination: string;
  deleterecord: boolean;
  state: string;
}
