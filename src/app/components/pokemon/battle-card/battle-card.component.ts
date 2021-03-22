import { Component, Input, OnInit } from '@angular/core';
import { SelectedPokemon } from 'src/app/shared/models/selected-pokemon';

@Component({
  selector: 'app-battle-card',
  templateUrl: './battle-card.component.html',
  styleUrls: ['./battle-card.component.scss']
})
export class BattleCardComponent implements OnInit {
  @Input() title: string;
  @Input() pokemon: SelectedPokemon;
  @Input() type: string;

  infoModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
