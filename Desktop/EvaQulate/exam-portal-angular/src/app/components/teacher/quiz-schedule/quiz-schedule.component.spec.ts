import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizScheduleComponent } from './quiz-schedule.component';

describe('QuizScheduleComponent', () => {
  let component: QuizScheduleComponent;
  let fixture: ComponentFixture<QuizScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
