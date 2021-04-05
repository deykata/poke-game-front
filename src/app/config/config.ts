export class AppConfig {
    // API BASE URLS
    public static API_URL_POKEMON = "https://pokeapi.co/api/v2";
    public static API_URL_WRAPPER = "https://deyo-poke.herokuapp.com/wrapper-poke";
    public static WS_URL = "wss://deyo-poke.herokuapp.com";

    // POKEMON FOLDERS
    public static P_POKEMON_FOLDER = "/pokemon";
    public static P_MOVES_FOLDER = "/move";
    public static P_TYPES_FOLDER = "/type";

    // WRAPPER ENDPOINTS
    public static W_BATTLES_BASE = '/battles';
    public static W_BATTLES_TYPES = '/types';
    public static W_BATTLES_NEW = '/new-battle';

    public static W_USERS_BASE = '/users';
    public static W_USERS_CHECK = '/check';

    public static W_RANKINGS_BASE = '/rankings';
    public static W_RANKINGS_PLAYER = '/player';
    public static W_RANKINGS_BATTLE = '/battle';
    public static W_RANKINGS_COMBINED = '/combined';
}

export class StoreConfig {
    public static DB_NAME = 'PokeDb';
    public static DB_STORE = 'PokeStore';
    public static DB_SETTINGS = 'settings';
    public static DB_BATTLE_TYPE = 'battleType';
}