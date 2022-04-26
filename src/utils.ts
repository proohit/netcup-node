import { Formats } from './@types/Formats';
import { BASE_URL } from './constants';

export function getFormattedUrl(format: Formats): string {
  return `${BASE_URL}?${format}`;
}
