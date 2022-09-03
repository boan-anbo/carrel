/* tslint:disable */
/* eslint-disable */

/**
 * The greeting service definition.
 */
export interface ApiError {

  /**
   * / code
   */
  code: string;

  /**
   * / message
   */
  message: string;

  /**
   * / payload for user
   */
  payload_for_user: string;
  suggestion: string;

  /**
   * / user payload
   */
  user_payload: string;
}
