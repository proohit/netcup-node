import { Formats } from '../src/@types/Formats';
import { ApiResponse } from '../src/@types/Responses';
import NetcupRestApi from '../src/api';
import { createEmptyApiResponse } from './testUtils';

describe('Api functions', () => {
  it('should set format correctly', () => {
    const api = new NetcupRestApi(Formats.JSON);
    expect(api.format).toBe(Formats.JSON);
  });
  it("should set default format to 'JSON'", () => {
    const api = new NetcupRestApi();
    expect(api.format).toBe(Formats.JSON);
  });
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
});
