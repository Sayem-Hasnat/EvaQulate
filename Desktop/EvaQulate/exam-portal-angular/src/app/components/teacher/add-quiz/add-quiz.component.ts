import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoginService } from 'src/app/services/login/login.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  public quiz = {
    title: '',
    description: '',
    numberOfQuestion: '',
    maxMarks: '',
    createdBy: '',
    code: '',
    isPublic: false,
    categoryDto: {
      categoryId: '',
    },
  };

  public categories = [];

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private categoryService: CategoryService,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    /* --Backend API For All Category-- */
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

    /* --Username Assign-- */
    this.quiz.createdBy = this.loginService.getUserDetails().username;
  }

  /* --------------------------------------------------------------------------- */

  quizSubmit() {
    if (
      this.quiz.title != '' &&
      this.quiz.description != '' &&
      this.quiz.numberOfQuestion != '' &&
      this.quiz.numberOfQuestion != '' &&
      this.quiz.maxMarks != '' &&
      this.quiz.categoryDto.categoryId != '' &&
      this.quiz.title != null &&
      this.quiz.description != null &&
      this.quiz.numberOfQuestion != null &&
      this.quiz.maxMarks != null &&
      this.quiz.categoryDto.categoryId != null
    ) {
      this.quizService.addQuiz(this.quiz).subscribe(
        (response: any) => {
          Swal.fire('Save Successfully!', 'Create a New Quiz', 'success');
          this.router.navigate(['teacher/quizzes']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }

  /* ---------------------------------------------------------------------------- */
}
