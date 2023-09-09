import { TestBed } from '@angular/core/testing';
import { CataologosService } from './cataologos.service';

describe('CataologosService', () => {
  let service: CataologosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CataologosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
