import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaterTasksComponent } from './later-tasks.component';

describe('LaterTasksComponent', () => {
  let component: LaterTasksComponent;
  let fixture: ComponentFixture<LaterTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaterTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaterTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
