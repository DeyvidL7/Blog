import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../material.config';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-cards',
  standalone: true,
  imports: [MaterialModules, CommonModule],
  templateUrl: './post-cards.component.html',
  styleUrl: './post-cards.component.scss',
})
export class PostCardsComponent {
  @Input() post!: Post;
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() editRequest = new EventEmitter<Post>();

  constructor(private router: Router) {}

  onViewDetails(): void {
    this.router.navigate(['/post', this.post.id]);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.editRequest.emit(this.post);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteRequest.emit(this.post.id);
  }
}
