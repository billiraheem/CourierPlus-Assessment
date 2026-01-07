import { getApi, postApi, deleteApi } from '../lib/api';
import type { ApiResponse } from '../interface/global.interface';
import type { Post } from '../interface/post.interface';

export const getPosts = async (blogId: string | number): Promise<ApiResponse<Post[]>> => {
    return await getApi<ApiResponse<Post[]>>(`/api/blogs/${blogId}/posts`);
};

export const getPostById = async (blogId: string | number, postId: string | number): Promise<ApiResponse<Post>> => {
    return await getApi<ApiResponse<Post>>(`/api/blogs/${blogId}/posts/${postId}`);
};

export const createPost = async (blogId: string | number, data: FormData): Promise<ApiResponse<Post>> => {
    return await postApi<ApiResponse<Post>>(`/api/blogs/${blogId}/posts`, data);
};

export const updatePost = async (blogId: string | number, postId: string | number, data: FormData): Promise<ApiResponse<Post>> => {
    return await postApi<ApiResponse<Post>>(`/api/blogs/${blogId}/posts/${postId}`, data);
};

export const deletePost = async (blogId: string | number, postId: string | number): Promise<ApiResponse<any>> => {
    return await deleteApi<ApiResponse<any>>(`/api/blogs/${blogId}/posts/${postId}`);
};
