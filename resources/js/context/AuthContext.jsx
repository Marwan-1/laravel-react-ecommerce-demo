import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // For initial page load user check
    const [authLoading, setAuthLoading] = useState(false); // For login/logout button states

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            api.get('/user')
                .then((response) => setUser(response.data))
                .catch(() => localStorage.removeItem('authToken'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        setAuthLoading(true); // Set loading to true
        try {
            const response = await api.post('/login', credentials);
            localStorage.setItem('authToken', response.data.access_token);
            const { data: userData } = await api.get('/user');
            setUser(userData);
            navigate('/');
        } finally {
            setAuthLoading(false); // Set loading to false on completion or error
        }
    };

    const logout = async () => {
        setAuthLoading(true); // Set loading to true
        try {
            if (localStorage.getItem('authToken')) {
                await api.post('/logout');
            }
        } finally {
            setUser(null);
            localStorage.removeItem('authToken');
            navigate('/login');
            setAuthLoading(false); // Set loading to false
        }
    };

    const value = { user, isAuthenticated: !!user, loading, authLoading, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
