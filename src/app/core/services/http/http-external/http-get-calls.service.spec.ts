import { TestBed } from '@angular/core/testing';
import { HttpStockData } from './http-stock-data';


describe('HttpGetCallsService', () => {
  let service: HttpStockData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpStockData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
