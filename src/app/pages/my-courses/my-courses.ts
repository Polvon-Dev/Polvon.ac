import { Courses } from './../courses/courses';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
  constructor(private http: HttpClient, private apiUrl: CoursesService) {}
  loading = true;
  Courses: any[] = [];
  teacherCourses: any[] = [];
  teacherId!: number;
  user: any;
  ngOnInit(): void {
    const parsed = localStorage.getItem('signUpUsers');
    if (parsed) {
      const users = JSON.parse(parsed);
      this.user = Array.isArray(users) ? users[users.length - 1] : users;
      this.teacherId = Number(this.user.teacherId);

      setTimeout(() => {
        this.getCourses();
      }, 1000);
    }
  }

  getCourses() {
    this.http.get('http://localhost:3000/courses').subscribe({
      next: (data: any) => {
        this.Courses = data;
        this.teacherCourses = this.Courses.filter((course) => course.teacherId === this.teacherId);
        this.loading = false;
      },
    });
  }
}
