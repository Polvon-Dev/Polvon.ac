import { HttpClient } from '@angular/common/http';
import { CoursesInterface } from '../courses/courses-interface';
import { CoursesService } from '../courses/courses-service';
import { Courses } from './../courses/courses';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-details-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-details-page.html',
  styleUrl: './courses-details-page.css',
  standalone: true,
})
export class CoursesDetailsPage implements OnInit {
  totalHours = 0;
  totalMinutes = 0;
  module: any[] = [];
  totalLessons!: number;
  totalDuration!: string;
  course: any;
  courseId!: string;
  user: any;
  enrollStudents: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}
  enrollCourse(courseId: string) {
    const parsed = localStorage.getItem('isUser');
    if (!parsed) return;
    this.http.get<any[]>('http://localhost:3000/users?role=teacher').subscribe({
      next: (users) => {
        const student = users[users.length - 1];
        const studentId = String(student.id);

        const enrollment = { studentId, courseId };

        this.http.post('http://localhost:3000/studentEnrollments', enrollment).subscribe({
          next: () => {
            alert("Kursga muvafaqiyatli qo'shildingiz");
            this.router.navigate(['/dashboard']);
          },
        });
      },
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.http.get(`http://localhost:3000/studentEnrollments?courseId=${this.courseId}`).subscribe({
      next: (data: any) => {
        this.enrollStudents = data;
      },
    });

    if (this.courseId) {
      this.http
        .get<any[]>(`http://localhost:3000/courses?id=${this.courseId}`)
        .subscribe((data) => {
          this.course = data[0];
          this.module = this.course.modules?.map((mod: any) => ({ ...mod })) || [];

          this.totalLessons = this.module.reduce((a, b) => a + b.lessonsCount, 0);
          this.module.forEach((mod: any) => {
            if (mod.duration) {
              const parts = mod.duration.split(' ');
              const hours = parseInt(parts[0]);
              const minutes = parseInt(parts[2]);
              this.totalHours += isNaN(hours) ? 0 : hours;
              this.totalMinutes += isNaN(minutes) ? 0 : minutes;
            }
          });

          this.totalHours += Math.floor(this.totalMinutes / 60);
          this.totalMinutes = this.totalMinutes % 60;
          this.totalDuration = `${this.totalHours}soat${this.totalMinutes}daqiqa`;
        });
    }
  }
}
