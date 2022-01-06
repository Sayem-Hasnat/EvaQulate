import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-student-answer-sheet',
  templateUrl: './student-answer-sheet.component.html',
  styleUrls: ['./student-answer-sheet.component.css']
})
export class StudentAnswerSheetComponent implements OnInit {
  public submitQuizId: any;
  public quizTitle: any;
  public marks: any;
  public questions = [];

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.submitQuizId = this.activeRoute.snapshot.params.submitQuizId;

    this.quizService.getQuizExamResult(this.submitQuizId).subscribe(
      (response: any) => {
        this.quizTitle = response.title;
        this.marks = (response.maxMarks/response.numberOfQuestion) * response.totalCorrectAnswer;
        this.questions = response.submitQuestionDtoList;
      },
      (error: any) => {
        this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
