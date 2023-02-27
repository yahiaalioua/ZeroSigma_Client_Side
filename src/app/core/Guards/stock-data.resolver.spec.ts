import { TestBed } from '@angular/core/testing';

import { StockDataResolver } from './stock-data.resolver';

describe('StockDataResolver', () => {
  let resolver: StockDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StockDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
