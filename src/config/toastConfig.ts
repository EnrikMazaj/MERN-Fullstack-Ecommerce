import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
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
    style: {
        ...toastConfig.style,
        background: "white",
        color: "#4CAF50",
        border: "1px solid #4CAF50",
    },
};

export const errorToastConfig: ToastOptions = {
    ...toastConfig,
    style: {
        ...toastConfig.style,
        background: "white",
        color: "#f44336",
        border: "1px solid #f44336",
    },
}; 