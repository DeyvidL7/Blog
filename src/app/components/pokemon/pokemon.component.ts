import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from '../../../material.config';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModules],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  pokemonList: any[] = [];
  visiblePokemon: any[] = [];
  selectedPokemon: any = null;
  private currentIndex = 0;
  private itemsPerPage = 5;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.pokemonService.getPokemonList().subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.updateVisiblePokemon();
      },
      error: (err) => console.error('Error al obtener la lista de Pokémon', err),
    });
  }

  searchPokemon(nameOrId: string) {
    this.pokemonService.getPokemonDetails(nameOrId.toLowerCase()).subscribe({
      next: (data) => {
        this.selectedPokemon = {
          name: data.name,
          id: data.id,
          image: data.sprites.other['official-artwork'].front_default,
          type: data.types[0]?.type?.name,
          height: data.height / 10,
          weight: data.weight / 10,
        };
      },
      error: () => {
        console.error('Pokémon no encontrado');
        this.selectedPokemon = null;
      },
    });
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisiblePokemon();
    }
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerPage < this.pokemonList.length) {
      this.currentIndex++;
      this.updateVisiblePokemon();
    }
  }

  updateVisiblePokemon() {
    this.visiblePokemon = this.pokemonList.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }
}
