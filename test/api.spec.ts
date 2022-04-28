import { Formats } from '../src/@types/Formats';
import {
  ApiResponse,
  InfoDNSRecordsResponse,
  InfoDNSZoneResponse,
} from '../src/@types/Responses';
import NetcupRestApi from '../src/api';
import {
  createEmptyApiResponse,
  createEmptyInfoDnsRecordsResponse,
  createEmptyInfoDnsZoneResponse,
  createEmptyLoginResponse,
} from './testUtils';

describe('Api functions', () => {
  describe('rest api methods tests', () => {
    it('infoDnsRecords', async () => {
      const api = new NetcupRestApi();
      const emptyResponse = createEmptyInfoDnsRecordsResponse();
      const givenResponse: InfoDNSRecordsResponse = {
        ...emptyResponse,
        statuscode: 2000,
        responsedata: {
          ...emptyResponse.responsedata,
          dnsrecords: [
            {
              id: '1',
              hostname: 'www',
              type: 'A',
              state: 'yes',
              priority: '',
              deleterecord: false,
              destination: '192.168.178.1',
            },
          ],
        },
      };
      jest
        .spyOn(api.axios, 'post')
        .mockReturnValue(Promise.resolve({ data: givenResponse }));

      const res = await api.infoDnsRecords({
        domainname: 'test.com',
        customernumber: '',
        apikey: '',
        apisessionid: '',
      });
      expect(res).toEqual(givenResponse);
    });
    it('infoDnsZone', async () => {
      const api = new NetcupRestApi();
      const emptyResponse = createEmptyInfoDnsZoneResponse();
      const givenResponse: InfoDNSZoneResponse = {
        ...emptyResponse,
        statuscode: 2000,
        responsedata: {
          ...emptyResponse.responsedata,
          name: 'test.com',
        },
      };
      jest
        .spyOn(api.axios, 'post')
        .mockReturnValue(Promise.resolve({ data: givenResponse }));

      const res = await api.infoDnsZone({
        domainname: 'test.com',
        customernumber: '',
        apikey: '',
        apisessionid: '',
      });
      expect(res).toEqual(givenResponse);
    });

    it('login', async () => {
      const api = new NetcupRestApi();
      const givenResponse: ApiResponse = {
        ...createEmptyLoginResponse(),
        responsedata: {
          apisessionid: 'testSession',
        },
      };
      jest
        .spyOn(api.axios, 'post')
        .mockReturnValue(Promise.resolve({ data: givenResponse }));
      const res = await api.login({
        apikey: 'testKey',
        apipassword: 'testPw',
        customernumber: '1234',
      });
      expect(res).toEqual(givenResponse);
    });
  });

  describe('format tests', () => {
    it('should set format correctly', () => {
      const api = new NetcupRestApi(Formats.JSON);
      expect(api.format).toBe(Formats.JSON);
    });
    it("should set default format to 'JSON'", () => {
      const api = new NetcupRestApi();
      expect(api.format).toBe(Formats.JSON);
    });
  });

  describe('interceptor tests', () => {
    it('should throw in error case', async () => {
      jest.mock('axios');
      const givenError: ApiResponse = {
        ...createEmptyApiResponse(),
        statuscode: 4010,
        longmessage: 'testError',
      };
      const api = new NetcupRestApi();

      expect(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        api.axios.interceptors.response.handlers[0].fulfilled({
          data: givenError,
        }),
      ).toThrow(givenError.longmessage);
    });

    it('should not throw in non error case', async () => {
      jest.mock('axios');
      const givenResponse: ApiResponse = {
        ...createEmptyApiResponse(),
        statuscode: 2000,
      };
      const api = new NetcupRestApi();

      expect(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        api.axios.interceptors.response.handlers[0].fulfilled({
          data: givenResponse,
        }),
      ).not.toThrow(givenResponse.longmessage);
    });

    it('should return response in non error case', async () => {
      jest.mock('axios');
      const givenResponse: ApiResponse = {
        ...createEmptyApiResponse(),
        statuscode: 2000,
        responsedata: {
          test: 'test',
        },
      };
      const api = new NetcupRestApi();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = api.axios.interceptors.response.handlers[0].fulfilled({
        data: givenResponse,
      });
      expect(res.data).toEqual(givenResponse);
    });
  });
});
