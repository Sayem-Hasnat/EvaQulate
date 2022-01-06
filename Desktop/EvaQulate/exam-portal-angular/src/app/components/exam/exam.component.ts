import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

interface Question {
  questionId: number;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  givenAnswer: string;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  public time: any;
  public stopTime: any;
  public quizTime: any;

  public quiz = {
    quizId: 0,
    title: '',
    description: '',
    numberOfQuestion: 0,
    maxMarks: 0,
    quizTime: 0,
    remainingTime: 0,
    submitQuestionDtoList: [],
  };

  questionList: Question[] = [];
  public username: any;

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private loginService: LoginService,
    private router: Router,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit(): void {
    this.preventBrowserBackButton();
    this.quiz.quizId = this.activeRoute.snapshot.params.quizId;
    this.username = this.loginService.getUserDetails().username;
    this.loadQuestion();
  }

  /* ------------------------------------------------------------ */
  preventBrowserBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
  /* ------------------------------------------------------------ */
  loadQuestion() {
    this.quizService.getQuizQuestionsForExam(this.quiz.quizId).subscribe(
      (response: any) => {
        this.quiz = response;
        this.questionList = response.questionDtoList;
        this.time = response.remainingTime / 1000;
        this.quizTime = response.quizTime / 1000;
        this.timer();
      },
      (error: any) => {
        this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  /* ------------------------------------------------------------ */

  submitExam() {
    Swal.fire({
      title: 'Are you sure?',
      text: "If You Submit the Quiz You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit Quiz',
    }).then((result) => {
      if (result.isConfirmed) {

        /* Stop Timer */
        clearInterval(this.stopTime);


        /* If Any Question Not Answered */
        this.questionList.forEach((question) => {
          if (question.givenAnswer == null) {
            question.givenAnswer = 'Not Submit';
          }
        });

        this.quiz.submitQuestionDtoList = this.questionList;

        /* Send To Server */
        this.quizService.submitQuizExam(this.quiz, this.username).subscribe(
          (response: any) => {
            if (response.submitQuizId > 0) {
              this.router.navigate([
                'exam-submit/' +
                  response.submitQuizId +
                  '/' +
                  (response.maxMarks / response.numberOfQuestion) *
                    response.totalCorrectAnswer,
              ]);
              Swal.fire(
                'Sucessful!',
                'Your Quiz Submit Successfully.',
                'success'
              );
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops Quiz Not Submit...',
                text: 'Something went wrong!',
              });
            }
          },
          (error: any) => {
            this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
  /* ------------------------------------------------------------ */
  examAutoSubmit() {
    /* If Any Question Not Answered */
    this.questionList.forEach((question) => {
      if (question.givenAnswer == null) {
        question.givenAnswer = 'Not Submit';
      }
    });

    this.quiz.submitQuestionDtoList = this.questionList;

    /* Send To Server */
    this.quizService.submitQuizExam(this.quiz, this.username).subscribe(
      (response: any) => {
        if (response.submitQuizId > 0) {
          this.router.navigate([
            'exam-submit/' +
              response.submitQuizId +
              '/' +
              (response.maxMarks / response.numberOfQuestion) *
                response.totalCorrectAnswer,
          ]);
          Swal.fire(
            'Time Is Over!',
            'Your Quiz Submit Successfully.',
            'success'
          );

          /* ---------Disable Quiz------- */
          this.quizService.disableQuizAfterExam(this.quiz.quizId).subscribe(
            (response: any) => {
              console.log(response);
            },
            (error: any) => {
              console.log(error);
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops Quiz Not Submit...',
            text: 'Something went wrong!',
          });
        }
      },
      (error: any) => {
        this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  /* ------------------------------------------------------------ */

  timer() {
    this.stopTime = window.setInterval(() => {
      if (this.time <= 0) {
        this.examAutoSubmit();
        clearInterval(this.stopTime);
      } else {
        this.time--;
      }
    }, 1000);
  }

  /* ------------------------------------------------------------ */

  getFormatedTime() {
    let m = Math.floor(this.time / 60);
    let s = this.time - m * 60;
    return `${m} Min : ${s} Sec.`;
  }

  /* ------------------------------------------------------------ */
}
