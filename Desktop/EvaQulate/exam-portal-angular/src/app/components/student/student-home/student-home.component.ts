import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent implements OnInit {
  public categories = [];
  public serverQuizzes = [];

  /* --This is For Locally Process by Category-- */
  public quizzes = [];

  constructor(
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    /* --Backend API For All Categories With Quiz-- */
    this.categoryService.getAllCategory().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error: any) => {
        Swal.fire(
          'Get No Category From Server ! ! ! !',
          'There is an Error From Server',
          'error'
        );
        console.log(error);
      }
    );

    /* --Backend API For All Quiz With Category-- */
    this.quizService.getAllActiveQuizzes().subscribe(
      (response: any) => {
        this.serverQuizzes = response;
        this.quizzes = this.serverQuizzes;
      },
      (error: any) => {
        Swal.fire(
          'Get No Data From Server ! ! ! !',
          'There is an Error From Server',
          'error'
        );
        console.log(error);
      }
    );
  }

  /* -------------------------------------------------------- */
  public allQuizzesOfCategory(categoryId) {
    if (categoryId != 0) {
      this.quizzes = this.serverQuizzes.filter(
        (quiz) => quiz.categoryDto.categoryId == categoryId
      );
      if (this.quizzes.length === 0) {
        this.snackBar.open('There is no Quiz in This Category', 'Close', {
          duration: 3000,
        });
      }
    } else {
      this.quizzes = this.serverQuizzes;
    }
  }

  /* -------------------------------------------------------- */
  public codeCopyNotification() {
    this.snackBar.open('Quiz Code Copied ! ! !', 'Close', {
      duration: 3000,
    });
  }
}
