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
  action: Actions.infoDnsZone;
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
  id?: string;
  /**
   * The name of the DNS record. If the record is a subdomain, the name is the subdomain name.
   * @example "www"
   */
  hostname: string;
  /**
   * The type of the DNS record.
   * @example "A"
   * @example "AAAA"
   */
  type: string;
  priority?: string;
  /**
   * The destination of the DNS record. For A and AAAA records, this is the IP address.
   * @example "192.168.178.1"
   * @example "2000::1"
   */
  destination: string;
  /**
   * Indicates whether the DNS record should be deleted.
   */
  deleterecord?: boolean;
  state?: string;
}

export interface UpdateDNSRecordsResponse extends ApiResponse {
  action: Actions.updateDnsRecords;
  responsedata: UpdateDNSRecordsResponseData;
}

interface UpdateDNSRecordsResponseData {
  dnsrecords: DnsRecord[];
}
