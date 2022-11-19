import { Formats } from './@types/Formats';
import { InitParams } from './@types/InitParams';
import { NetcupAuth } from './@types/NetcupAuth';
import {
  InfoDNSRecordsParam,
  InfoDNSZoneParam,
  UpdateDNSRecordsParam,
  UpdateDnsRecordWithCurrentIpParams,
} from './@types/Requests';
import {
  DnsRecord,
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
  LoginResponse,
  UpdateDNSRecordsResponse,
} from './@types/Responses';
import NetcupRestApi from './api';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from './constants';
import { missingAuth } from './utils';

class NetcupApi {
  private authData: NetcupAuth = {
    apiKey: '',
    apiPassword: '',
    customerNumber: '',
    apiSessionId: '',
  };
  public readonly restApi: NetcupRestApi = new NetcupRestApi();

  private async checkAndRefreshAuth() {
    if (missingAuth(this.authData)) {
      throw new Error(NOT_INITIALIZED_ERROR);
    } else {
      await this.init({
        format: this.restApi.format,
        apikey: this.authData.apiKey,
        apipassword: this.authData.apiPassword,
        customernumber: this.authData.customerNumber,
      });
    }
  }

  /**
   * Initializes authentication parameters
   */
  public async init(params: InitParams): Promise<NetcupApi> {
    if (params.format && !Object.values(Formats).includes(params.format)) {
      throw new Error(INVALID_FORMAT_ERROR);
    }
    this.restApi.format = params.format || Formats.JSON;
    const res: LoginResponse = await this.restApi.login(params);
    this.authData.apiKey = params.apikey;
    this.authData.apiPassword = params.apipassword;
    this.authData.customerNumber = params.customernumber;
    this.authData.apiSessionId = res.responsedata.apisessionid;
    return this;
  }

  /**
   * Returns information about the DNS zone of a domain
   * @example await api.infoDnsZone({ domainname: 'example.com' })
   */
  public async infoDnsZone(
    params: Pick<InfoDNSZoneParam, 'domainname'>,
  ): Promise<InfoDNSZoneResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.infoDnsZone({
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
      ...params,
    });
  }

  /**
   * Returns information about the DNS records of a domain
   * @example await api.infoDnsRecords({ domainname: 'example.com' })
   */
  public async infoDnsRecords(
    params: Pick<InfoDNSRecordsParam, 'domainname'>,
  ): Promise<InfoDNSRecordsResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.infoDnsRecords({
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
      ...params,
    });
  }

  /**
   * Updates DNS records of a domain and only those that are specified.
   * @example
   *  await api.updateDnsRecords({
        domainname: 'example.com',
        dnsrecordset: {
          dnsrecords: [{ name: 'www', type: 'A', destination: 'some-ip' }],
        },
      })
   * @example
   * // can also be used to delete records
   * await api.updateDnsRecords({
      domainname: 'example.com',
      dnsrecordset: {
        dnsrecords: [
          { name: 'www', type: 'A', destination: 'some-ip', deleterecord: true },
        ],
      },
    })
   */
  public async updateDnsRecords(
    params: Pick<UpdateDNSRecordsParam, 'dnsrecordset' | 'domainname'>,
  ): Promise<UpdateDNSRecordsResponse> {
    await this.checkAndRefreshAuth();
    return this.restApi.updateDnsRecords({
      apisessionid: this.authData.apiSessionId,
      customernumber: this.authData.customerNumber,
      apikey: this.authData.apiKey,
      ...params,
    });
  }

  /**
   * Updates DNS records of a domain with the current public ip.
   * @example
   * // update ipv4 only
   * await api.updateDnsRecordsWithCurrentIp({
      domainname: 'example.com',
      dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
    })
   * @example
   *  // update ipv4 and ipv6
   *  await api.updateDnsRecordsWithCurrentIp({
      domainname: 'example.com',
      dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
      useIpv4AndIpv6: true,
    })
   * @example
   * // update ipv6 only
   * await api.updateDnsRecordsWithCurrentIp({
      domainname: 'example.com',
      dnsrecordset: { dnsrecords: [{ hostname: 'www' }] },
      useIpv6Only: true,
    })
   */
  public async updateDnsRecordWithCurrentIp(
    params: UpdateDnsRecordWithCurrentIpParams,
  ): Promise<UpdateDNSRecordsResponse> {
    const publicIp = (await import('public-ip')).default;
    if (params.useIpv6Only) {
      const ipv6 = await publicIp.v6({ onlyHttps: true });
      const ipv6Record: DnsRecord = {
        type: 'AAAA',
        hostname: params.hostname,
        destination: ipv6,
      };
      return this.updateDnsRecords({
        domainname: params.domainname,
        dnsrecordset: { dnsrecords: [ipv6Record] },
      });
    }

    const ipv4 = await publicIp.v4({ onlyHttps: true });
    const ipv4Record: DnsRecord = {
      type: 'A',
      hostname: params.hostname,
      destination: ipv4,
    };

    if (params.useIpv4AndIpv6) {
      const ipv6 = await publicIp.v6({ onlyHttps: true });
      const ipv6Record: DnsRecord = {
        type: 'AAAA',
        hostname: params.hostname,
        destination: ipv6,
      };
      return this.updateDnsRecords({
        domainname: params.domainname,
        dnsrecordset: { dnsrecords: [ipv4Record, ipv6Record] },
      });
    }

    return this.updateDnsRecords({
      dnsrecordset: { dnsrecords: [ipv4Record] },
      domainname: params.domainname,
    });
  }

  public getAuthData(): NetcupAuth {
    return this.authData;
  }
}

export * from './@types';
export { NetcupRestApi, NetcupApi };

export default NetcupApi;
