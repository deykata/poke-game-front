import { TestBed } from '@angular/core/testing';

import { ArenaGuard } from './arena.guard';

describe('ArenaGuard', () => {
  let guard: ArenaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArenaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
