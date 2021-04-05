import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-battle-challenge',
  templateUrl: './battle-challenge.component.html',
  styleUrls: ['./battle-challenge.component.scss']
})
export class BattleChallengeComponent implements OnInit {
  @Input() challenger: string;
  @Output() challengeResult = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  challengeResponse(response) {
    this.challengeResult.emit(response)
  }

}
