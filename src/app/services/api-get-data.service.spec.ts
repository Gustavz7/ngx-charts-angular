import { TestBed } from '@angular/core/testing';

import { ApiGetDataService } from './api-get-data.service';

describe('ApiGetDataService', () => {
  let service: ApiGetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
