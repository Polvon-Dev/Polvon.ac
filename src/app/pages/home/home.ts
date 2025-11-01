import { Component, OnInit } from '@angular/core';
import { CoursesInterface } from '../courses/courses-interface';
import { CoursesService } from '../courses/courses-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  courses: CoursesInterface[] = [];
  loading = true;
  constructor(private courseServise: CoursesService, private router: Router) {}

  loadCourses(): void {
    this.courseServise.getCourses().subscribe({
      next: (data) => {
        this.courses = data.slice(-6);
        this.loading = false;
      },
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loadCourses();
    }, 1000);
  }

  onClickCourses() {
    this.router.navigate(['/courses']);
  }
  onClickProjects() {
    this.router.navigate(['/projects']);
  }
}
