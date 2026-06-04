import React, { useState } from 'react';
import { AuthContext } from './AuthContextValue';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) return null;

        try {
            return JSON.parse(savedUser);
        } catch {
            localStorage.removeItem('user');
            return null;
        }
    });

    const login = (authData) => {
        const normalizedUser = authData?.usuario
            ? { ...authData.usuario, token: authData.token }
            : authData;

        setUser(normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getInitials = () => {
        if (!user) return '';
        return `${user.nombre?.charAt(0) || ''}${user.apellido?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getInitials }}>
            {children}
        </AuthContext.Provider>
    );
};
