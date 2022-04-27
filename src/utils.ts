import { Formats } from './@types/Formats';
import { NetcupAuth } from './@types/NetcupAuth';
import { BASE_URL } from './constants';

export function getFormattedUrl(format: Formats): string {
  return `${BASE_URL}?${format}`;
}

export function missingAuth(authData: NetcupAuth) {
  return (
    authData.apiKey === '' ||
    authData.apiPassword === '' ||
    authData.customerNumber === '' ||
    authData.apiSessionId === ''
  );
}
