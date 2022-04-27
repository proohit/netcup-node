import { Formats } from '../src/@types/Formats';
import { NetcupAuth } from '../src/@types/NetcupAuth';
import { BASE_URL } from '../src/constants';
import { getFormattedUrl, missingAuth } from '../src/utils';

describe('utils', () => {
  describe('getFormattedUrl', () => {
    it('should return the correct url', () => {
      expect(getFormattedUrl(Formats.JSON)).toBe(`${BASE_URL}?JSON`);
    });
  });

  describe('missingAuth', () => {
    it('should return false if all auth data is present', () => {
      const authData: NetcupAuth = {
        apiKey: 'testKey',
        apiPassword: 'testPw',
        customerNumber: 'testNo',
        apiSessionId: 'testSession',
      };
      expect(missingAuth(authData)).toBeFalsy();
    });
    it('should correctly check missing auth on everything empty', () => {
      const givenAuth: NetcupAuth = {
        apiKey: '',
        apiPassword: '',
        customerNumber: '',
        apiSessionId: '',
      };
      expect(missingAuth(givenAuth)).toBeTruthy();
    });

    it('should correctly check missing auth on everything empty except apiSessionId', () => {
      const givenAuth: NetcupAuth = {
        apiKey: '',
        apiPassword: '',
        customerNumber: '',
        apiSessionId: 'testSession',
      };
      expect(missingAuth(givenAuth)).toBeTruthy();
    });

    it('should correctly check missing auth on everything empty except apiKey', () => {
      const givenAuth: NetcupAuth = {
        apiKey: 'testKey',
        apiPassword: '',
        customerNumber: '',
        apiSessionId: '',
      };
      expect(missingAuth(givenAuth)).toBeTruthy();
    });

    it('should correctly check missing auth on everything empty except apiPassword', () => {
      const givenAuth: NetcupAuth = {
        apiKey: '',
        apiPassword: 'testPw',
        customerNumber: '',
        apiSessionId: '',
      };
      expect(missingAuth(givenAuth)).toBeTruthy();
    });

    it('should correctly check missing auth on everything empty except customerNumber', () => {
      const givenAuth: NetcupAuth = {
        apiKey: '',
        apiPassword: '',
        customerNumber: '1234',
        apiSessionId: '',
      };
      expect(missingAuth(givenAuth)).toBeTruthy();
    });
  });
});
