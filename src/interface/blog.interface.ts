import type { Post } from './post.interface';

export interface Blog {
    id: number;
    title: string;
    content: string;
    user_id: number;
    image_url: string | null;
    image_public_id: string | null;
    created_at: string;
    updated_at: string;
    posts: Post[];
}
