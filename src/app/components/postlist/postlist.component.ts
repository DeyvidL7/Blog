import { Component } from '@angular/core';
import { MaterialModules } from '../../../material.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postlist',
  standalone: true,
  imports: [MaterialModules, CommonModule],
  templateUrl: './postlist.component.html',
  styleUrl: './postlist.component.scss',
})
export class PostlistComponent {
  posts = [
    {
      title: 'Introducción a Angular',
      content:
        'Angular es un framework de desarrollo de aplicaciones web basado en TypeScript. Aprende cómo comenzar con componentes, servicios y directivas.',
    },
    {
      title: 'Uso de Servicios en Angular',
      content:
        'Los servicios son fundamentales para compartir lógica y datos entre componentes. Aprende a crear y usar servicios con la inyección de dependencias.',
    },
    {
      title: 'Directivas Estructurales',
      content:
        'Las directivas estructurales como *ngIf y *ngFor permiten controlar la estructura del DOM dinámicamente en Angular.',
    },
  ];

  addPost() {
    const newPostIndex = this.posts.length + 1;
    this.posts.push({
      title: `Nueva Publicación sobre Angular #${newPostIndex}`,
      content: `Esta publicación trata sobre un concepto interesante de Angular: Tema #${newPostIndex}. Profundiza en conceptos avanzados como Observables o Ciclos de Vida.`,
    });
  }
}
