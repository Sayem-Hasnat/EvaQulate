import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css'],
})
export class ShowQuizzesComponent implements OnInit {
  public quizzes = [];

  username: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUserDetails().username;

    /* --Backend API-- */
    this.quizService.getTeacherAllQuizzes(this.username).subscribe(
      (response: any) => {
        this.quizzes = response;
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
  /* --------------------------------------------------------------------------------- */
  deleteQuiz(quizId) {
    Swal.fire({
      icon: 'warning',
      title: 'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        /* --Delete Process Execute-- */

        this.quizService.deleteQuiz(quizId).subscribe(
          (response: any) => {
            if (response.message == 'Delete') {
              /* --Filtering Quizzes To Remove Deleted Quiz For View Page-- */
              this.quizzes = this.quizzes.filter(
                (quiz) => quiz.quizId != quizId
              );

              Swal.fire('Successful ! ! ! !', 'Delete Quiz', 'success');
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
  /* --------------------------------------------------------------------------------- */
  updateQuizType(quizId) {
    let quiz = this.quizzes.find((quiz) => quiz.quizId == quizId);

    this.quizService.updateQuizType(quiz).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  /* --------------------------------------------------------------------------------- */
  updateQuizVisibility(quizId) {
    let quiz = this.quizzes.find((quiz) => quiz.quizId == quizId);

    this.quizService.updateQuizVisibility(quiz).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  /* --------------------------------------------------------------------------------- */
  setQuizSchedule(quizId, title) {
    let quiz = this.quizzes.find((quiz) => quiz.quizId == quizId);
    this.router.navigate([
      'teacher/quiz-schedule/' + quiz.quizId + '/' + quiz.title,
    ]);
  }
  /* --------------------------------------------------------------------------------- */
  showQuizSchedule(quizId) {
    let quiz = this.quizzes.find((quiz) => quiz.quizId == quizId);
    Swal.fire(quiz.date, quiz.startTime + ' - ' + quiz.endTime, 'info');
  }
  /* --------------------------------------------------------------------------------- */

  public codeCopyNotification() {
    this.snackBar.open('Quiz Code Copied ! ! !', 'Close', {
      duration: 3000,
    });
  }

  /* --------------------------------------------------------------------------------- */
}
