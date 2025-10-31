import { inject, Injectable } from '@angular/core';
import { CoursesInterface } from './courses-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CoursesInterface[]> {
    return this.http.get<CoursesInterface[]>(`${this.apiUrl}/courses`);
  }
}
