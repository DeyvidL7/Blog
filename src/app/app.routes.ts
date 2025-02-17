import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
  },
  {
    path: 'pokemon',
    component: PokemonComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
