import { postApi } from '../lib/api';
import type { ApiResponse } from '../interface/global.interface';

interface LoginResponseData {
    token: string;
}

export const loginUser = async (formData: FormData): Promise<ApiResponse & { data: LoginResponseData }> => {
    return await postApi('/api/login', formData);
};
