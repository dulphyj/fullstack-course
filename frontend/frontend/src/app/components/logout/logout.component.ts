import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private sessionStorage: SessionStorageService, private router: Router) { }
  ngOnInit(): void {
    console.log('logout '+this.sessionStorage.getItem('token'));
    this.sessionStorage.removeItem('token');
    console.log('logout eliminado'+this.sessionStorage.getItem('token'));
    this.router.navigate(['/']);
  }

}
