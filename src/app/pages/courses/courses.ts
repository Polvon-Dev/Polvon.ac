import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CoursesService } from './courses-service';
import { CoursesInterface } from './courses-interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.html',
  standalone: true,
})
export class Courses implements OnInit {
  courses: CoursesInterface[] = [];
  loading = true;
  private courseService = inject(CoursesService);
  constructor(private route: ActivatedRoute, private router: Router) {}

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: CoursesInterface[]) => {
        this.courses = data;
        this.loading = false;
      },
      error: (erorr) => {
        console.log(erorr);
      },
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadCourses();
    }, 1000);
  }
}
