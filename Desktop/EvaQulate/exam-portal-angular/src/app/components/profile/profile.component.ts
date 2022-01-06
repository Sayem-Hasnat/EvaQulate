import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUserDetails();
  }
}
