export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: Date;
    comments: Comment[];
  }
  
  export interface Comment {
    id: number;
    content: string;
    author: string;
    date: Date;
  }