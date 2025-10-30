import { AuthService } from './../auth-service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
      alert("Siz ro'yhatda mofaqiyatli o'tdingiz");
    } else {
      alert("Noto'g'ri email");
    }
  }
}
