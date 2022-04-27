import NetcupApi from '../src';
import { INVALID_FORMAT_ERROR, NOT_INITIALIZED_ERROR } from '../src/constants';
import {
  createEmptyInfoDnsZoneResponse,
  givenSessionId,
  mockLoginResponse,
} from './testUtils';

describe('exported functions', () => {
  const givenAuthData = {
    apikey: 'testKey',
    apipassword: 'testPw',
    customernumber: '1234',
  };
  beforeEach(async () => {
    jest.clearAllMocks();
  });
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
      const givenDnsZoneInfo = {
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
});
