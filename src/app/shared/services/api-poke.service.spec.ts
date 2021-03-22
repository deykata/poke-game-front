import { TestBed } from '@angular/core/testing';

import { ApiPokeService } from './api-poke.service';

describe('ApiPokeService', () => {
  let service: ApiPokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPokeService);
  });

});
