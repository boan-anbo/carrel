/* tslint:disable */
/* eslint-disable */
import { Document } from './document';
export interface Passage {

  /**
   * passage description
   */
  description: string;
  document: Document;

  /**
   * location, e.g. page number or url
   */
  location: string;

  /**
   * passage text
   */
  text: string;

  /**
   * id
   */
  uuid: string;
}
