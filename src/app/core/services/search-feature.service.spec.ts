import { TestBed } from '@angular/core/testing';

import { SearchFeatureService } from './search-feature.service';

describe('SearchFeatureService', () => {
  let service: SearchFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
