import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultSheetComponent } from './quiz-result-sheet.component';

describe('QuizResultSheetComponent', () => {
  let component: QuizResultSheetComponent;
  let fixture: ComponentFixture<QuizResultSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
