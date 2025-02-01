import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor() {
    this.addPost({
      id: 1,
      title: 'Primera publicación',
      content: '¡Bienvenidos a mi primer post! En este espacio compartiré mis ideas, experiencias y proyectos. Estoy emocionado de empezar este viaje y conectar con más personas que comparten intereses similares. Acompáñame mientras comparto contenido sobre desarrollo de software, tecnología y otros temas que me apasionan.',
      author: 'David Aruquipa Choque',
      date: new Date(),
      comments: []
    }   
  );
  }

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  addPost(post: Post): void {
    this.posts.push(post);
    this.postsSubject.next([...this.posts]);
    console.log('Post añadido:', post);
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
    this.postsSubject.next([...this.posts]);
    console.log('Post eliminado:', id);
  }

  updatePost(updatedPost: Post): void {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.postsSubject.next([...this.posts]);
      console.log('Post actualizado:', updatedPost);
    }
  }
}
