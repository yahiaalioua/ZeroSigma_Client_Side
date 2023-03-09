import { TestBed } from '@angular/core/testing';

import { HttpGetCallsService } from './http-get-calls.service';

describe('HttpGetCallsService', () => {
  let service: HttpGetCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGetCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
