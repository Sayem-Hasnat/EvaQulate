import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  isLogin: boolean = false;
  user: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLogin = this.loginService.isLoggedIn();
    this.user = this.loginService.getUserDetails();

    this.loginService.notify.asObservable().subscribe((data) => {
      this.isLogin = this.loginService.isLoggedIn();
      this.user = this.loginService.getUserDetails();
    });
  }

  /* ---------------------------------------- */
  public customLink(user: any) {
    if (user.roleList[0] === 'ADMIN') {
      return ['admin'];
    } else if (user.roleList[0] === 'TEACHER') {
      return ['teacher'];
    }else{
      return ['student'];
    }
  }
  /* ---------------------------------------- */
  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
  /* ---------------------------------------- */
}
