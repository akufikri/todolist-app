// service notifikasi
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Konfigurasi default untuk toast
const defaultOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
};

const notificationService = {
      success: (message, options = {}) => {
            toast.success(message, { ...defaultOptions, ...options });
      },
      error: (message, options = {}) => {
            toast.error(message, { ...defaultOptions, ...options });
      },
      info: (message, options = {}) => {
            toast.info(message, { ...defaultOptions, ...options });
      },
      warn: (message, options = {}) => {
            toast.warn(message, { ...defaultOptions, ...options });
      },
};

export default notificationService;