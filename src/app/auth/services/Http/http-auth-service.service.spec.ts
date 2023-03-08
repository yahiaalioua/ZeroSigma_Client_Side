import { TestBed } from '@angular/core/testing';

import { HttpAuthServiceService } from './http-auth-service.service';

describe('HttpAuthServiceService', () => {
  let service: HttpAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
