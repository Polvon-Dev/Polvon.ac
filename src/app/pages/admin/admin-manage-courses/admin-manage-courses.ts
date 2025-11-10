import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage-courses',
  imports: [CommonModule],
  templateUrl: './admin-manage-courses.html',
  styleUrl: './admin-manage-courses.css',
})
export class AdminManageCourses implements OnInit {
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
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.getCourses();
  }
  getCourses() {
    this.http.get<any[]>('http://localhost:3000/courses').subscribe({
      next: (courses: any[]) => {
        this.totalCourses = courses;

        if (this.totalEnrollments.length) this.getTotalPrice();
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
  // onEdit(course: any) {
  //   this.router.navigate(['/editCourse', course.id]);
  // }
  deleteUser(id: number) {
    this.http.delete<any[]>(`http://localhost:3000/courses/${id}`).subscribe({
      next: () => {
        this.totalCourses = this.totalCourses.filter((u) => u.id !== id);
      },
      error: (err) => console.error(err),
    });
  }
}
