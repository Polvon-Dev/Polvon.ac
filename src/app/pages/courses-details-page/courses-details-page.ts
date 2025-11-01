import { HttpClient } from '@angular/common/http';
import { CoursesInterface } from '../courses/courses-interface';
import { CoursesService } from '../courses/courses-service';
import { Courses } from './../courses/courses';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-details-page',
  imports: [CommonModule],
  templateUrl: './courses-details-page.html',
  styleUrl: './courses-details-page.css',
  standalone: true,
})
export class CoursesDetailsPage implements OnInit {
  course: any;
  courseId!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    if (this.courseId) {
      this.http.get(`http://localhost:3000/courses?id=${this.courseId}`).subscribe((data) => {
        this.course = data;
        console.log(this.course);
      });
    }
  }
}
