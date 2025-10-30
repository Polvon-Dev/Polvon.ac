import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUsers = new BehaviorSubject<any[]>([]);
  currentSignUpUsers = this.signUpUsers.asObservable();

  updateUsers(user: any[]) {
    this.signUpUsers.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
