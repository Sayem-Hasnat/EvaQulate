import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css'],
})
export class ShowCategoryComponent implements OnInit {
  categories = [];

  userRole: string = '';

  constructor(
    private loginService: LoginService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();

    /* --Backend API-- */
    this.categoryService.getAllCategory().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error: any) => {
        Swal.fire(
          'Get No Data ! ! ! !',
          'There is an Error From Server',
          'error'
        );
        console.log(error);
      }
    );
  }
  /* -------------------------------------------------------- */
}
