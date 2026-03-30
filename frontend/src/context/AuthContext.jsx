import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Intentamos recuperar el usuario del localStorage al cargar la app
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Función para Iniciar Sesión
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Función para Cerrar Sesión (HU #15)
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Función para obtener iniciales para el Avatar (HU #14)
    const getInitials = () => {
        if (!user) return '';
        return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getInitials }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);