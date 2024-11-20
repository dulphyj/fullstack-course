import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../common/user';
import { UserType } from '../../../common/user-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.component.html',
  styleUrl: './registraion.component.css'
})
export class RegistraionComponent implements OnInit {
  username: string = '';
  surname: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';
  password: string = '';
  userType: string = '';
  
  ngOnInit(): void {
  }

  constructor(private authentication: AuthenticationService, private router:Router, private toastr:ToastrService) { }

  register() {
    this.username = this.email;
    this.userType = UserType.USER;
    let user = new User(0, this.username, this.surname, this.email, this.address, this.cellphone, this.password, this.userType);
    console.log(user);
    this.authentication.register(user).subscribe(data => {
      this.toastr.success("Successfully registered");
      console.log(data);
      this.router.navigate(['user/login']);
    });
  }
}
