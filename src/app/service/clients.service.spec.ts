import { TestBed } from '@angular/core/testing';

import { ClientRegisterService } from './clients.service';

describe('ClientRegisterService', () => {
  let service: ClientRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
