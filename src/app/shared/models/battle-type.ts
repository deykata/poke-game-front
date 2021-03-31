export class BattleType {
    id: number;
    name: string;
    active: boolean;
    points: number;

    constructor (id: number, name: string, active: boolean, points: number) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.points = points;
    }
}

export class NewBattleRequest {
    user: string;
    type: number;
    damage: number;

    constructor (user: string, type: number, damage: number) {
        this.user = user;
        this.type = type;
        this.damage = damage;
    }
}