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
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('signUpUsers');
    this.savedArr = saved ? JSON.parse(saved) : [];
  }

  loginObj: any = {
    email: '',
  };

  onLogin() {
    const isUser = this.savedArr.find((user: any) => user.email === this.loginObj.email);
    if (isUser) {
      localStorage.setItem('isUser', JSON.stringify(isUser));
      window.location.reload();

      if (isUser.role === 'teacher') {
        this.router.navigate(['/teacherDashboard']);
      } else if (isUser.role === 'student') {
        this.router.navigate(['/studentDashboard']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      alert("Noto'g'ri email");
    }
  }
}
