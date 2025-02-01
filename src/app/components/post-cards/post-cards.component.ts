import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material.config';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-cards',
  standalone: true,
  imports: [MaterialModules, CommonModule],
  templateUrl: './post-cards.component.html',
  styleUrl: './post-cards.component.scss'
})
export class PostCardsComponent {
  @Input() post!: Post;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() editRequest = new EventEmitter<Post>();

  onEdit(): void {
    this.editRequest.emit(this.post);
  }

  onDelete(): void {
    this.deleteRequest.emit(this.post.id);
  }
}
