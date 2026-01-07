import { getApi, postApi, deleteApi } from '../lib/api';
import type { ApiResponse } from '../interface/global.interface';
import type { Blog } from '../interface/blog.interface';

export const getBlogs = async (): Promise<ApiResponse<Blog[]>> => {
    return await getApi<ApiResponse<Blog[]>>('/api/blogs');
};

export const getBlogById = async (id: string | number): Promise<ApiResponse<Blog[]>> => {
    return await getApi<ApiResponse<Blog[]>>(`/api/blogs/${id}`);
};

export const createBlog = async (data: FormData): Promise<ApiResponse<Blog>> => {
    return await postApi<ApiResponse<Blog>>('/api/blogs', data);
};

export const updateBlog = async (id: string | number, data: FormData): Promise<ApiResponse<Blog>> => {
    return await postApi<ApiResponse<Blog>>(`/api/blogs/${id}`, data);
};

export const deleteBlog = async (id: string | number): Promise<ApiResponse<any>> => {
    return await deleteApi<ApiResponse<any>>(`/api/blogs/${id}`);
};
