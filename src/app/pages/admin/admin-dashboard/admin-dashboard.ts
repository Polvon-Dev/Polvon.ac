import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Courses } from '../../courses/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  totalStudents: any[] = [];
  totalTeachers: any[] = [];
  latestStudents: any[] = [];
  latestTeachers: any[] = [];
  role!: 'student' | 'teacher';
  totalCourses: any[] = [];
  users: any[] = [];
  totalEnrollments: any[] = [];
  totalPrice!: number;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
    this.getCourses();
    this.getEnrollments();
  }

  getUsers() {
    this.http.get<any>(`http://localhost:3000/users`).subscribe({
      next: (data: any) => {
        this.users = data;
        this.totalStudents = this.users.filter((d) => d.role == 'student');
        this.totalTeachers = this.users.filter((d) => d.role == 'teacher');
        // if (this.totalStudents?.length || this.totalTeachers?.length) this.getLatestUser();
      },
    });
  }

  // getLatestUser() {
  //   this.latestStudents = this.totalStudents.splice(-6);
  //   this.latestTeachers = this.totalTeachers.splice(-6);
  // }

  getCourses() {
    this.http.get<any[]>('http://localhost:3000/courses').subscribe({
      next: (courses: any[]) => {
        this.totalCourses = courses;
        if (this.totalEnrollments.length) this.getTotalPrice();
      },
    });
  }
  getEnrollments() {
    this.http.get<any[]>('http://localhost:3000/studentEnrollments').subscribe({
      next: (enrollments: any[]) => {
        this.totalEnrollments = enrollments;
        if (this.totalCourses.length) this.getTotalPrice();
      },
    });
  }

  getTotalPrice() {
    let total = 0;

    for (let course of this.totalCourses) {
      const enrolledCount = this.totalEnrollments.filter((d: any) => d.courseId).length;

      total += (course.price || 0) * enrolledCount;

      this.totalPrice = total;
    }
  }
}
