import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {
  @Input() result: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
