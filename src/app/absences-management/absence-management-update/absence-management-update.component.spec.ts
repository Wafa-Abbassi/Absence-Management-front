import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsenceManagementUpdateComponent} from './absence-management-update.component';

describe('AbsenceManagementUpdateComponent', () => {
  let component: AbsenceManagementUpdateComponent;
  let fixture: ComponentFixture<AbsenceManagementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceManagementUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
