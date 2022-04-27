import { Api } from '../src/api';
import { init } from '../src/index';

describe('exported functions', () => {
  it('should initialize correctly', async () => {
    const spy = jest.spyOn(Api, 'postJson').mockImplementation(() =>
      Promise.resolve({
        responsedata: {
          apisessionid: '123',
        },
      }),
    );
    expect(
      init({
        apikey: '',
        apipassword: '',
        customernumber: '',
      }),
    ).toBeInstanceOf(Promise);
    const apiSessionId = await init({
      apikey: '',
      apipassword: '',
      customernumber: '',
    });
    expect(apiSessionId).not.toBe('');
  });
});
