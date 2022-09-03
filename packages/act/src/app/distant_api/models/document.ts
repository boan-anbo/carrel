/* tslint:disable */
/* eslint-disable */
import { File } from './file';
import { Person } from './person';

/**
 * / An abstract document.
 */
export interface Document {

  /**
   * / archive location
   */
  archive_location: string;

  /**
   * / citation information
   */
  citation: string;

  /**
   * / created date
   */
  created: number;
  creators: Array<Person>;

  /**
   * / description
   */
  description: string;
  files: Array<File>;

  /**
   * / modified date using Unix timestamp
   */
  modified: number;

  /**
   * pages protobuf number type
   */
  pages: string;

  /**
   * / publication date
   */
  publication_date: string;

  /**
   * / In the case of a Zotero Item, this is the Zotero URI.
   */
  source_id: string;

  /**
   * / Describes what the unique Id refers to.
   */
  source_id_type: string;

  /**
   * / source url, e.g. a direct link to the source, e.g. the DOI of a book or journal
   */
  source_url: string;
  title: string;

  /**
   * / Uuid of the source.
   */
  uuid: string;
}
