import NetcupApi from '../src';
import { InitParams } from '../src/@types/InitParams';
import {
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
  UpdateDNSRecordsResponse,
} from '../src/@types/Responses';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from '../src/constants';
import {
  createEmptyInfoDnsRecordsResponse,
  createEmptyInfoDnsZoneResponse,
  createEmptyUpdateDnsRecordsResponse,
  givenSessionId,
  mockLoginResponse,
} from './testUtils';
jest.mock('public-ip', () => ({
  __esModule: true, // this property makes it work,
  default: { v4: () => 'testIpv4', v6: () => 'testIpv6' },
}));
describe('exported functions', () => {
  const givenAuthData: InitParams = {
    apikey: 'testKey',
    apipassword: 'testPw',
    customernumber: '1234',
  };
  describe('init tests', () => {
    it('should initialize correctly', async () => {
      const netcupApi = new NetcupApi();
      mockLoginResponse(netcupApi.restApi);
      await netcupApi.init(givenAuthData);
      expect(netcupApi.getAuthData()).toEqual({
        apiKey: givenAuthData.apikey,
        apiPassword: givenAuthData.apipassword,
        customerNumber: givenAuthData.customernumber,
        apiSessionId: givenSessionId,
      });
    });

    it('should validate format', async () => {
      await expect(() =>
        new NetcupApi().init({
          ...givenAuthData,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          format: 'invalidFormat',
        }),
      ).rejects.toThrow(new Error(INVALID_FORMAT_ERROR));
    });
  });

  describe('infoDnsZone tests', () => {
    it('should return dns zone correctly', async () => {
      const netcupApi = new NetcupApi();
      mockLoginResponse(netcupApi.restApi);
      await netcupApi.init(givenAuthData);
      const givenDnsZoneInfo: InfoDNSZoneResponse = {
        ...createEmptyInfoDnsZoneResponse(),
        responsedata: {
          name: 'test.domain.com',
          ttl: '86400',
          serial: '2022042615',
          refresh: '28800',
          retry: '7200',
          expire: '1209600',
          dnssecstatus: false,
        },
      };
      jest
        .spyOn(netcupApi.restApi, 'infoDnsZone')
        .mockReturnValue(Promise.resolve(givenDnsZoneInfo));
      const infoDnsZoneResult = await netcupApi.infoDnsZone({
        domainname: 'test.domain.com',
      });
      expect(infoDnsZoneResult).toEqual(givenDnsZoneInfo);
    });

    it('should throw error on dns zone without auth', async () => {
      await expect(() =>
        new NetcupApi().infoDnsZone({
          domainname: '',
        }),
      ).rejects.toThrow(NOT_INITIALIZED_ERROR);
    });
  });

  describe('infoDnsRecords tests', () => {
    it('should return dns records correctly', async () => {
      const netcupApi = new NetcupApi();
      mockLoginResponse(netcupApi.restApi);
      await netcupApi.init(givenAuthData);
      const givenDnsRecordsInfo: InfoDNSRecordsResponse = {
        ...createEmptyInfoDnsRecordsResponse(),
        responsedata: {
          dnsrecords: [
            {
              id: '1',
              hostname: 'test.domain.com',
              type: 'A',
              destination: '192.168.178.1',
              deleterecord: false,
              priority: '',
              state: 'yes',
            },
          ],
        },
      };
      jest
        .spyOn(netcupApi.restApi, 'infoDnsRecords')
        .mockReturnValue(Promise.resolve(givenDnsRecordsInfo));
      const infoDnsRecordsResult = await netcupApi.infoDnsRecords({
        domainname: 'test.domain.com',
      });
      expect(infoDnsRecordsResult).toEqual(givenDnsRecordsInfo);
    });

    it('should throw error on dns zone without auth', async () => {
      await expect(() =>
        new NetcupApi().infoDnsRecords({
          domainname: '',
        }),
      ).rejects.toThrow(NOT_INITIALIZED_ERROR);
    });
  });

  describe('updateDnsRecords tests', () => {
    it('should correctly update dns records', async () => {
      const netcupApi = new NetcupApi();
      mockLoginResponse(netcupApi.restApi);
      await netcupApi.init(givenAuthData);
      const givenDnsRecordsUpdate: UpdateDNSRecordsResponse = {
        ...createEmptyUpdateDnsRecordsResponse(),
        responsedata: {
          dnsrecords: [
            {
              id: '',
              deleterecord: false,
              hostname: 'test',
              priority: '',
              state: 'yes',
              type: 'A',
              destination: '@',
            },
          ],
        },
      };

      jest
        .spyOn(netcupApi.restApi, 'updateDnsRecords')
        .mockReturnValue(Promise.resolve(givenDnsRecordsUpdate));
      const updateDnsRecordsResult = await netcupApi.updateDnsRecords({
        dnsrecordset: {
          dnsrecords: [],
        },
        domainname: 'test.domain.com',
      });
      expect(updateDnsRecordsResult).toEqual(givenDnsRecordsUpdate);
    });

    it('should throw error on update dns records without auth', async () => {
      await expect(() =>
        new NetcupApi().updateDnsRecords({
          dnsrecordset: {
            dnsrecords: [],
          },
          domainname: '',
        }),
      ).rejects.toThrow(NOT_INITIALIZED_ERROR);
    });
  });

  describe('updateDnsRecordWithCurrentIp tests', () => {
    it('should correctly update dns records with current ip', async () => {
      const netcupApi = new NetcupApi();
      const givenDnsRecordsUpdate: UpdateDNSRecordsResponse = {
        ...createEmptyUpdateDnsRecordsResponse(),
        responsedata: {
          dnsrecords: [
            {
              id: '',
              deleterecord: false,
              hostname: 'test',
              priority: '',
              state: 'yes',
              type: 'A',
              destination: 'testIpv4',
            },
          ],
        },
      };

      const spyFn = jest.spyOn(netcupApi, 'updateDnsRecords');
      spyFn.mockReturnValue(Promise.resolve(givenDnsRecordsUpdate));
      const updateDnsRecordsResult =
        await netcupApi.updateDnsRecordWithCurrentIp({
          domainname: 'test.domain.com',
          hostname: 'test',
        });
      expect(updateDnsRecordsResult).toEqual(givenDnsRecordsUpdate);
      expect(spyFn).toHaveBeenCalledWith({
        dnsrecordset: {
          dnsrecords: [
            {
              hostname: 'test',
              type: 'A',
              destination: 'testIpv4',
            },
          ],
        },
        domainname: 'test.domain.com',
      });
    });
    it('should correctly update dns records with current ip with ipv6', async () => {
      const netcupApi = new NetcupApi();
      const givenDnsRecordsUpdate: UpdateDNSRecordsResponse = {
        ...createEmptyUpdateDnsRecordsResponse(),
        responsedata: {
          dnsrecords: [
            {
              id: '',
              deleterecord: false,
              hostname: 'test',
              priority: '',
              state: 'yes',
              type: 'A',
              destination: 'testIpv4',
            },
            {
              id: '',
              deleterecord: false,
              hostname: 'test',
              priority: '',
              state: 'yes',
              type: 'AAAA',
              destination: 'testIpv6',
            },
          ],
        },
      };

      const spyFn = jest.spyOn(netcupApi, 'updateDnsRecords');
      spyFn.mockReturnValue(Promise.resolve(givenDnsRecordsUpdate));
      const updateDnsRecordsResult =
        await netcupApi.updateDnsRecordWithCurrentIp({
          domainname: 'test.domain.com',
          hostname: 'test',
          useIpv4AndIpv6: true,
        });
      expect(updateDnsRecordsResult).toEqual(givenDnsRecordsUpdate);
      expect(spyFn).toHaveBeenCalledWith({
        dnsrecordset: {
          dnsrecords: [
            {
              hostname: 'test',
              type: 'A',
              destination: 'testIpv4',
            },
            {
              hostname: 'test',
              type: 'AAAA',
              destination: 'testIpv6',
            },
          ],
        },
        domainname: 'test.domain.com',
      });
    });
  });
});
