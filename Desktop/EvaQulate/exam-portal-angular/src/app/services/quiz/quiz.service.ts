import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpClient: HttpClient) {}

  /* --------------------------------------------------------------- */

  public getQuizByCode(code) {
    return this.httpClient.get(`${baseUrl}/quiz/find-quiz/${code}`);
  }

  /* --------------------------------------------------------------- */

  public getAllActiveQuizzes() {
    return this.httpClient.get(`${baseUrl}/quiz/active-quizzes`);
  }

  /* --------------------------------------------------------------- */

  public getTeacherAllQuizzes(username: string) {
    return this.httpClient.get(`${baseUrl}/quiz/teacher-quizzes/${username}`);
  }

  /* --------------------------------------------------------------- */

  public addQuiz(quiz) {
    return this.httpClient.post(`${baseUrl}/quiz/`, quiz);
  }

  /* --------------------------------------------------------------- */

  public deleteQuiz(quizId: any) {
    return this.httpClient.delete(`${baseUrl}/quiz/delete/${quizId}`);
  }

  /* --------------------------------------------------------------- */

  public updateQuizType(quiz: any) {
    return this.httpClient.put(`${baseUrl}/quiz/update-type`, quiz);
  }

  /* --------------------------------------------------------------- */

  public updateQuizVisibility(quiz: any) {
    return this.httpClient.put(`${baseUrl}/quiz/update-visibility`, quiz);
  }

  /* --------------------------------------------------------------- */

  setQuizSchedule(quizSchedule) {
    return this.httpClient.put(`${baseUrl}/quiz/schedule`, quizSchedule);
  }

  /* --------------------------------------------------------------- */

  getAllQuestionsOfQuiz(quizId: number) {
    return this.httpClient.get(`${baseUrl}/quiz/questions/${quizId}`);
  }

  /* --------------------------------------------------------------- */

  getQuizInformation(quizId: number) {
    return this.httpClient.get(`${baseUrl}/quiz/get-quiz/${quizId}`);
  }

  /* --------------------------------------------------------------- */

  getQuizQuestionsForExam(quizId: number) {
    return this.httpClient.get(`${baseUrl}/quiz/start/${quizId}`);
  }

  /* --------------------------------------------------------------- */
  public submitQuizExam(quiz, username) {
    return this.httpClient.post(`${baseUrl}/quiz/submit/${username}`, quiz);
  }
  /* --------------------------------------------------------------- */

  public getQuizExamResult(submitQuizId) {
    return this.httpClient.get(`${baseUrl}/quiz/result/${submitQuizId}`);
  }
  /* --------------------------------------------------------------- */
  public disableQuizAfterExam(quizId) {
    return this.httpClient.get(`${baseUrl}/quiz/disable-quiz/${quizId}`);
  }
  /* --------------------------------------------------------------- */
  public getQuizParticipantsResult(quizId) {
    return this.httpClient.get(
      `${baseUrl}/quiz/quiz-participant-result/${quizId}`
    );
  }
  /* --------------------------------------------------------------- */
  getQuizParticipantsResultPdf(quizId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(
      `${baseUrl}/quiz/quiz-participant-result-pdf/${quizId}`,
      { headers: headers, responseType: 'blob' }
    );
  }
}
