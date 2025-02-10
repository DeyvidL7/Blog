import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private http = inject(HttpClient);

  getPokemonList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response =>
        response.results.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          id: index + 1,
        }))
      )
    );
  }

  getPokemonDetails(nameOrId: string): Observable<any> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  }
}
