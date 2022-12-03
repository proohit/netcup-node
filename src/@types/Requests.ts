import { DnsRecord } from './Responses';

export interface AuthParam {
  customernumber: string;
  apikey: string;
  apisessionid: string;
}

export type WithAuthentication<R> = R & AuthParam;

export interface InfoDNSRecordsRequest {
  action: string;
  param: WithAuthentication<InfoDNSRecordsParam>;
}

export interface InfoDNSZoneRequest {
  action: string;
  param: WithAuthentication<InfoDNSZoneParam>;
}

export interface UpdateDNSRecordsRequest {
  action: string;
  param: WithAuthentication<UpdateDNSRecordsParam>;
}

export interface LoginRequest {
  action: string;
  param: LoginParam;
}

export interface LoginParam {
  /**
   * Your Netcup API key generated from the [customer control panel](https://www.customercontrolpanel.de/daten_aendern.php?sprung=api).
   */
  apikey: string;
  /**
   * The associated password for the API key.
   */
  apipassword: string;
  /**
   * Your customer number.
   */
  customernumber: string;
}

export interface InfoDNSZoneParam {
  /**
   * The name of the domain to retrieve the zone info from.
   * @example "example.com"
   */
  domainname: string;
}

export interface InfoDNSRecordsParam {
  /**
   * The name of the domain to retrieve the records from.
   */
  domainname: string;
}

export interface UpdateDNSRecordsParam {
  /**
   * The domain name for which the DNS records should be updated.
   */
  domainname: string;
  /**
   * The DNS entries of the domain to update.
   */
  dnsrecordset: { dnsrecords: DnsRecord[] };
}

export interface UpdateDnsRecordWithCurrentIpParams {
  /**
   * The domain name for which DNS records with the current IP should be updated.
   * @example "example.com"
   */
  domainname: UpdateDNSRecordsParam['domainname'];
  /**
   * The host name of the DNS entry.
   * @example "www" - refers to www.example.com
   */
  hostname: DnsRecord['hostname'];
  /**
   * Indicates to update IPv6 (AAAA records) only.
   */
  useIpv6Only?: boolean;
  /**
   * Indicates to update IPv4 (A records) and IPv6 (AAAA records) records.
   */
  useIpv4AndIpv6?: boolean;
}
