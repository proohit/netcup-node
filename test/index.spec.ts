import NetcupApi from '../src';
import { InitParams } from '../src/@types/InitParams';
import {
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
} from '../src/@types/Responses';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from '../src/constants';
import {
  createEmptyInfoDnsRecordsResponse,
  createEmptyInfoDnsZoneResponse,
  givenSessionId,
  mockLoginResponse,
} from './testUtils';

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
});
