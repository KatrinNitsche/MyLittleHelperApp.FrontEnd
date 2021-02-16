import { TestBed } from '@angular/core/testing';

import { ToDoServiceService } from './to-do-service.service';

describe('ToDoServiceService', () => {
  let service: ToDoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
