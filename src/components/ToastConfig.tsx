import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastConfig.css';

const ToastConfig = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 99999 }}
            theme="light"
            closeButton={({ closeToast }) => (
                <button
                    onClick={closeToast}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '0 8px',
                        fontWeight: 'bold',
                        opacity: '0.8',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                    ×
                </button>
            )}
            toastStyle={{
                background: '#4CAF50',
                color: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500'
            }}
            progressStyle={{
                background: 'rgba(255,255,255,0.3)'
            }}
            className="custom-toast-container"
        />
    );
};

export default ToastConfig; 