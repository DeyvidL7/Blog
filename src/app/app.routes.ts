import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent 
  },
  {
    path: 'pokemon',
    component: PokemonComponent 
  },
  {
    path: '**',
    redirectTo: ''
  }
];
