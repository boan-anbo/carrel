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

import { DistantApiSearchRequest } from '../models/distant-api-search-request';
import { DistantApiSearchResponse } from '../models/distant-api-search-response';

@Injectable({
  providedIn: 'root',
})
export class CrateControllerSearchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation search
   */
  static readonly SearchPath = '/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  search$Response(params: {
    context?: HttpContext
    body: DistantApiSearchRequest
  }
): Observable<StrictHttpResponse<DistantApiSearchResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CrateControllerSearchService.SearchPath, 'post');
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
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  search(params: {
    context?: HttpContext
    body: DistantApiSearchRequest
  }
): Observable<DistantApiSearchResponse> {

    return this.search$Response(params).pipe(
      map((r: StrictHttpResponse<DistantApiSearchResponse>) => r.body as DistantApiSearchResponse)
    );
  }

}
