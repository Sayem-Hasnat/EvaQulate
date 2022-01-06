import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-schedule',
  templateUrl: './quiz-schedule.component.html',
  styleUrls: ['./quiz-schedule.component.css'],
})
export class QuizScheduleComponent implements OnInit {
  public quizTitle: string;
  
  public minDate = new Date();
  public ProcessDate;

  public quizSchedule = {
    quizId: '',

    date: '',

    startTime: '',

    endTime: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizSchedule.quizId = this.activeRoute.snapshot.params.quizId;
    this.quizTitle = this.activeRoute.snapshot.params.title;
  }
  /* --------------------------------------------------------------------- */
  public quizScheduleSubmit() {
    if (
      this.ProcessDate != '' &&
      this.quizSchedule.startTime != '' &&
      this.quizSchedule.endTime != '' &&
      this.ProcessDate != null &&
      this.quizSchedule.startTime != null &&
      this.quizSchedule.endTime != null
    ) {
      /* --Convert Date in Correct Format-- */
      this.quizSchedule.date = new Date(this.ProcessDate).toDateString();
      this.quizService.setQuizSchedule(this.quizSchedule).subscribe(
        (response: any) => {
          Swal.fire('Successful', response.message, 'success');
          this.router.navigate(['teacher/quizzes']);
        },
        (error) => {
          this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Set All The Fields Correctly !  !  !  !', 'Close', {
        duration: 3000,
      });
    }
  }
  /* ------------------------------------------------------------------------- */
}
