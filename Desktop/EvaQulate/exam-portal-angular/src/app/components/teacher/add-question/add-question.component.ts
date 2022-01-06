import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public Editor = ClassicEditor;

  public quizTitle: string;

  public question = {
    quizId: '',

    content: '',

    option1: '',

    option2: '',

    option3: '',

    option4: '',

    answer: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.question.quizId = this.activeRoute.snapshot.params.quizId;
    this.quizTitle = this.activeRoute.snapshot.params.title;
  }
  /* ------------------------------------- */

  public questionSubmit() {
    if (
      this.question.content != '' &&
      this.question.option1 != '' &&
      this.question.option2 != '' &&
      this.question.option3 != '' &&
      this.question.option4 != '' &&
      this.question.answer != '' &&
      this.question.content != null &&
      this.question.option1 != null &&
      this.question.option2 != null &&
      this.question.option3 != null &&
      this.question.option4 != null &&
      this.question.answer != null
    ) {
      this.questionService.addQuestion(this.question).subscribe(
        (response: any) => {
          if (response.message == 'Save') {
            this.snackBar.open('Successfully Save ! ! ! !', 'Close', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          this.router.navigate([
            'teacher/quiz-questions/' +
              this.question.quizId +
              '/' +
              this.quizTitle,
          ]);
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
}
