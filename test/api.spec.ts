import { Formats } from '../src/@types/Formats';
import NetcupApi from '../src/api';

describe('Api functions', () => {
  it('should set format correctly', () => {
    const api = new NetcupApi(Formats.JSON);
    expect(api.format).toBe(Formats.JSON);
  });
  it("should set default format to 'JSON'", () => {
    const api = new NetcupApi();
    expect(api.format).toBe(Formats.JSON);
  });
});
