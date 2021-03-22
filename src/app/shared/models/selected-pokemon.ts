export class SelectedPokemon {
    name: string;
    hp: number;
    defense: number;
    image: string;
    type: string;
    typeRelations: TypeRelation;
    attacks: PokemonMove[];
    moves: any;
    attacked: boolean;
    attackMultiplier: number;

    constructor(
        name: string,
        hp: number,
        defense: number,
        image: string,
        type: string,
        typeRelations: any,
        attacks: any,
        moves: any
    ) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.hp = hp;
        this.defense = defense;
        this.attacks = attacks;
        this.type = type;
        this.typeRelations = {
            noDamageFrom: typeRelations.damage_relations.no_damage_from,
            halfDamageFrom: typeRelations.damage_relations.half_damage_from,
            doubleDamageFrom: typeRelations.damage_relations.double_damage_from
        };
        this.image = image;
        this.moves = moves;
        this.attacked = false;
    }
}

interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
}

interface TypeRelation {
    noDamageFrom: any;
    halfDamageFrom: any;
    doubleDamageFrom: any;
}
