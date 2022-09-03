/* tslint:disable */
/* eslint-disable */
import { Passage } from './passage';
export interface DistantApiSearchResponse {

  /**
   * / count
   */
  count: number;
  has_more: boolean;
  passages: Array<Passage>;

  /**
   * / optional scroll_id
   */
  scroll_id?: string;
}
