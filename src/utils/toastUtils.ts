import { toast, type ToastOptions, type ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import CustomToast from '../components/Toast/custom-toast';

type Severity = 'success' | 'error' | 'info' | 'warning' | 'default';

interface ShowToastParams {
    title: string;
    message: string;
    severity?: Severity;
    autoClose?: number;
    position?: ToastPosition;
}

export const showToast = ({
    title,
    message,
    severity = 'default',
    autoClose,
    position = 'bottom-right',
}: ShowToastParams): void => {
    const options: ToastOptions = {
        position,
        autoClose: autoClose ?? 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { borderRadius: '8px', padding: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    };

    const content = React.createElement(CustomToast, { title, message });

    switch (severity) {
        case 'success':
            toast.success(content, options);
            break;
        case 'error':
            toast.error(content, options);
            break;
        case 'info':
            toast.info(content, options);
            break;
        case 'warning':
            toast.warn(content, options);
            break;
        default:
            toast(content, options);
            break;
    }
};
