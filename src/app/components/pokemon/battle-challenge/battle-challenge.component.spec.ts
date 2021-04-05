import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleChallengeComponent } from './battle-challenge.component';

describe('BattleChallengeComponent', () => {
  let component: BattleChallengeComponent;
  let fixture: ComponentFixture<BattleChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
