/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DistantApiScrollRequest } from '../models/distant-api-scroll-request';
import { DistantApiSearchResponse } from '../models/distant-api-search-response';

@Injectable({
  providedIn: 'root',
})
export class CrateControllerScrollService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation scroll
   */
  static readonly ScrollPath = '/scroll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scroll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scroll$Response(params: {
    context?: HttpContext
    body: DistantApiScrollRequest
  }
): Observable<StrictHttpResponse<DistantApiSearchResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CrateControllerScrollService.ScrollPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DistantApiSearchResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `scroll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scroll(params: {
    context?: HttpContext
    body: DistantApiScrollRequest
  }
): Observable<DistantApiSearchResponse> {

    return this.scroll$Response(params).pipe(
      map((r: StrictHttpResponse<DistantApiSearchResponse>) => r.body as DistantApiSearchResponse)
    );
  }

}
