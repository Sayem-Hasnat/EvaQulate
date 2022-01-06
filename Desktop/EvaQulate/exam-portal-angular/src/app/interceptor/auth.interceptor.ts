import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = request;

    /* --------------------------------------------------------------------------- */

    /* --Get Token From Local Storage-- */
    const token = this.loginService.getToken();

    /* --Set Token in the Header For Authorized Http Request-- */
    if (token != null) {
      authRequest = authRequest.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    /* --------------------------------------------------------------------------- */

    return next.handle(authRequest);
  }
}

/* --Create This Provider So That We Can Add This In app.module.ts -> providers[] section-- */
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
