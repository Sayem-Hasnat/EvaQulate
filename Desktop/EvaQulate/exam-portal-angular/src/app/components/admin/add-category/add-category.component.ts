import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  public category = {
    title: '',
    description: '',
  };

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  /* ------------------------------------------------------------------------------------------------- */
  categorySubmit() {
    if (
      this.category.title != '' &&
      this.category.description != '' &&
      this.category.title != null &&
      this.category.description != null
    ) {
      this.categoryService.addCategory(this.category).subscribe(
        (response: any) => {
          if (response.message == 'Already Exist') {
            this.snackBar.open('This Category Already Exist ! ! ! !', 'Close', {
              duration: 3000,
            });
          } else {
            Swal.fire(
              'Save Successfully!',
              'Category Add In System',
              'success'
            );
            this.router.navigate(['admin/categories']);
          }
        },
        (error: any) => {
          Swal.fire('Server Error! ! ! ! ! !', 'Sorry Try Again!', 'error');
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
  /* --------------------------------------------------------------------------------------------------- */
}
