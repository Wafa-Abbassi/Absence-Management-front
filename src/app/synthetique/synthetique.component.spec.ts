import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynthetiqueComponent } from './synthetique.component';

describe('SynthetiqueComponent', () => {
  let component: SynthetiqueComponent;
  let fixture: ComponentFixture<SynthetiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynthetiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynthetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
