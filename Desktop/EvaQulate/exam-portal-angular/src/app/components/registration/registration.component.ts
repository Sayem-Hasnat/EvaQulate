import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public data = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    mobile: '',
    userType: 'student',
  };

  constructor(
    private snackBar: MatSnackBar,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /* -------------------------------------------------------------------------------------------- */
  userDataSubmit() {
    if (
      this.data.username != '' &&
      this.data.password != '' &&
      this.data.firstName != '' &&
      this.data.lastName != '' &&
      this.data.email != '' &&
      this.data.mobile != '' &&
      this.data.username != null &&
      this.data.password != null &&
      this.data.firstName != null &&
      this.data.lastName != null &&
      this.data.email != null &&
      this.data.mobile != null
    ) {
      this.registrationService.registration(this.data).subscribe(
        (response: any) => {
          if (response.message == 'Username Already Used') {
            this.snackBar.open('Username Already Used', 'Close', {
              duration: 3000,
            });
          } else {
            Swal.fire('Save Successfully!', 'Now Login Please!', 'success');
            this.router.navigate(['login']);
          }
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Fail Operation !  !  !  !', 'Close', {
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
