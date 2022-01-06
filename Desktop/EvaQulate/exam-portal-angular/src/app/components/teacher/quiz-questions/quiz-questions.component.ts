import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css'],
})
export class QuizQuestionsComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public quizId: number;
  public quizTitle: string;
  public questions = [];

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this.activeRoute.snapshot.params.quizId;
    this.quizTitle = this.activeRoute.snapshot.params.title;

    /* -------Backend API For All Questions of a Quiz-------  */

    this.quizService.getAllQuestionsOfQuiz(this.quizId).subscribe(
      (response: any) => {
        this.questions = response;
      },
      (error: any) => {
        Swal.fire(
          'Get No Data ! ! ! !',
          'There is an Error From Server',
          'error'
        );
        console.log(error);
      }
    );
  }
  /* ---------------------------------------------------- */
  public deleteQuestion(questionId) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /* --Delete Process Execute-- */

        this.questionService.deleteQuestion(questionId).subscribe(
          (response: any) => {
            if (response.message == 'Delete') {
              /* --Filtering Questions To Remove Deleted Question For View Page-- */
              this.questions = this.questions.filter(
                (question) => question.questionId != questionId
              );
              this.snackBar.open('Delete Successfully !  !  !  !', 'Close', {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
            }
          },
          (error: any) => {
            Swal.fire(
              'Get No Data ! ! ! !',
              'There is an Error From Server',
              'error'
            );
            console.log(error);
          }
        );
      }
    });
  }
  /* ------------------------------------------------------ */
}
