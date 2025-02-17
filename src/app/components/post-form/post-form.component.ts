import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModules } from '../../../material.config';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, MaterialModules, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post | null
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', Validators.required],
    });

    if (data) {
      this.postForm.patchValue(data);
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      const post: Partial<Post> = {
        ...(this.data?.id && { id: this.data.id }),
        title: formValue.title,
        content: formValue.content,
        author: formValue.author,
        created_at: this.data?.created_at || new Date().toISOString(),
      };

      this.dialogRef.close(post);
    }
  }
}
