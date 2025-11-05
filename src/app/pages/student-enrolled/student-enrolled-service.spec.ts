import { TestBed } from '@angular/core/testing';

import { StudentEnrolledService } from './student-enrolled-service';

describe('StudentEnrolledService', () => {
  let service: StudentEnrolledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEnrolledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
