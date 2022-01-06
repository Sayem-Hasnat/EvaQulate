import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  /* --------------------------------------------------------------- */

  public getAllCategory() {
    return this.httpClient.get(`${baseUrl}/category/all-category`);
  }

  /* --------------------------------------------------------------- */

  public addCategory(category) {
    return this.httpClient.post(`${baseUrl}/category/`, category);
  }

  /* --------------------------------------------------------------- */
}
