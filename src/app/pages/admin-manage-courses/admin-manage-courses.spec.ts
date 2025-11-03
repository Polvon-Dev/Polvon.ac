import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCourses } from './admin-manage-courses';

describe('AdminManageCourses', () => {
  let component: AdminManageCourses;
  let fixture: ComponentFixture<AdminManageCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
