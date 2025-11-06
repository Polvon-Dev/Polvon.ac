import { Courses } from './../courses/courses';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyCoursesService } from './my-courses-service';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
  courses: any[] = [];
  constructor(
    private http: HttpClient,
    private apiUrl: CoursesService,
    public myCoursesService: MyCoursesService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.myCoursesService.getCourses();
    }, 1000);

    this.myCoursesService.courses$.subscribe((data) => {
      this.courses = data;
    });
  }
}
