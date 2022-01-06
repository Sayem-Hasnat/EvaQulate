import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css'],
})
export class QuizInstructionsComponent implements OnInit {
  public quizId;
  public quizTitle;

  public quiz = {
    title: '',
    description: '',
    numberOfQuestion: 0,
    maxMarks: '',
    createdBy: '',
    code: '',
    isPublic: false,
    isEnable: false,
    date: '',
    startTime: '',
    endTime: '',
    categoryDto: {
      title: '',
    },
  };

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.activeRoute.snapshot.params.quizId;
    this.quizTitle = this.activeRoute.snapshot.params.title;

    this.quizService.getQuizInformation(this.quizId).subscribe(
      (response: any) => {
        this.quiz = response;
        if (this.quiz.date == null) {
          this.quiz.date = 'No Fixed Date.';
          this.quiz.startTime = 'You Can Start any Time';
          this.quiz.endTime =
            this.quiz.numberOfQuestion * 2 + ' Minutes After Starting Exam';
        }

        console.log(this.quiz);
      },
      (error: any) => {
        this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
