import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { UserInterface } from '../user-interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StudentEnrolledService } from '../../student-enrolled/student-enrolled-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register implements OnInit {
  teacherId: any;
  signUpUsers: any[] = [];
  signUpobj: UserInterface = {
    firstName: 'Polvonboy',
    lastName: 'Abdirimov',
    email: 'polvonboyabdirimov13@gmail.com',
    role: 'student',
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private studentEnrolledService: StudentEnrolledService
  ) {}

  ngOnInit(): void {}
  onSignUp() {
    if (
      !this.signUpobj.firstName ||
      !this.signUpobj.email ||
      !this.signUpobj.lastName ||
      !this.signUpobj.role
    ) {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
      return;
    }
    const newUser = {
      ...this.signUpobj,
      teacherId: Date.now(),
    };

    this.http.post<any>('http://localhost:3000/users', newUser).subscribe({
      next: () => {
        this.router.navigate(['/login']);

        (this.signUpobj.firstName = ' '),
          (this.signUpobj.lastName = ''),
          (this.signUpobj.email = '');
      },
    });

    this.signUpUsers.push(newUser);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signUpUsers));
  }
}
