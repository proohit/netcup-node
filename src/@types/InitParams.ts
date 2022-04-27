import { Formats } from './Formats';
import { LoginParam } from './Requests';

export interface InitParams extends LoginParam {
  format?: Formats;
}
