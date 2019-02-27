import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRepFormComponent } from './set-rep-form.component';

describe('SetRepFormComponent', () => {
  let component: SetRepFormComponent;
  let fixture: ComponentFixture<SetRepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
