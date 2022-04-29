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
  responsedata: InfoDNSZoneResponseData;
}

export interface InfoDNSZoneResponseData {
  name: string;
  ttl: string;
  serial: string;
  refresh: string;
  retry: string;
  expire: string;
  dnssecstatus: boolean;
}

export interface InfoDNSRecordsResponse extends ApiResponse {
  action: Actions.infoDnsRecords;
  responsedata: InfoDNSRecordsResponseData;
}

export interface InfoDNSRecordsResponseData {
  dnsrecords: DnsRecord[];
}

export interface DnsRecord {
  id: string;
  hostname: string;
  type: string;
  priority: string;
  destination: string;
  deleterecord: boolean;
  state: string;
}
