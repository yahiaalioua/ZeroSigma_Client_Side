import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelateAccountComponent } from './delate-account.component';

describe('DelateAccountComponent', () => {
  let component: DelateAccountComponent;
  let fixture: ComponentFixture<DelateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
