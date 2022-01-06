import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnswerSheetComponent } from './student-answer-sheet.component';

describe('StudentAnswerSheetComponent', () => {
  let component: StudentAnswerSheetComponent;
  let fixture: ComponentFixture<StudentAnswerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAnswerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
