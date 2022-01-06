import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /* --Is Logged in or Not-- */
    if (this.loginService.isLoggedIn()) {
      /* --Is Authorized or Not-- */
      if (this.loginService.getUserRole() == 'STUDENT') {
        return true;
      } else {
        this.router.navigate(['401']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
