import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { UserInterface } from '../user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register implements OnInit {
  signUpUsers: any[] = [];
  signUpobj: UserInterface = {
    firstName: 'Polvonboy',
    lastName: 'Abdirimov',
    email: 'polvonboyabdirimov13@gmail.com',
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // sendArr() {
  //   this.authService.updateUsers(this.signUpUsers);
  // }
  onSignUp() {
    this.signUpUsers.push(this.signUpobj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
    this.router.navigate(['/login']);
    (this.signUpobj.firstName = ' '), (this.signUpobj.lastName = ''), (this.signUpobj.email = '');
  }
}
