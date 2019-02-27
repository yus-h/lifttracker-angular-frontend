import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineItemComponent } from './routine-item.component';

describe('RoutineItemComponent', () => {
  let component: RoutineItemComponent;
  let fixture: ComponentFixture<RoutineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
