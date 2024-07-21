import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import notificationService from "@/service/Notify";

const uri = 'http://127.0.0.1:8000/api/auth/';


const setAuthToken = (token) => {
      if (token) {
            localStorage.setItem('userToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
            localStorage.removeItem('userToken');
            delete axios.defaults.headers.common['Authorization'];
      }
};


axios.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response && error.response.status === 401) {
                  setAuthToken(null);
                  localStorage.removeItem('userEmail');
                  window.location.href = '/masuk';
            }
            return Promise.reject(error);
      }
);

export const useRegister = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const navigate = useNavigate();

      const handleRegister = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);

            try {
                  const response = await axios.post(uri + 'register', {
                        name,
                        email,
                        password
                  });

                  setLoading(false);
                  notificationService.success(response.data.message);
                  if (response.data.token) {
                        setAuthToken(response.data.token);
                  }
                  navigate('/masuk');
            } catch (err) {
                  setLoading(false);
                  const errorMessage = err.response?.data?.message || "Terjadi kesalahan saat mendaftar";
                  setError(errorMessage);
                  notificationService.error(errorMessage);
            }
      };

      return {
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            loading,
            error,
            handleRegister
      };
};

export const useLogin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const navigate = useNavigate();

      const handlerLogin = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);

            try {
                  const response = await axios.post(uri + 'login', {
                        email,
                        password
                  });

                  if (response.data.status) {
                        setAuthToken(response.data.token);
                        localStorage.setItem('userEmail', email);

                        setLoading(false);
                        notificationService.success(response.data.message);
                        navigate('/');
                  } else {
                        throw new Error(response.data.message || "Login gagal");
                  }
            } catch (err) {
                  setLoading(false);
                  const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat login";
                  setError(errorMessage);
                  notificationService.error(errorMessage);
            }
      };

      return {
            email,
            setEmail,
            password,
            setPassword,
            loading,
            error,
            handlerLogin
      };
};

export const useLogout = () => {
      const navigate = useNavigate();

      const handleLogout = async () => {
            try {
                  await axios.post('http://127.0.0.1:8000/api/logout');
                  setAuthToken(null);
                  localStorage.removeItem('userEmail');
                  notificationService.success('Berhasil logout');
                  navigate('/masuk');
            } catch (error) {
                  notificationService.error('Gagal logout');
            }
      };

      return { handleLogout };
};

export const useAuth = () => {
      const [authState, setAuthState] = useState({
            isAuthenticated: false,
            user: null,
            loading: true,
      });

      useEffect(() => {
            const checkAuth = async () => {
                  const token = localStorage.getItem('userToken');
                  if (token) {
                        try {
                              setAuthToken(token);
                              const response = await axios.get('http://127.0.0.1:8000/api/user');
                              setAuthState({
                                    isAuthenticated: true,
                                    user: response.data.user,
                                    loading: false,
                              });
                        } catch (error) {
                              setAuthToken(null);
                              setAuthState({ isAuthenticated: false, user: null, loading: false });
                        }
                  } else {
                        setAuthState({ isAuthenticated: false, user: null, loading: false });
                  }
            };

            checkAuth();
      }, []);

      return authState;
};

// Fungsi untuk mengatur token saat aplikasi dimuat
export const initializeAuth = () => {
      const token = localStorage.getItem('userToken');
      if (token) {
            setAuthToken(token);
      }
};