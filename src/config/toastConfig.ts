import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14px",
        fontWeight: "500",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "12px 16px",
    },
};

export const successToastConfig: ToastOptions = {
    ...toastConfig,
    theme: "light",
    style: {
        ...toastConfig.style,
        background: "#e8f5e9",
        color: "#2e7d32",
        border: "1px solid #2e7d32",
    },
};

export const errorToastConfig: ToastOptions = {
    ...toastConfig,
    theme: "light",
    style: {
        ...toastConfig.style,
        background: "#c62828",
        color: "#c62828",
        border: "1px solid #c62828",
    },
}; 