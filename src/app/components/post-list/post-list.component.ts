import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModules } from '../../../material.config';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostCardsComponent } from "../post-cards/post-cards.component";
import { PostFormComponent } from '../post-form/post-form.component';
import { catchError, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface PaginationEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MaterialModules,
    PostCardsComponent,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  totalPosts = 0;
  pageSize = 6;
  currentPage = 0;
  pageSizeOptions = [3, 6, 9, 12];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(pageIndex: number = 0, pageSize: number = this.pageSize): void {
    this.isLoading = true;
    this.postService
      .getPosts(pageIndex, pageSize)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of({ data: [], count: 0 });
        })
      )
      .subscribe({
        next: (response) => {
          this.posts = response.data;
          this.totalPosts = response.count;

          const maxPage = Math.ceil(this.totalPosts / pageSize) - 1;
          if (pageIndex > maxPage && this.totalPosts > 0) {
            this.loadPosts(maxPage, pageSize);
          }
        },
        error: (error) => {
          console.error('Error cargando posts:', error);
          this.posts = [];
          this.totalPosts = 0;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: PaginationEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPosts(event.pageIndex, event.pageSize);
  }

  onAddPost(): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.addPost(result).subscribe({
          next: () => {
            this.loadPosts(this.currentPage, this.pageSize);
          },
          error: (error) => {
            console.error('Error al añadir post:', error);
          },
        });
      }
    });
  }

  onEditPost(post: Post): void {
    const dialogRef = this.dialog.open(PostFormComponent, {
      width: '600px',
      disableClose: true,
      data: post,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.updatePost(result).subscribe({
          next: () => {
            this.loadPosts(this.currentPage, this.pageSize);
          },
          error: (error) => {
            console.error('Error al actualizar post:', error);
          },
        });
      }
    });
  }

  onDeletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        const maxPage = Math.ceil((this.totalPosts - 1) / this.pageSize) - 1;
        const newPage = this.currentPage > maxPage ? maxPage : this.currentPage;
        this.loadPosts(newPage, this.pageSize);
      },
      error: (error) => {
        console.error('Error al eliminar post:', error);
      },
    });
  }
}
