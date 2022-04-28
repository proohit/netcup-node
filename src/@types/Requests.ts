export interface InfoDNSRecordsRequest {
  action: string;
  param: InfoDNSRecordsParam;
}

export interface InfoDNSRecordsParam {
  domainname: string;
  customernumber: string;
  apikey: string;
  apisessionid: string;
}

export interface InfoDNSZoneRequest {
  action: string;
  param: InfoDNSZoneParam;
}

export interface InfoDNSZoneParam {
  domainname: string;
  customernumber: string;
  apikey: string;
  apisessionid: string;
}

export interface LoginRequest {
  action: string;
  param: LoginParam;
}

export interface LoginParam {
  apikey: string;
  apipassword: string;
  customernumber: string;
}
