import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, from as rxjsFrom, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { SupabaseService } from './supabase.service';

interface PostsResponse {
  data: Post[];
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private supabase: SupabaseService) {}

  getPosts(
    pageIndex: number = 0,
    pageSize: number = 6
  ): Observable<PostsResponse> {
    const from = pageIndex * pageSize;
    const to = from + pageSize - 1;

    return rxjsFrom(
      this.supabase.client
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)
    ).pipe(
      map((response) => ({
        data: (response.data as Post[]) || [],
        count: response.count || 0,
      })),
      retry(3),
      catchError((error) => {
        console.error('Error al cargar posts:', error);
        return throwError(
          () => 'Error al cargar los posts. Por favor, intente nuevamente.'
        );
      })
    );
  }

  // Nuevo método para obtener un post por ID
  getPostById(id: number): Observable<Post | null> {
    return rxjsFrom(
      this.supabase.client.from('posts').select('*').eq('id', id).single()
    ).pipe(
      map((response) => {
        if (response.data) {
          return response.data as Post;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error al cargar el post:', error);
        return throwError(
          () => 'Error al cargar el post. Por favor, intente nuevamente.'
        );
      })
    );
  }

  addPost(post: Omit<Post, 'id' | 'created_at'>): Observable<any> {
    return rxjsFrom(
      this.supabase.client.from('posts').insert([
        {
          ...post,
          created_at: new Date().toISOString(),
        },
      ])
    ).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al añadir post:', error);
        return throwError(
          () => 'Error al añadir el post. Por favor, intente nuevamente.'
        );
      })
    );
  }

  updatePost(post: Post): Observable<any> {
    return rxjsFrom(
      this.supabase.client
        .from('posts')
        .update({
          title: post.title,
          content: post.content,
          author: post.author,
        })
        .eq('id', post.id)
    ).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al actualizar post:', error);
        return throwError(
          () => 'Error al actualizar el post. Por favor, intente nuevamente.'
        );
      })
    );
  }

  deletePost(id: number): Observable<any> {
    return rxjsFrom(
      this.supabase.client.from('posts').delete().eq('id', id)
    ).pipe(
      retry(2),
      catchError((error) => {
        console.error('Error al eliminar post:', error);
        return throwError(
          () => 'Error al eliminar el post. Por favor, intente nuevamente.'
        );
      })
    );
  }
}
