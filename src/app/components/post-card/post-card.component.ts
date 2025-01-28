import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material.config';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MaterialModules],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export default class PostCardComponent {
  @Input() post: { id: number; title: string; content: string } | undefined;
  @Output() deletePost = new EventEmitter<number>();

  onDelete() {
    if (this.post) {
      this.deletePost.emit(this.post.id);
    }
  }
}
