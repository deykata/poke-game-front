import { Component, HostListener, OnInit } from '@angular/core';
import { ApiPokeService } from 'src/app/shared/services/api-poke.service';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SelectedPokemon } from 'src/app/shared/models/selected-pokemon';
import { StoreConfig } from 'src/app/config/config';
import { Settings } from 'src/app/shared/models/settings';
import { RandomTypeArrayTypes, UtilsService } from 'src/app/shared/services/utils.service';
import { BattleType, NewBattleRequest } from 'src/app/shared/models/battle-type';
import { BattleService } from 'src/app/shared/services/battle.service';
import { PokemonHelper } from './helpers/pokemon.helper';

@Component({
  selector: 'app-v-arena',
  templateUrl: './v-arena.component.html',
  styleUrls: ['./v-arena.component.scss']
})
export class VArenaComponent implements OnInit {
  public battleTypes: BattleType[] = [];
  private selectedBattleType: number;
  private pokemonCount: number;
  private selectedPokemonIds: number[] = [];
  public selectedPokemons: any[] = [];
  public player: string;

  public playerPokemon: SelectedPokemon = {} as SelectedPokemon;
  public enemyPokemon: SelectedPokemon = {} as SelectedPokemon;

  public progressStage: number = -1;

  public playerTurn: boolean;
  public showModal: boolean;

  constructor(
    private pokeApi: ApiPokeService,
    private storage: StorageService,
    private utils: UtilsService,
    private battleService: BattleService,
    private pokemonHelper: PokemonHelper
  ) {}

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.progressStage > 1) {
      event.returnValue = false; // stay on same page
    }  
    event.preventDefault();
  }

  ngOnInit(): void {
    this.loadBattleTypes();
    this.getUserData();
  }

  loadBattleTypes() {
    this.battleService.getBattleTypes().toPromise().then(res => {
      (res as any).types.forEach(type => {
        const item = new BattleType(type.id, type.name, type.active, type.points, type.type);
        this.battleTypes.push(item);
      });
    })
  }

  getUserData() {
    this.storage.getItem(StoreConfig.DB_SETTINGS).toPromise().then((res: Settings) => {
      this.player = res.player;
    })
  }

  battleSelected(type) {
    this.selectedBattleType = type.id;
    switch (type.type) {
      case 'solo':
        this.prepareArena();
        break;
      case 'online':
        console.log(type)
        this.progressStage = null;
        break;
    
      default:
        break;
    }
  }

  restartArena() {
    this.progressStage = -1;
    this.selectedPokemons = [];
    this.selectedPokemonIds = [];
    this.showModal = null;
  }

  prepareArena() {
    this.progressStage = 0;
    this.pokeApi.getPokemonCount({limit: 1}).pipe(take(1)).subscribe(res => {
      this.pokemonCount = (res as any).count;
      this.selectedPokemonIds = this.utils.getRandomItems(850, 2, RandomTypeArrayTypes.Number);
      this.getSelectedPokemonsData();
    })
  }

  getSelectedPokemonsData() {
    let promiseArray: any = [];
    this.selectedPokemonIds.forEach(id => {
      promiseArray.push(() => this.pokeApi.getPokemonById(id + 1).toPromise());
    })
    Promise.all(promiseArray.map((task: () => any) => task()))
      .then(res => {
        res.forEach(async (pokemon: any) => {
          if (pokemon.moves.length) {
            const mappedPokemon = await this.pokemonHelper.mapPokemon(pokemon);
            this.selectedPokemons.push(mappedPokemon);
          } else {
            this.getNewPokemon();
          }
        })
        this.progressStage = 1;
      })
  }

  getNewPokemon() {
    const newId = this.utils.getRandomItems(850, 1, RandomTypeArrayTypes.Number)[0] + 1;
    this.pokeApi.getPokemonById(newId).toPromise().then(async (newPokemon: any) => {
      if (newPokemon.moves.length) {
        const mappedPokemon = await this.pokemonHelper.mapPokemon(newPokemon);
        this.selectedPokemons.push(mappedPokemon);
      } else {
        this.getNewPokemon();
      }
    })
  }

  selectPokemon(index: number) {
    this.playerPokemon = this.selectedPokemons[index];
    this.enemyPokemon = this.selectedPokemons.find((_pokemon, i) => i != index);
    this.playerPokemon.attackMultiplier = this.pokemonHelper.getAttackMultiplier(this.playerPokemon.typeRelations, this.enemyPokemon.type);
    this.enemyPokemon.attackMultiplier = this.pokemonHelper.getAttackMultiplier(this.enemyPokemon.typeRelations, this.playerPokemon.type);
    this.startBattle();
  }

  startBattle() {
    this.progressStage = 2;
    this.playerTurn = true;
  }

  async launchAttack(index: number, attack: any, attacker: string) {
    const attackData = await this.pokeApi.getPokemonMove(attack.move.url).toPromise();
    let attacking = this.playerPokemon;
    let defending = this.enemyPokemon;
    if (attacker === 'enemy') {
      attacking = this.enemyPokemon;
      defending = this.playerPokemon;
    }
    this.applyDamage(defending, attackData, attacking.attackMultiplier);
    attacking = this.pokemonHelper.addNewAttack(attacking, index);
  }

  applyDamage(pokemon: SelectedPokemon, attackData: any, attackMultiplier: number) {
    pokemon.hp = pokemon.hp - (attackData.power * attackMultiplier);
    pokemon.damageTaken = pokemon.damageTaken + (attackData.power * attackMultiplier);
    pokemon.attacked = true;
    this.playerTurn = !this.playerTurn;
    setTimeout(() => {
      pokemon.attacked = false;
    }, 200);
    if (pokemon.hp <= 0) {
      this.showResultModal();
    } else {
      this.checkTurn();
    }
  }

  checkTurn() {
    if (!this.playerTurn) {
      setTimeout(() => {
        const randomAttack = this.utils.getRandomItems(this.enemyPokemon.attacks, 1, RandomTypeArrayTypes.Object)[0];
        const index = this.enemyPokemon.attacks.findIndex(attack => attack.move.name == randomAttack.move.name);
        this.launchAttack(index, randomAttack, 'enemy');
      }, 1000);
    }
  }

  async showResultModal() {
    this.progressStage = 3;
    setTimeout(() => {
      this.showModal = !this.showModal;
    }, 500);
    const payload = await new NewBattleRequest(this.player, this.selectedBattleType, this.enemyPokemon.damageTaken);
    this.battleService.saveBattleResult(payload).toPromise().then(res => {
      console.log('YES ', res);
    })
  }
}
