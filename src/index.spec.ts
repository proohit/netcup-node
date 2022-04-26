import { init } from '../src/index';

describe('init', () => {
  it('should initialize correctly', async () => {
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
    console.log(apiSessionId);
    expect(apiSessionId).not.toBe('');
  });
});
