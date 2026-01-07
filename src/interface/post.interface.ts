export interface Like {
    id: number;
    post_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    image_url?: string | null;
    image_public_id?: string | null;
    created_at?: string;
    updated_at?: string;
    blog_id?: number;
    likes?: Like[];
    comments?: Comment[];
}
