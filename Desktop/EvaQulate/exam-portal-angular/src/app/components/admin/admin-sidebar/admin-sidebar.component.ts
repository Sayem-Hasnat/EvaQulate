import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
