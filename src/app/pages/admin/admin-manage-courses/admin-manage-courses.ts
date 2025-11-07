import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-manage-courses',
  imports: [CommonModule],
  templateUrl: './admin-manage-courses.html',
  styleUrl: './admin-manage-courses.css',
})
export class AdminManageCourses {
  searchEmail!: string;
  userEmails: any[] = [];
  totalStudents: any[] = [];
  totalTeachers: any[] = [];
  latestStudents: any[] = [];
  latestTeachers: any[] = [];
  role!: 'student' | 'teacher';
  totalCourses: any[] = [];
  users: any[] = [];
  totalEnrollments: any[] = [];
  totalPrice!: number;
  courses: any[] = [];
  constructor(private http: HttpClient) {}

  deleteUser(id: number) {
    this.http.get<any[]>(`http://localhost:3000/courses`).subscribe({
      next: (data: any[]) => {
        this.courses = data;
        console.log(this.courses);

        // this.users = this.users.filter((u) => u.id !== id);

        // this.totalStudents = this.users.filter((u) => u.role === 'student');
        // this.totalTeachers = this.users.filter((u) => u.role === 'teacher');
      },
      error: (err) => console.error(err),
    });
  }
}
