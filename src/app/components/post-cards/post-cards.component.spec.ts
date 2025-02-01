import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardsComponent } from './post-cards.component';

describe('PostCardsComponent', () => {
  let component: PostCardsComponent;
  let fixture: ComponentFixture<PostCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
