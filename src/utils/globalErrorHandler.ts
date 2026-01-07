import axios from 'axios';
import { type ApiResponse } from '../interface/global.interface';

type AlertColor = 'success' | 'info' | 'warning' | 'error';
type GlobalError = { message: string; title: string; severity: AlertColor };

export const globalErrorHandler = (
    data: Partial<ApiResponse> = {},
    errorResponse: any = {}
): GlobalError => {
    const severity: AlertColor = 'error';
    const SERVER_ERROR_TITLE = 'Server Error';
    const SERVER_ERROR = 'There was an error contacting the server.';

    // Check if the response itself indicates an error explicitly (API level)
    if (data.error) {
        return {
            message: data.message || SERVER_ERROR,
            title: 'Error',
            severity: 'error'
        };
    }

    // Success Case (error is false, or message exists implying success in 200 flow)
    if (data.message && !data.error) {
        return {
            message: data.message,
            title: 'Successful',
            severity: 'success'
        };
    }

    // Handle Axios Errors or Custom Interceptor Errors
    if (axios.isAxiosError(errorResponse) || errorResponse.isAxiosError) {
        // Check for status on the response (standard) or root (custom interceptor)
        const status = errorResponse.response?.status || errorResponse.status;
        const responseData = (errorResponse.response?.data || errorResponse.data) as any;

        // 401 Unauthorized
        if (status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return {
                message: 'Unauthorised User. Please Login Again',
                title: 'Unauthorised user',
                severity: 'error'
            };
        }

        // 400 Bad Request
        if (status === 400) {
            return {
                message: responseData?.message || SERVER_ERROR,
                title: 'Error',
                severity: 'error'
            };
        }

        // Other errors
        return {
            message: responseData?.message || errorResponse.message || SERVER_ERROR,
            title: 'An error occured',
            severity: 'error'
        };
    }

    // Fallback
    return {
        message: data.message || SERVER_ERROR,
        title: 'An Error Occured',
        severity: 'error'
    };
};
