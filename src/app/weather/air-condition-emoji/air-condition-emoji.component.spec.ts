import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditionEmojiComponent } from './air-condition-emoji.component';

describe('AirConditionEmojiComponent', () => {
  let component: AirConditionEmojiComponent;
  let fixture: ComponentFixture<AirConditionEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirConditionEmojiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirConditionEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
