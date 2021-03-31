import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiPokeService {

  constructor(
    private http: HttpClient
  ) {}

  getPokemonCount(params: any) {
    let finalParams = '?';
    if (params) {
      for (let key of Object.keys(params)) {
        finalParams = `${finalParams + key}=${params[key]}`;
      }
    }
    return this.http.get(AppConfig.API_URL_POKEMON + AppConfig.P_POKEMON_FOLDER + finalParams);
  }

  getPokemonById(id: number) {
    return this.http.get(AppConfig.API_URL_POKEMON + AppConfig.P_POKEMON_FOLDER + '/' + id);
  }

  getPokemonMove(url: string) {
    return this.http.get(url);
  }

  getPokemonType(type: string) {
    return this.http.get(AppConfig.API_URL_POKEMON + AppConfig.P_TYPES_FOLDER + '/' + type);
  }
}
