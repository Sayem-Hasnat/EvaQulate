import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  /* --------------------------------------------------------------- */

  public deleteQuestion(questionId: any) {
    return this.httpClient.delete(`${baseUrl}/question/delete/${questionId}`);
  }

  /* --------------------------------------------------------------- */

  public addQuestion(question: any) {
    return this.httpClient.post(`${baseUrl}/question/`, question);
  }

  /* --------------------------------------------------------------- */
}
