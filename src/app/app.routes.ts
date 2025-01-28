import { Routes } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import PostCardComponent from './components/post-card/post-card.component';

export const routes: Routes = [
  {
    path: 'postlist',
    component: PostlistComponent
  },
  {
    path: 'postCard',
    component: PostCardComponent
  },
];
