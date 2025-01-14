import { useState, useCallback } from 'react';
import { User } from '../types/auth';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const getToken = useCallback(() => {
        return localStorage.getItem('token');
    }, []);

    const setToken = useCallback((token: string) => {
        localStorage.setItem('token', token);
    }, []);

    const removeToken = useCallback(() => {
        localStorage.removeItem('token');
    }, []);

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [removeToken]);

    return {
        user,
        setUser,
        getToken,
        setToken,
        removeToken,
        logout,
        isAuthenticated: !!user,
    };
};