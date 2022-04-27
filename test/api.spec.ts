import { Formats } from '../src/@types/Formats';
import { ApiResponse } from '../src/@types/Responses';
import NetcupApi from '../src/api';
import { createEmptyApiResponse } from './testUtils';

describe('Api functions', () => {
  it('should set format correctly', () => {
    const api = new NetcupApi(Formats.JSON);
    expect(api.format).toBe(Formats.JSON);
  });
  it("should set default format to 'JSON'", () => {
    const api = new NetcupApi();
    expect(api.format).toBe(Formats.JSON);
  });
  it('should throw in error case', async () => {
    jest.mock('axios');
    const givenError: ApiResponse = {
      ...createEmptyApiResponse(),
      statuscode: 4010,
      longmessage: 'testError',
    };
    const api = new NetcupApi();

    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      api.axios.interceptors.response.handlers[0].fulfilled({
        data: givenError,
      }),
    ).toThrow(givenError.longmessage);
  });
});
