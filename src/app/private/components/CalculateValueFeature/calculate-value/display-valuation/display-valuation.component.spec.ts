import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayValuationComponent } from './display-valuation.component';

describe('DisplayValuationComponent', () => {
  let component: DisplayValuationComponent;
  let fixture: ComponentFixture<DisplayValuationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayValuationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
