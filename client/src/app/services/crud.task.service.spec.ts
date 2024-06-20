import { TestBed } from '@angular/core/testing';

import { CrudTaskService } from './crud.task.service';

describe('CrudTaskService', () => {
  let service: CrudTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
