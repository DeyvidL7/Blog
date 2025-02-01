import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModules } from '../../../material.config';
import { PostCardsComponent } from "../post-cards/post-cards.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MaterialModules, PostCardsComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onAddPost(): void {
    const newPost: Post = {
      id: Date.now(),
      title: 'Nueva publicación',
      content: 'Contenido de la nueva publicación',
      author: 'Admin',
      date: new Date(),
      comments: []
    };
    console.log('PostListComponent: Añadiendo nuevo post:', newPost);
    this.postService.addPost(newPost);
  }

  onDeletePost(id: number): void {
    console.log('PostListComponent: Eliminando post:', id);
    this.postService.deletePost(id);
  }
}
