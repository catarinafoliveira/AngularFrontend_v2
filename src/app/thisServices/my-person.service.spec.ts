import { TestBed } from '@angular/core/testing';

import { MyPersonService } from './my-person.service';

describe('MyPersonService', () => {
  let service: MyPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
