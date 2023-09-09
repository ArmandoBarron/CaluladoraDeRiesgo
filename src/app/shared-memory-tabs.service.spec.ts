import { TestBed } from '@angular/core/testing';

import { SharedMemoryTabsService } from './shared-memory-tabs.service';

describe('SharedMemoryTabsService', () => {
  let service: SharedMemoryTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMemoryTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
