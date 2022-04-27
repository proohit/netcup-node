import { Formats } from './@types/Formats';

export const BASE_URL =
  'https://ccp.netcup.net/run/webservice/servers/endpoint.php';

export const defaultFormat = Formats.JSON;

export const NOT_INITIALIZED_ERROR = 'Not initialized. Call init() first.';

export const INVALID_FORMAT_ERROR = `Invalid format. Valid formats are: ${Object.values(
  Formats,
).join(', ')}`;
