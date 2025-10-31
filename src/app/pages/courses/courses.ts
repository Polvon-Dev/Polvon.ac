import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CoursesService } from './courses-service';
import { CoursesInterface } from './courses-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
})
export class Courses implements OnInit {
  courses: CoursesInterface[] = [];
  private courseService = inject(CoursesService);

  loadCourses(): void {
    console.log('LoadCourses');

    this.courseService.getCourses().subscribe({
      next: (data: CoursesInterface[]) => {
        this.courses = data;
      },
      error: (erorr) => {
        console.log(erorr);
      },
    });
  }
  ngOnInit(): void {
    this.loadCourses();
  }
}
