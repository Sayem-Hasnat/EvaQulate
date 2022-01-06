import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  registration(data: any) {
    return this.httpClient.post(`${baseUrl}/registration/`, data);
  }
}
