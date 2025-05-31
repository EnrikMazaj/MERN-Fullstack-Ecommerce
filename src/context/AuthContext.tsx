import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { API_URL } from '../config/api';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/check-auth`, {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    login(data.user);
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = (userData: User) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
