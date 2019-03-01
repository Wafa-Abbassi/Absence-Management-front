import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreationFerieRttComponent} from './creation-ferie-rtt.component';

describe('CreationFerieRttComponent', () => {
  let component: CreationFerieRttComponent;
  let fixture: ComponentFixture<CreationFerieRttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreationFerieRttComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationFerieRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
