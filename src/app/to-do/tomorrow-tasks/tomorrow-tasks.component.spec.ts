import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomorrowTasksComponent } from './tomorrow-tasks.component';

describe('TomorrowTasksComponent', () => {
  let component: TomorrowTasksComponent;
  let fixture: ComponentFixture<TomorrowTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomorrowTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomorrowTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
