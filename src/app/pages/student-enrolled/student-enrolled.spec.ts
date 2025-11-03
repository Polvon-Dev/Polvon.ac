import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEnrolled } from './student-enrolled';

describe('StudentEnrolled', () => {
  let component: StudentEnrolled;
  let fixture: ComponentFixture<StudentEnrolled>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEnrolled]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEnrolled);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
