import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarContainerCompComponent } from './nav-bar-container-comp.component';

describe('NavBarContainerCompComponent', () => {
  let component: NavBarContainerCompComponent;
  let fixture: ComponentFixture<NavBarContainerCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarContainerCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarContainerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
