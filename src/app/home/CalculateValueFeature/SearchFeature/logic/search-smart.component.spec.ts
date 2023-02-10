import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSmartComponent } from './search-smart.component';

describe('SearchSmartComponent', () => {
  let component: SearchSmartComponent;
  let fixture: ComponentFixture<SearchSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSmartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
