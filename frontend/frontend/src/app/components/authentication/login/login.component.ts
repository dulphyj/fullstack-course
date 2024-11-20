import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  ngOnInit(): void {
  }

  constructor(private authenticationService: AuthenticationService, private sessionStorage: SessionStorageService, private router: Router){}
  
  login(){
    let userDto = new Userdto(this.username, this.password);
    this.authenticationService.login(userDto).subscribe(data =>{
      console.log(data)
      this.sessionStorage.setItem('token', data);
      if(data.type == 'ADMIN'){
        this.router.navigate(['admin/products']);
      } else{
        this.router.navigate(['/']);
      }
    }
      
    );
    console.log(userDto);
  }

}
