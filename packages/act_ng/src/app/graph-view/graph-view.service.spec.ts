import { TestBed } from '@angular/core/testing';

import { GraphViewService } from './graph-view.service';

describe('GraphViewService', () => {
  let service: GraphViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
