import { AuthService } from './../auth-service';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  savedArr: any[] = [];
  loginArr: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('signUpUsers');
    if (saved) this.savedArr = JSON.parse(saved);
  }
  loginObj: any = {
    email: '',
  };

  onLogin() {
    this.loginArr.push(this.loginObj);
    const newLoginArr = this.loginArr.find((e) => e.email);

    const isUser = this.savedArr.find(({ email }) => email == newLoginArr.email);
    if (isUser) {
      localStorage.setItem('isUser', JSON.stringify(this.loginObj));
      this.router.navigate(['']);
      window.location.reload();
    } else {
      alert("Noto'g'ri email");
    }
  }
}
