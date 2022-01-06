import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public data = {
    username: '',
    password: '',
  };
  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------------------------- */
  userDataSubmit() {
    if (
      this.data.username != '' &&
      this.data.password != '' &&
      this.data.username != null &&
      this.data.password != null
    ) {
      this.loginService.generateToken(this.data).subscribe(
        (response: any) => {
          console.log(response); //Show Token in Inspect -> Console

          /* ------------------------------------------- */

          /* --Store Token In Local Storage (Login)-- */
          this.loginService.loginUser(response.token);

          /* ------------------------------------------- */

          /* --Show Sweet Note After Successful Login-- */
          Swal.fire(
            'Login Successful ! ! ! !',
            'Welcome to Exam Portal',
            'success'
          );
          /* ------------------------------------------- */

          this.loginService.getCurrentUserDetails().subscribe(
            (response: any) => {
              console.log(response);

              /* --Store User Details in Local Storage-- */
              this.loginService.setUserDetails(response);

              /* -------------Redirect Code---------------- */

              if (response.roleList[0] == 'ADMIN') {
                this.router.navigate(['admin']);
                this.loginService.notify.next(true); //Notify Navbar To Change it's Elements
              } else if (response.roleList[0] == 'TEACHER') {
                this.router.navigate(['teacher']);
                this.loginService.notify.next(true); //Notify Navbar To Change it's Elements
              } else if (response.roleList[0] == 'STUDENT') {
                this.router.navigate(['student']);
                this.loginService.notify.next(true); //Notify Navbar To Change it's Elements
              } else {
                this.loginService.logout();
              }

              /* ------------------------------------------ */
            },
            (error) => {
              console.warn(error);
            }
          );
          /* ------------------------------------------- */
        },
        (error) => {
          console.warn(error);
          this.snackBar.open('Bad Credentials !  !  !  !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
  /* -------------------------------------------------------------------------------------------- */
}
