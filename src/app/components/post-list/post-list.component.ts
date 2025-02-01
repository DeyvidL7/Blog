import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModules } from '../../../material.config';
import { PostCardsComponent } from "../post-cards/post-cards.component";
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MaterialModules, PostCardsComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.addPost(result);
      }
    });
  }

  onEditPost(post: Post): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: true,
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.updatePost(result);
      }
    });
  }

  onDeletePost(id: number): void {
    console.log('PostListComponent: Eliminando post:', id);
    this.postService.deletePost(id);
  }
}
