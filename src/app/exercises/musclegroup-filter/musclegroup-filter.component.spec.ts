import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclegroupFilterComponent } from './musclegroup-filter.component';

describe('MusclegroupFilterComponent', () => {
  let component: MusclegroupFilterComponent;
  let fixture: ComponentFixture<MusclegroupFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusclegroupFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusclegroupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
