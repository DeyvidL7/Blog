import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MaterialModules } from '../../../material.config';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  post: Post | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = Number(params.get('id'));

      if (isNaN(postId)) {
        this.error = 'ID de post inválido';
        this.isLoading = false;
        return;
      }

      this.postService
        .getPostById(postId)
        .pipe(
          catchError((err) => {
            this.error = 'Error al cargar el post';
            this.isLoading = false;
            console.error(err);
            return of(null);
          })
        )
        .subscribe({
          next: (post) => {
            this.post = post;
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Error al cargar el post';
            this.isLoading = false;
            console.error(err);
          },
        });
    });
  }

  goBack(): void {
    window.history.back();
  }
}
