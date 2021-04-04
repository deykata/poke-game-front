import { Injectable } from '@angular/core';
import { SelectedPokemon } from 'src/app/shared/models/selected-pokemon';
import { ApiPokeService } from 'src/app/shared/services/api-poke.service';
import { RandomTypeArrayTypes, UtilsService } from 'src/app/shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonHelper {

  constructor(
    private utils: UtilsService,
    private pokeApi: ApiPokeService,
  ) {}

  async mapPokemon(pokemon) {
    const pokemonAttacks = this.utils.getRandomItems(pokemon.moves, 4, RandomTypeArrayTypes.Object);
    const pokemonMoves = this.utils.filterArrays(pokemon.moves, pokemonAttacks);
    const pokemonType = pokemon.types[0].type.name;
    const typeRelations = await this.pokeApi.getPokemonType(pokemonType).toPromise();
    const mappedPokemon = new SelectedPokemon(pokemon.name, pokemon.stats[0].base_stat, pokemon.stats[2].base_stat, pokemon.sprites.other['official-artwork'].front_default, pokemonType, typeRelations, pokemonAttacks, pokemonMoves);
    return mappedPokemon;
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

  addNewAttack(pokemon: SelectedPokemon, index: number) {
    pokemon.attacks = pokemon.attacks.filter((_att, i) => i != index); 
    const newAttack = this.utils.getRandomItems(pokemon.moves, 1, RandomTypeArrayTypes.Object);
    pokemon.attacks = [...pokemon.attacks, ...newAttack];
    pokemon.moves = this.utils.filterArrays(pokemon.moves, pokemon.attacks);
    return pokemon;
  }
  
}
