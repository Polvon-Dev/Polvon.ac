import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
})
export class Dashboard implements OnInit {
  isLoading = true;
  enrolledCourses: any[] = [];
  courseIds!: string;
  enrollments: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => {
      const parsed = localStorage.getItem('isUser');

      if (!parsed) return;

      this.http.get<any[]>('http://localhost:3000/users').subscribe({
        next: (users) => {
          const student = users[users.length - 1];
          const studentId = student.id;

          this.http
            .get<any>(`http://localhost:3000/studentEnrollments?studentId=${studentId}`)
            .subscribe({
              next: (enrollment) => {
                this.enrollments = enrollment;
                const courseIds = (this.enrollments || []).map((c) => c.courseId);
                this.http.get<any[]>('http://localhost:3000/courses').subscribe({
                  next: (allCourses) => {
                    this.enrolledCourses = allCourses.filter((course) =>
                      courseIds.includes(course.id)
                    );
                    this.isLoading = false;
                  },
                });
              },
            });
        },
      });
    }, 1000);
  }
}
