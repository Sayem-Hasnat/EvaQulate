import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-submit-exam',
  templateUrl: './submit-exam.component.html',
  styleUrls: ['./submit-exam.component.css'],
})
export class SubmitExamComponent implements OnInit {
  public submitQuizId: any;
  public marks: any;
  locationStrategy: any;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.submitQuizId = this.activeRoute.snapshot.params.submitQuizId;
    this.marks = this.activeRoute.snapshot.params.marks;
    this.preventBrowserBackButton();
  }

  preventBrowserBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
}
