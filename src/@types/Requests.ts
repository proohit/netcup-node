export interface AuthParam {
  customernumber: string;
  apikey: string;
  apisessionid: string;
}
export interface InfoDNSRecordsRequest {
  action: string;
  param: InfoDNSRecordsParam;
}

export interface InfoDNSRecordsParam extends AuthParam {
  domainname: string;
}
export interface InfoDNSZoneRequest {
  action: string;
  param: InfoDNSZoneParam;
}

export interface InfoDNSZoneParam extends AuthParam {
  domainname: string;
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
