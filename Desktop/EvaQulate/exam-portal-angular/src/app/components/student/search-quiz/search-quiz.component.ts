import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-quiz',
  templateUrl: './search-quiz.component.html',
  styleUrls: ['./search-quiz.component.css'],
})
export class SearchQuizComponent implements OnInit {
  public quizzes = [];
  public quizCode = {
    code: '',
  };
  constructor(
    private snackBar: MatSnackBar,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {}
  /* ---------------------------------------- */
  public quizCodeSubmit() {
    this.quizzes = [];
    if (this.quizCode.code != '' && this.quizCode.code != null) {
      this.quizService.getQuizByCode(this.quizCode.code).subscribe(
        (response: any) => {
          if (response.message != 'Not Found') {
            this.quizzes.push(response);
          } else {
            this.snackBar.open('Quiz Not Found ! ! !', 'Close', {
              duration: 3000,
            });
          }
        },
        (error: any) => {
          Swal.fire('Error ! ! ! !', 'Server Error Get No data', 'error');
        }
      );
    } else {
      this.snackBar.open('Quiz Code Required ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
