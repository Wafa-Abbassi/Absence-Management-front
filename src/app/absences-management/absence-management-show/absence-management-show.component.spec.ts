import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsenceManagementShowComponent} from './absence-management-show.component';

describe('AbsenceManagementShowComponent', () => {
  let component: AbsenceManagementShowComponent;
  let fixture: ComponentFixture<AbsenceManagementShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceManagementShowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceManagementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
