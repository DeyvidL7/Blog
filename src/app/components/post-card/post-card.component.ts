import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material.config';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MaterialModules],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post: any; // Recibe datos del post desde el padre.
  @Output() deletePost = new EventEmitter<number>(); // Evento para eliminar una publicación.

  onDelete() {
    this.deletePost.emit(this.post.id); // Emitimos el ID del post que se va a eliminar.
  }
}
