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
    private battleService: BattleService
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
        const item = new BattleType(type.id, type.name, type.active, type.points);
        this.battleTypes.push(item);
      });
    })
  }

  battleSelected(typeId) {
    this.selectedBattleType = typeId;
    this.prepareArena();
  }

  restartArena() {
    this.progressStage = -1;
    this.selectedPokemons = [];
    this.selectedPokemonIds = [];
    this.showModal = null;
  }

  getUserData() {
    this.storage.getItem(StoreConfig.DB_SETTINGS).toPromise().then((res: Settings) => {
      this.player = res.player;
    })
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
        res.forEach((pokemon: any) => {
          if (pokemon.moves.length) {
            this.mapPokemon(pokemon);
          } else {
            this.getNewPokemon();
          }
        })
        this.progressStage = 1;
      })
  }

  getNewPokemon() {
    const newId = this.utils.getRandomItems(850, 1, RandomTypeArrayTypes.Number)[0] + 1;
    this.pokeApi.getPokemonById(newId).toPromise().then((newPokemon: any) => {
      if (newPokemon.moves.length) {
        this.mapPokemon(newPokemon);
      } else {
        this.getNewPokemon();
      }
    })
  }

  async mapPokemon(pokemon) {
    const pokemonAttacks = this.utils.getRandomItems(pokemon.moves, 4, RandomTypeArrayTypes.Object);
    const pokemonMoves = this.utils.filterArrays(pokemon.moves, pokemonAttacks);
    const pokemonType = pokemon.types[0].type.name;
    const typeRelations = await this.pokeApi.getPokemonType(pokemonType).toPromise();
    const mappedPokemon = new SelectedPokemon(pokemon.name, pokemon.stats[0].base_stat, pokemon.stats[2].base_stat, pokemon.sprites.other['official-artwork'].front_default, pokemonType, typeRelations, pokemonAttacks, pokemonMoves);
    this.selectedPokemons.push(mappedPokemon);
  }

  getAttackMultiplier(typeRelations, attackingType) {
    let attackMultiplier = 1;
    for (const [key, value] of Object.entries(typeRelations)) {
      (value as any).forEach(type => {
        if (type.name === attackingType) {
          switch (key) {
            case 'doubleDamageFrom':
              attackMultiplier = 2;
              break;
            case 'halfDamageFrom':
              attackMultiplier = .5;
              break;
            case 'noDamageFrom':
              attackMultiplier = 0;
              break;
            default:
              break;
          }
        }
      });
    }

    return attackMultiplier;
  }

  selectPokemon(index: number) {
    this.playerPokemon = this.selectedPokemons[index];
    this.enemyPokemon = this.selectedPokemons.find((_pokemon, i) => i != index);
    this.playerPokemon.attackMultiplier = this.getAttackMultiplier(this.playerPokemon.typeRelations, this.enemyPokemon.type);
    this.enemyPokemon.attackMultiplier = this.getAttackMultiplier(this.enemyPokemon.typeRelations, this.playerPokemon.type);
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
    attacking = this.addNewAttack(attacking, index);
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

  addNewAttack(pokemon: SelectedPokemon, index: number) {
    pokemon.attacks = pokemon.attacks.filter((_att, i) => i != index); 
    const newAttack = this.utils.getRandomItems(pokemon.moves, 1, RandomTypeArrayTypes.Object);
    pokemon.attacks = [...pokemon.attacks, ...newAttack];
    pokemon.moves = this.utils.filterArrays(pokemon.moves, pokemon.attacks);
    return pokemon;
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
