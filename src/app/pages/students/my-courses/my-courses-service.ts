import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyCoursesService {
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();
  teacherId!: number;
  user: any;
  loading = true;
  constructor(private http: HttpClient) {}

  getCourses() {
    const user = JSON.parse(localStorage.getItem('isUser') || '{}');
    this.teacherId = user?.teacherId;

    this.http.get(`http://localhost:3000/courses?teacherId=${this.teacherId}`).subscribe({
      next: (data: any) => {
        this.coursesSubject.next(data);
        this.loading = false;
      },
    });
  }
}
