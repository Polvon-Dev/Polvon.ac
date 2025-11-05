import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentEnrolledService {
  teacherCourses: any[] = [];
  student: any[] = [];
  Courses: any[] = [];
  user: any;
  teacherId!: number;
  constructor(private http: HttpClient) {
    this.loadUser();
    // this.getCourses();
  }
  loadUser() {
    const parsed = localStorage.getItem('signUpUsers');
    if (parsed) {
      const users = JSON.parse(parsed);
      this.user = Array.isArray(users) ? users[users.length - 1] : users;
      this.teacherId = Number(this.user.teacherId);
    }
  }

  // getCourses() {
  //   this.http.get('http://localhost:3000/courses').subscribe({
  //     next: (data: any) => {
  //       this.Courses = data;
  //       this.teacherCourses = this.Courses.filter((course) => course.teacherId === this.teacherId);
  //     },
  //   });
  // }
}
