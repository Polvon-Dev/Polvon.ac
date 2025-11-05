import { TestBed } from '@angular/core/testing';

import { StudentEnrolled } from './student-enrolled';

describe('StudentEnrolled', () => {
  let service: StudentEnrolled;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEnrolled);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
