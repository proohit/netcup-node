import { getAuthData, init, netcuApi } from '../src/index';
import { createEmptyLoginResponse } from './testUtils';

describe('exported functions', () => {
  it('should initialize correctly', async () => {
    jest.spyOn(netcuApi, 'login').mockImplementation(() =>
      Promise.resolve({
        ...createEmptyLoginResponse(),
        responsedata: { apisessionid: 'testSession' },
      }),
    );
    const givenAuthData = {
      apikey: 'testKey',
      apipassword: 'testPw',
      customernumber: '1234',
    };
    const initResult = await init(givenAuthData);
    expect(initResult).toBeDefined();
    expect(getAuthData()).toEqual({
      apiKey: givenAuthData.apikey,
      apiPassword: givenAuthData.apipassword,
      customerNumber: givenAuthData.customernumber,
      apiSessionId: initResult.responsedata.apisessionid,
    });
  });
});
