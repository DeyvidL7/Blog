export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  created_at: string;
}
